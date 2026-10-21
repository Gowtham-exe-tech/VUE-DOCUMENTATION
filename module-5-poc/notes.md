# Module 5: Tooling, Testing and Production

## Vite

**Definition.** Vite is a build tool and dev server. In development it serves my source files as native ES modules and only transforms the file the browser asks for. For production it bundles everything with Rollup-based tooling into a few optimized files.

**Why it is needed.** A browser cannot read `.vue` or `.ts` files, and 30 separate files would make the production site slow. Vite compiles `.vue` and `.ts` on demand in dev, so the server starts almost instantly, and bundles, minifies and hashes files for production.

**How it works in this POC.** Everything is configured in one file.

**vite.config.ts**

```ts
import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'
import { visualizer } from 'rollup-plugin-visualizer'
// the analyzer only runs when ANALYZE=true (npm run analyze)
const shouldAnalyze = process.env.ANALYZE === 'true'
const analyzerPlugins = shouldAnalyze ? [visualizer({ filename: 'stats/bundle-report.html', template: 'treemap', gzipSize: true, open: true })] : []
export default defineConfig({
  plugins: [vue(), ...analyzerPlugins],
  resolve: {
    // "@" means the src folder, must match paths in tsconfig.app.json
    alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) },
  },
  test: {
    // jsdom gives the tests a fake browser DOM
    environment: 'jsdom',
    // only unit/component tests, the e2e folder belongs to Playwright
    include: ['src/**/*.test.ts'],
  },
})
```

Important lines:

- `defineConfig` is imported from `vitest/config` and not from `vite`. It is the same function but with the `test` key typed, so one file configures both Vite and Vitest.
- `plugins: [vue(), ...analyzerPlugins]` spreads either one plugin or an empty array, so the analyzer is simply absent in a normal build.
- `fileURLToPath(new URL('./src', import.meta.url))` builds an absolute path to `src` that works on Windows too. Writing `'/src'` by hand is a common mistake.

**Execution flow.**

`npm run dev` | `vite` reads `vite.config.ts` | starts the server on 5173 | browser requests `/` | gets `index.html` | requests `/src/main.ts` | Vite compiles it and returns it | each `import` triggers another request

`npm run build` | `vue-tsc` type-checks | `vite build` bundles from `index.html` | writes `dist/`

**Common mistakes and debugging.**

- `Failed to resolve import "@/..."` means the alias is missing or wrong in `vite.config.ts`. Restart the dev server after editing the config, it does not hot-reload.
- Port 5173 busy: Vite silently moves to 5174. Playwright expects 5173, which is why its command uses `--strictPort`. If I see the wrong port in the terminal, an old server is still running.
- Blank page in the browser: open the browser console first, the error is almost always there.

## Environment variables

**Definition.** Values that change between environments (dev, production) kept outside the code. Vite reads them from `.env` files and exposes them on `import.meta.env`.

**Why it is needed.** The API address in development (`localhost`) is different from production. Keeping it in an env file means the code never changes between environments.

**How it works in this POC.** Two files hold the same key with different values.

**.env.development**

```
# Only VITE_ variables reach the browser, so never put secrets here
VITE_API_BASE_URL=http://localhost:3000/api
```

**.env.production**

```
# Only VITE_ variables reach the browser, so never put secrets here
VITE_API_BASE_URL=https://api.example.com/api
```

**src/services/apiConfig.ts**

```ts
// Vite replaces import.meta.env.VITE_API_BASE_URL at build time
// the value ends up in the browser bundle so it is public, no secrets here
export const apiBaseUrl: string = import.meta.env.VITE_API_BASE_URL ?? ''
// joins the base url and a path without a double slash
export function buildApiUrl(path: string): string {
  const cleanBase = apiBaseUrl.replace(/\/+$/, '')
  const cleanPath = path.replace(/^\/+/, '')
  return `${cleanBase}/${cleanPath}`
}
```

**src/env.d.ts**

```ts
/// <reference types="vite/client" />
// tells TypeScript which env variables exist
interface ImportMetaEnv {
  readonly VITE_API_BASE_URL: string
}
interface ImportMeta {
  readonly env: ImportMetaEnv
}
```

Important lines:

- Only names starting with `VITE_` are exposed to client code. Anything else in the file stays hidden from the browser on purpose.
- The values are not looked up while the page runs. Vite replaces `import.meta.env.VITE_API_BASE_URL` with the actual string while bundling, so the production value is written into `dist/assets/*.js`. Anyone can read it using the browser dev tools. Client-side environment variables are public, so API secrets, passwords and private tokens must never go in a `VITE_` variable. Secrets belong on a server.
- `env.d.ts` gives the variable a type, so a typo like `VITE_API_BASEURL` becomes a type error instead of a silent `undefined`.

**Execution flow.**

`npm run dev` | mode is `development` | Vite loads `.env.development` | `HomeView` shows `http://localhost:3000/api`

`npm run build` | mode is `production` | Vite loads `.env.production` | value is inlined in the bundle | `npm run preview` shows `https://api.example.com/api`

**Common mistakes and debugging.**

- Variable shows `undefined` or empty: the name is missing the `VITE_` prefix, or the dev server was not restarted after editing the env file.
- Vitest runs in mode `test`, so it does not read `.env.development`. I confirmed this while checking `HomeView` in a test, the URL was empty. A `.env.test` file would be needed for tests. The Playwright test is fine because it starts the real dev server in development mode.
- To see what was inlined, search the built file: `Select-String -Path dist\assets\*.js -Pattern "api.example.com"` in PowerShell.

## Path aliases

**Definition.** A short prefix (`@`) that stands for a folder (`src`), so imports do not need long `../../` chains.

**Why it is needed.** `import { useOrdersStore } from '@/stores/orders'` stays valid when a file moves, and it is easier to read than `../../stores/orders`.

**How it works in this POC.** The alias has to be defined in two places because two different tools need to understand it. Vite (and Vitest) resolve imports at run time, TypeScript checks them in the editor and in `vue-tsc`.

The Vite side is the `resolve.alias` block shown in the Vite section. The TypeScript side:

**tsconfig.app.json**

```json
    "paths": { "@/*": ["./src/*"] }
```

Important lines:

- `"@/*": ["./src/*"]` is relative to the tsconfig file, so no `baseUrl` is needed with `moduleResolution: "bundler"`.
- `main.ts` uses it like `import App from '@/App.vue'`.

**Execution flow.**

`import X from '@/stores/orders'` | Vite alias turns `@` into the absolute `src` path | file is found at run time

same line | TypeScript `paths` maps `@/*` to `./src/*` | editor and `vue-tsc` find the types

**Common mistakes and debugging.**

- Alias works in the editor but the build fails (or the reverse) means only one of the two places was updated.
- Vitest says `Failed to resolve import` for an `@/` path: the alias must be in the config Vitest uses. It works here because Vitest reads `vite.config.ts`.

## Assets

**Definition.** Static files such as icons, images and fonts. Vite treats them in two different ways depending on where they live.

**Why it is needed.** Files that the code imports can get a content hash in the name, so browsers cache them for a long time and still fetch a new version when the file changes. Files that must keep an exact name need to be served as they are.

**How it works in this POC.**

- `public/favicon.svg` is copied to `dist/` untouched. `index.html` refers to it with an absolute path: `<link rel="icon" href="/favicon.svg" />`.
- Code and CSS that Vite builds get hashed names. After `npm run build` the output has names like `dist/assets/index-BDKiIeuj.css` and `dist/assets/OrdersView--APsM0am.js`. The hash is generated from the file content.
- A file placed in `src/assets` and imported in a component would also get a hashed name. This POC has no such file because it does not need one.

**Execution flow.**

`public/favicon.svg` | copied as it is | `dist/favicon.svg`

`src/style.css` | imported in `main.ts` | Vite bundles and minifies | `dist/assets/index-<hash>.css` | `dist/index.html` links to it automatically

**Common mistakes and debugging.**

- Importing a `public` file with `import` or writing `/public/favicon.svg` in the URL. The folder name is not part of the URL.
- After deploying, an old page still shows old styles: check that the file names in `dist/index.html` changed. Hashed names are what make caching safe.

## TypeScript

**Definition.** TypeScript adds types to JavaScript and checks them before the code runs. Vite only removes the types, it does not check them. The checking is done by `vue-tsc`, the version of `tsc` that understands `.vue` files.

**Why it is needed.** A wrong status like `'Shipped'` or a missing prop is reported as an error in the editor instead of becoming a bug in the browser.

**How it works in this POC.** The types are defined once and reused by the store, the component and the tests.

**src/types/order.ts**

```ts
// all allowed statuses, the union type below is built from this list
export const orderStatuses = ['Pending', 'Processing', 'Completed', 'Cancelled'] as const
export type OrderStatus = (typeof orderStatuses)[number]
export interface Order {
  id: string
  customerName: string
  productName: string
  totalAmount: number
  status: OrderStatus
}
// checks a plain string at runtime, TypeScript cannot do this for us
export function isOrderStatus(value: string): value is OrderStatus {
  return (orderStatuses as readonly string[]).includes(value)
}
```

Important lines:

- `as const` makes the array a fixed list of exact strings, and `(typeof orderStatuses)[number]` turns it into the union `'Pending' | 'Processing' | 'Completed' | 'Cancelled'`. There is one list to maintain, and the dropdown options and the type can never disagree.
- `isOrderStatus` is a type guard. Types disappear at run time, and a `<select>` always gives back a plain `string`, so this function is the real check that lets TypeScript treat the value as `OrderStatus`.

Where the types are applied:

**src/stores/orders.ts**

```ts
const orders = ref<Order[]>(createSampleOrders())
function updateOrderStatus(orderId: string, newStatus: OrderStatus): boolean {
function searchOrders(searchText: string): Order[] {
```

**src/components/OrderStatusSelect.vue**

```vue
<script setup lang="ts">
import { isOrderStatus, orderStatuses, type OrderStatus } from '@/types/order'
// typed props: a wrong status string fails the type check
const props = defineProps<{ status: OrderStatus; orderId: string }>()
// typed event: the parent always receives a valid OrderStatus
const emit = defineEmits<{ statusChange: [newStatus: OrderStatus] }>()
function handleChange(event: Event) {
  const selectedValue = (event.target as HTMLSelectElement).value
  // the DOM only gives a string so check it before emitting
  if (isOrderStatus(selectedValue)) emit('statusChange', selectedValue)
}
</script>
```

Important lines:

- `defineProps<{ ... }>()` uses a type instead of a runtime object. Vue reads the type at compile time to build the props.
- `defineEmits<{ statusChange: [newStatus: OrderStatus] }>()` types the event name and the payload. Emitting `'statusChanged'` or a number is a compile error.
- `event.target as HTMLSelectElement` is needed because `event.target` is typed as the general `EventTarget`.

**Strict mode and the type-check command.** `tsconfig.app.json` has `"strict": true`, which turns on `strictNullChecks`, `noImplicitAny` and the other strict checks. The command is:

```
npm run type-check
```

It runs `vue-tsc --noEmit -p tsconfig.app.json` and then the same for `tsconfig.node.json` (which covers `vite.config.ts`, `playwright.config.ts` and `e2e/`). `--noEmit` means it only checks and writes no files. `npm run build` runs it first, so a type error stops the build.

**Catching an invalid status.** The last store test and the last component test contain this:

**src/stores/orders.test.ts**

```ts
    const invalidCall = () => {
      // @ts-expect-error 'Shipped' is not an OrderStatus
      ordersStore.updateOrderStatus('ORD-1001', 'Shipped')
    }
```

`@ts-expect-error` says the next line must contain a type error. The function is never called, so nothing breaks at run time. If I delete the comment, `npm run type-check` fails with `Argument of type '"Shipped"' is not assignable to parameter of type 'OrderStatus'`. If the type ever became too loose and the error disappeared, `@ts-expect-error` would itself fail the check. That makes it a test of the types.

**Execution flow.**

edit `.vue` or `.ts` file | editor (Volar) shows red line | `npm run type-check` | `vue-tsc` reads `tsconfig.app.json` | reports errors with file and line | exit code 1 stops `npm run build`

**Common mistakes and debugging.**

- Vitest and the dev server pass even with type errors, because Vite and Vitest do not type-check. Only `npm run type-check` finds them.
- Using plain `tsc` on `.vue` files does not work, it must be `vue-tsc`.
- `Cannot find module '@/...'` in `vue-tsc` only: the `paths` entry in `tsconfig.app.json` is missing.
- `Property 'env' does not exist on type 'ImportMeta'`: `src/env.d.ts` is missing or not inside the `include` list.

## Unit testing with Vitest

**Definition.** Vitest is a test runner made for Vite projects. It reuses `vite.config.ts`, so aliases and plugins work in tests with no extra setup.

**Why it is needed.** The Pinia store holds the business logic (searching, status updates, the pending count). Testing it directly is fast and does not need a browser.

**How it works in this POC.** Each test creates a new Pinia, so the store always starts from the sample data.

**src/stores/orders.test.ts**

```ts
import { beforeEach, describe, expect, it } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'
import { useOrdersStore } from '@/stores/orders'
describe('orders store', () => {
  // a brand new Pinia before every test so one test cannot affect another
  beforeEach(() => {
    setActivePinia(createPinia())
  })
  it('counts the pending orders', () => {
    const ordersStore = useOrdersStore()
    expect(ordersStore.pendingCount).toBe(3)
  })
  it('changes the pending count when a status changes', () => {
    const ordersStore = useOrdersStore()
    ordersStore.updateOrderStatus('ORD-1001', 'Completed')
    expect(ordersStore.pendingCount).toBe(2)
    ordersStore.updateOrderStatus('ORD-1002', 'Pending')
    expect(ordersStore.pendingCount).toBe(3)
  })
  it('returns false and changes nothing for an unknown order', () => {
    const ordersStore = useOrdersStore()
    const wasUpdated = ordersStore.updateOrderStatus('ORD-9999', 'Completed')
    expect(wasUpdated).toBe(false)
    expect(ordersStore.pendingCount).toBe(3)
  })
})
```

Important lines:

- `setActivePinia(createPinia())` is needed because `useOrdersStore()` outside a Vue app has no Pinia to attach to. Doing it in `beforeEach` resets the state, because a new Pinia has new stores.
- `createSampleOrders()` in the store returns a fresh array each call. Without that, two Pinia instances could share one array and tests would leak into each other.
- The unknown-order test checks two things: the return value is `false` and the data did not change.

**Config that matters** (from `vite.config.ts`): `environment: 'jsdom'` and `include: ['src/**/*.test.ts']`. The include pattern matters because the default pattern would also pick up `e2e/orders.spec.ts` and Vitest would crash on Playwright imports.

**Execution flow.**

`npm run test:run` | Vitest loads `vite.config.ts` | finds `src/**/*.test.ts` | one worker per file | `beforeEach` creates Pinia | test runs | report | exit code 0 or 1

`npm test` does the same in watch mode, it re-runs the affected tests when a file is saved.

**Common mistakes and debugging.**

- `getActivePinia() was called but there was no active Pinia`: forgot `setActivePinia(createPinia())`.
- A test passes alone but fails with the others: shared state. Check that the data is created fresh and Pinia is reset.
- Run one file with `npx vitest run src/stores/orders.test.ts`, or one test with `-t "pending"`.

## Component testing with Vue Test Utils

**Definition.** Vue Test Utils (VTU) mounts a real component in a test, lets me interact with it, and reads what it rendered and emitted.

**Why it is needed.** The dropdown has behaviour: it renders options, shows the current value and emits an event. Testing it alone proves it works before the page uses it.

**How it works in this POC.** Vitest runs the test and VTU mounts the component inside jsdom, a fake browser built in JavaScript.

**src/components/OrderStatusSelect.test.ts**

```ts
import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import OrderStatusSelect from '@/components/OrderStatusSelect.vue'
import { orderStatuses } from '@/types/order'
describe('OrderStatusSelect', () => {
  it('shows the current status', () => {
    const wrapper = mount(OrderStatusSelect, { props: { status: 'Processing', orderId: 'ORD-1002' } })
    expect((wrapper.get('select').element as HTMLSelectElement).value).toBe('Processing')
  })
  it('renders every allowed status option', () => {
    const wrapper = mount(OrderStatusSelect, { props: { status: 'Pending', orderId: 'ORD-1001' } })
    const optionTexts = wrapper.findAll('option').map((option) => option.text())
    expect(optionTexts).toEqual([...orderStatuses])
  })
  it('emits statusChange with the selected value', async () => {
    const wrapper = mount(OrderStatusSelect, { props: { status: 'Pending', orderId: 'ORD-1001' } })
    await wrapper.get('select').setValue('Completed')
    expect(wrapper.emitted('statusChange')).toEqual([['Completed']])
  })
})
```

Important lines:

- `mount(Component, { props })` renders the component with the given props. The props are type-checked, so `status: 'Shipped'` is a compile error.
- `wrapper.get('select')` throws if the element is missing, `find` returns an empty result instead. I use `get` when the element must exist.
- `setValue('Completed')` sets the select value and fires a `change` event. It returns a promise, so it needs `await`, because Vue updates the DOM asynchronously.
- `wrapper.emitted('statusChange')` returns an array with one entry per emit, and each entry is the list of arguments. That is why the expected value is `[['Completed']]`.
- `wrapper.props('status')` is used in the typed-props test to read what the component received.

**Execution flow.**

`mount` | Vue renders into jsdom | `setValue` | sets `select.value` and dispatches `change` | `handleChange` runs | `isOrderStatus` passes | `emit('statusChange', 'Completed')` | recorded in `wrapper.emitted()`

**Common mistakes and debugging.**

- Forgetting `await` on `setValue` or `trigger`. The assertion runs before Vue updates.
- `emitted()` is `undefined`: the event name does not match exactly, `statusChange` is case sensitive.
- `document is not defined` means the test ran without jsdom, so check `environment: 'jsdom'` in the config.
- `console.log(wrapper.html())` shows exactly what was rendered.
- I also mounted `OrdersView` once in a throwaway test (not kept in the project) to confirm that the labels, test ids and row counts used by the Playwright test exist in the real markup.

## End-to-end testing with Playwright

**Definition.** Playwright drives a real browser against the running app: it opens pages, types, clicks and reads the screen like a user.

**Why it is needed.** Unit tests cannot prove that the router, the store, the component and the real DOM work together. An e2e test checks the whole path.

**How it works in this POC.** The config starts the dev server by itself.

**playwright.config.ts**

```ts
import { defineConfig, devices } from '@playwright/test'
const devServerUrl = 'http://localhost:5173'
export default defineConfig({
  testDir: './e2e',
  use: { baseURL: devServerUrl },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
  // Playwright starts the Vite dev server itself before running the tests
  webServer: {
    command: 'npm run dev -- --port 5173 --strictPort',
    url: devServerUrl,
    reuseExistingServer: true,
    timeout: 60000,
  },
})
```

Important lines:

- `baseURL` lets tests write `page.goto('/orders')`.
- `webServer.command` starts Vite, and Playwright waits until `url` answers before the first test starts. `--strictPort` makes Vite fail instead of moving to another port.
- `reuseExistingServer: true` uses a server that is already running on 5173 instead of failing.

**e2e/orders.spec.ts** (main test)

```ts
test('search and change a status', async ({ page }) => {
    await page.goto('/orders')
    const ordersTable = page.getByRole('table')
    await expect(ordersTable).toBeVisible()
    // 1 header row + 8 sample orders
    await expect(page.getByRole('row')).toHaveCount(9)
    await expect(page.getByTestId('pendingCount')).toHaveText('3')
    // search for one customer, other rows must disappear
    await page.getByLabel('Search orders').fill('Priya')
    await expect(ordersTable.getByText('Priya Sharma')).toBeVisible()
    await expect(ordersTable.getByText('Arun Kumar')).toHaveCount(0)
    await expect(page.getByRole('row')).toHaveCount(2)
    // change the status and check the dropdown and the pending count
    const statusSelect = page.getByLabel('Status for ORD-1001')
    await statusSelect.selectOption('Completed')
    await expect(statusSelect).toHaveValue('Completed')
    await expect(page.getByTestId('pendingCount')).toHaveText('2')
})
```

How each selector matches the markup:

| Selector | Markup it finds |
| --- | --- |
| `getByRole('table')` | the `<table>` in `OrdersView.vue` |
| `getByLabel('Search orders')` | `<label for="searchOrders">` linked to `<input id="searchOrders">` |
| `getByLabel('Status for ORD-1001')` | the `aria-label` set in `OrderStatusSelect.vue` |
| `getByTestId('pendingCount')` | `data-testid="pendingCount"` on the `<strong>` |
| `getByTestId('noResults')` | `data-testid="noResults"` on the empty message |

Important lines:

- `expect(...)` on a locator waits and retries until the condition is true or the timeout ends, so there are no manual sleeps.
- `toHaveCount(0)` is how I check that a row disappeared.
- Preferring roles and labels over CSS selectors makes the test closer to what a user sees, and it also checks that the markup is accessible.

**Commands.**

```
npm run e2e:install
npm run e2e
```

`e2e:install` downloads Chromium once. `e2e` runs the tests headless and starts the dev server.

**Execution flow.**

`npm run e2e` | Playwright reads the config | runs `npm run dev` | waits for `localhost:5173` | launches Chromium | `page.goto('/orders')` | actions and assertions | closes browser and stops the server it started

**Common mistakes and debugging.**

- `Executable doesn't exist`: the browser was not installed, run `npm run e2e:install`.
- Timeout waiting for the web server: port 5173 is used by something that is not Vite, or `npm install` was not run.
- Strict mode violation: a locator matched more than one element. Make it more specific. Example: `getByText('Priya Sharma')` is searched inside `ordersTable`, not the whole page.
- Debug with `npx playwright test --ui` or `npx playwright test --debug`, and `npx playwright show-report` for the HTML report.
- The state is in memory, so every test starts with fresh sample data after `page.goto`. Tests do not depend on each other.

## Lazy loading

**Definition.** Loading a part of the app only when it is needed. In Vue Router this is done with a dynamic `import()` for a route component.

**Why it is needed.** If every page is in the first bundle, the user downloads code for pages they may never open. With lazy routes the first load is smaller.

**How it works in this POC.**

**src/router/index.ts**

```ts
// () => import(...) makes each page its own chunk, loaded only when visited
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'home', component: () => import('@/views/HomeView.vue') },
    { path: '/orders', name: 'orders', component: () => import('@/views/OrdersView.vue') },
  ],
})
```

Important lines:

- `() => import('@/views/HomeView.vue')` is a function that returns a promise. Vite sees the dynamic `import()` and splits that file into its own chunk. A normal `import HomeView from ...` at the top would put it in the main bundle.
- The router calls the function the first time the route is visited and caches the result, so later visits do not download it again.
- `createWebHistory(import.meta.env.BASE_URL)` uses Vite's base path so the router also works if the app is served from a sub-folder.

**Execution flow.**

open `/` | main bundle loads | router resolves `/` | downloads `HomeView-<hash>.js` | renders

click Orders | router resolves `/orders` | downloads `OrdersView-<hash>.js` (first time only) | renders

**Common mistakes and debugging.**

- Importing the same view statically somewhere else (for example in `main.ts`) pulls it back into the main bundle and the split is lost. The build output or the bundle report shows it.
- To confirm the split, open the browser Network tab, filter by JS, and click the Orders link. A new `OrdersView-...js` request appears.

## Production builds

**Definition.** `vite build` creates the optimized static files in `dist/` that are uploaded to a server.

**Why it is needed.** The dev server serves unbundled source for speed. Production needs few, minified, hashed files and no dev tooling.

**How it works in this POC.**

```
npm run build
npm run preview
```

The `build` script is `npm run type-check && vite build`. The `&&` means the build only starts if type checking succeeds. Output from a real run:

```
dist/index.html                      0.41 kB │ gzip:  0.28 kB
dist/assets/index-BDKiIeuj.css       0.74 kB │ gzip:  0.39 kB
dist/assets/HomeView-D5ZhoQh4.js     0.62 kB │ gzip:  0.43 kB
dist/assets/OrdersView--APsM0am.js   3.13 kB │ gzip:  1.38 kB
dist/assets/index-BfxoI1aG.js       97.48 kB │ gzip: 37.92 kB
```

- `index-*.js` is the main bundle with Vue, Vue Router, Pinia and `main.ts`. It is the biggest because the framework is in it.
- `HomeView` and `OrdersView` are the lazy chunks from the router.
- `vite preview` serves `dist/` locally. It is for checking the production build, not for real hosting. In preview, the Home page shows the production API URL, which proves that mode `production` loaded `.env.production`.

**Execution flow.**

`npm run build` | `vue-tsc` passes | mode `production` | `.env.production` loaded | modules bundled and minified | chunks split at dynamic imports | file names hashed | `dist/` written | `npm run preview` | serves `dist/` on 4173

**Common mistakes and debugging.**

- Working in dev but broken in production: always run `npm run preview` before deploying, because dev and production behave differently (env values, minification, chunking).
- Refreshing `/orders` on a real static host gives 404, because the server has no such file. `vite preview` handles it, but a real host needs a rule that sends all paths to `index.html` because of `createWebHistory`.
- `dist/` is generated output and is in `.gitignore`. It should never be edited by hand.

## Bundle analysis

**Definition.** A visual report that shows which modules take space in the bundle. This POC uses `rollup-plugin-visualizer`.

**Why it is needed.** Bundle size affects load time, and I cannot guess what is big. The report shows it, for example a heavy library that was imported by mistake.

**How it works in this POC.** The plugin is added in `vite.config.ts` only when the `ANALYZE` environment variable is `true` (code shown in the Vite section). The `analyze` script sets it:

**package.json**

```json
    "analyze": "cross-env ANALYZE=true vite build"
```

Important lines:

- `process.env.ANALYZE === 'true'` is a string comparison, because environment variables are always strings.
- `cross-env` sets the variable the same way on Windows, macOS and Linux. Writing `ANALYZE=true vite build` directly fails in PowerShell, where the syntax is `$env:ANALYZE = "true"`.
- `filename: 'stats/bundle-report.html'` is outside `dist/` on purpose, because Vite empties `dist/` at the start of each build. `stats` is in `.gitignore`.
- `open: true` opens the report after the build, and it only happens in `npm run analyze`. A normal `npm run build` never creates it.
- `template: 'treemap'` draws one rectangle per module, sized by its share of the bundle. `gzipSize: true` also adds the compressed sizes.

**Execution flow.**

`npm run analyze` | `cross-env` sets `ANALYZE=true` | `vite build` | config evaluates `shouldAnalyze` as true | visualizer is added | build finishes | `stats/bundle-report.html` written | browser opens it

**Common mistakes and debugging.**

- No report appears: the build was run with `npm run build`, which does not set `ANALYZE`.
- The report did not open (no desktop browser, or a remote terminal): open `stats/bundle-report.html` manually.
- Reading the report: the biggest rectangle in this app is `vue`, then `vue-router` and `pinia`. The app's own code is tiny. If an unexpected large rectangle appears, find which file imports it.
