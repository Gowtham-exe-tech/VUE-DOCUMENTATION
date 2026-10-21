# Commands

| Task | Command |
| --- | --- |
| Start the dev server (http://localhost:5173) | `npm run dev` |
| Unit and component tests, watch mode | `npm test` |
| Unit and component tests, run once | `npm run test:run` |
| Type checking | `npm run type-check` |
| Production build (type-checks first) | `npm run build` |
| Preview the production build (http://localhost:4173) | `npm run preview` |
| Install the Playwright browser (one time) | `npm run e2e:install` |
| End-to-end tests | `npm run e2e` |
| Bundle analysis report | `npm run analyze` |

Run `npm run e2e:install` once before the first `npm run e2e`. Playwright starts the Vite dev server by itself, so you do not need to start it first. If something already uses port 5173 it will reuse that server.

`npm run analyze` uses `cross-env`, so the same command works in PowerShell, cmd, macOS and Linux. It builds the app and writes `stats/bundle-report.html`, then tries to open it in your browser. If it does not open, open that file by hand. A normal `npm run build` never creates the report.

Without cross-env, the equivalent PowerShell commands are:

```powershell
$env:ANALYZE = "true"
npx vite build
Remove-Item Env:ANALYZE
```

macOS/Linux equivalent: `ANALYZE=true npx vite build`

## Expected demo behaviour

- Home page (`/`): title, short description, the API base URL, and a link to Orders. In `npm run dev` the URL is `http://localhost:3000/api`. After `npm run build` and `npm run preview` it is `https://api.example.com/api`.
- Orders page (`/orders`): table of 8 sample orders, "Pending orders: 3" above it.
- Typing in the search box filters by order ID, customer or product. If nothing matches, the table is replaced by "No orders match your search."
- Changing a status dropdown updates that order and the pending count (set ORD-1001 to Completed and the count goes from 3 to 2).
- After `npm run build`, `dist/assets` contains separate `HomeView` and `OrdersView` chunks.

## Demonstrating the TypeScript error

Open `src/stores/orders.test.ts` and delete the `// @ts-expect-error` line inside the last test. Run `npm run type-check`. It fails because `'Shipped'` is not an `OrderStatus`. Put the line back and it passes again.

## Important limitations

- Orders live in Pinia memory only. A page refresh resets them. There is no backend or database.
- `VITE_API_BASE_URL` is only displayed. The app makes no real API calls.
- Variables prefixed with `VITE_` are public and are visible in the browser bundle. Never put secrets in `.env` files that Vite reads.
- Vitest runs in mode `test`, so it does not read `.env.development`. In unit tests `VITE_API_BASE_URL` is empty unless you create a `.env.test` file.
- Playwright tests need the Chromium download from `npm run e2e:install`. The Playwright config only tests Chromium.
- The bundle report opens automatically on `npm run analyze`. That needs a desktop browser.
