# Module 1: Vue.js Architecture & Component Design

## Vue.js: Why It Was Developed and What Problem It Solves

Vue.js is a **JavaScript framework for building user interfaces**. It helps connect application data to the UI so that when the data changes, the page can update without manually finding and changing every DOM element.

Vue was created by **Evan You** and first released in 2014. He had worked with AngularJS and wanted to keep useful ideas such as declarative templates and data binding while making a framework that was smaller, more approachable, and flexible to adopt.

In plain HTML, CSS, and JavaScript, I can build an interface by selecting DOM elements and changing their text, classes, or visibility. That works well for a small page. As the application grows, the same approach can become difficult to maintain because the UI, data, and event-handling code can become mixed together.

For example, in a task management application, a task might have a title, priority, due date, and status. When the status changes, the UI might need to update the task badge, dashboard count, filter result, and progress indicator. Without a clear structure, I may end up updating these places separately and forgetting one of them.

Vue helps by making the UI a representation of the current application state.

**The basic idea**

```text
User action
    |
    v
JavaScript updates reactive state
    |
    v
Vue detects the state change
    |
    v
Vue updates the parts of the UI that depend on that state
```

I describe what the UI should look like for the current data, and Vue takes care of updating the rendered interface when reactive dependencies change. I still need to write the business logic; Vue does not decide what the application should do.

**What progressive framework means**

Vue is called a progressive framework because it can be adopted gradually instead of forcing every project to use the same amount of tooling from day one.

- A small existing page can use Vue for one interactive section.
- A medium application can organize the interface into reusable `.vue` components.
- A larger Single Page Application (SPA) can add Vue Router for navigation, Pinia for shared application state, and build tooling such as Vite.

The important point is that I can start with the part I need and add more structure as the application grows.

**Why Vue was developed**

- To make reactive, data-driven interfaces easier to write.
- To reduce the amount of manual DOM manipulation needed for interactive pages.
- To provide reusable components so the same UI pattern does not have to be copied everywhere.
- To make the framework approachable for developers who already know HTML, CSS, and JavaScript.
- To allow gradual adoption while still supporting larger applications.

Vue is not a replacement for JavaScript fundamentals. I still need to understand variables, functions, arrays, objects, events, modules, promises, and debugging. Vue provides a structured way to use those skills to build interfaces.

## Vue.js Compared with Other Approaches

**Vue vs plain HTML, CSS, and JavaScript**

With plain JavaScript, I often select an element and manually update it. With Vue, I normally keep the data in state and describe the UI in a template.

For a small static page, plain HTML and CSS may be enough. If the page has many interactive states, repeated UI elements, and data that changes frequently, Vue's reactive state and component structure can make the code easier to maintain.

**Vue vs React**

React is a UI library that commonly uses JSX, where markup-like syntax is written inside JavaScript. Vue Single File Components usually separate the template, script, and style into blocks in a `.vue` file.

- Vue templates use directives such as `v-if`, `v-for`, and `v-model`.
- React commonly uses JSX expressions and JavaScript patterns to conditionally render or map data.
- Vue provides a built-in reactivity model that tracks dependencies used by a component.
- React commonly relies on state and props updates to schedule re-rendering, with its own rendering and reconciliation model.
- Both can build small interfaces and large applications. Both have ecosystems for routing, state management, testing, and build tools.

I should not choose Vue only because I think React is difficult, or choose React only because it is popular. I should consider the existing project, team experience, libraries, maintainability, and the kind of UI being built.

**Vue vs Angular**

Angular is a larger, more opinionated application framework with established conventions and many integrated features. Vue gives me more flexibility about how much of its ecosystem I use.

- Angular commonly uses TypeScript and its own component, dependency-injection, and template conventions.
- Vue supports JavaScript and TypeScript and provides a smaller core with additional official ecosystem tools.
- Angular can be a good fit for teams that want a strongly defined framework structure.
- Vue can be a good fit when I want a gradual learning curve and flexibility while still having a component-based architecture.

This does not mean Vue is always smaller in every finished application or that Angular cannot be flexible. The real result depends on project requirements and implementation.


## Advantages, Limitations, and When I Would Choose Vue

**Advantages**

- **Readable templates:** HTML-like templates are familiar to someone who already knows HTML.
- **Reactive UI:** When reactive state changes, Vue updates the relevant UI automatically.
- **Reusable components:** A task card, modal, notification item, or form field can be built once and reused.
- **Separation of responsibility:** I can keep the data and behavior for one UI feature in a component instead of spreading it across unrelated files.
- **Progressive adoption:** Vue can enhance an existing page or become the foundation of a larger SPA.
- **Useful official ecosystem:** Vue Router, Pinia, and Vue Test Utils support common application needs.
- **Developer tooling:** Vite provides a fast development workflow for modern Vue projects.
- **JavaScript and TypeScript support:** I can begin with JavaScript and adopt TypeScript where the project benefits from stronger type checking.

**Limitations and trade-offs**

- **Too much flexibility can lead to inconsistent structure:** If every developer organizes components differently, a large project can become difficult to navigate. A team should agree on naming, folder structure, state ownership, and component responsibilities.
- **Some concepts still require practice:** Reactivity, props, emits, slots, and provide/inject have rules that I need to understand instead of memorizing.
- **Ecosystem knowledge is still needed:** A real application may also need routing, form validation, authentication, API handling, testing, accessibility, and state management.
- **Third-party package choice matters:** A package may be outdated, unnecessary, or incompatible with the project's Vue version. I should check maintenance and compatibility before adopting it.
- **Vue does not automatically make code production-ready:** I still need validation, error handling, security, accessibility, tests, and clear business rules.

**When I would choose Vue**

- When the project needs an interactive interface with reusable UI parts.
- When the team already knows HTML, CSS, and JavaScript and wants to adopt a component framework.
- When I need to enhance an existing page gradually.
- When the interface contains repeated cards, lists, forms, filters, modals, tabs, or dashboards.
- When the team prefers Vue's template syntax and reactive state model.
- When the application needs a SPA and the team is comfortable choosing tools from the Vue ecosystem.

**When another approach might be a better fit**

- A mostly static page with almost no interaction may not need a framework.
- If a team already has a large, well-maintained React or Angular codebase, changing frameworks without a strong reason may add cost instead of value.
- If the project has a required framework, library, or hosting constraint, I should follow that requirement.
- Framework selection should be based on requirements and team context, not on a claim that one framework is always best.

## Vue.js Version History

**Vue 1**

Vue 1 was the early public version that established Vue's core idea of reactive data binding and declarative templates. It helped developers connect data to UI without manually updating every element.

**Vue 2**

Vue 2 was released in 2016 and became widely used. It introduced major internal and rendering improvements, including the Virtual DOM, and supported server-side rendering. Its component and Options API patterns became familiar to many Vue developers.

Vue 2 reached end of life in December 2023. That means it no longer receives normal community-maintained fixes from the Vue core team. Existing applications may still use it, but new projects should generally use Vue 3 unless a specific compatibility requirement says otherwise.

**Vue 3**

Vue 3 was released in 2020 and brought a major internal rewrite and new APIs.

- **Composition API:** Lets me group component logic by feature and create reusable composables.
- **`ref()` and `reactive()`:** Provide reactive state primitives.
- **Proxy-based reactivity:** Vue 3 uses JavaScript Proxies as part of its reactivity system for reactive objects.
- **Better TypeScript support:** The APIs and component model support TypeScript more effectively.
- **Fragments:** A component template can have multiple root nodes.
- **Tree-shaking support:** Build tools can remove unused parts of supported imports from the final bundle.
- **Vite workflow:** Vite is commonly used for local development and production builds.

**Options API and Composition API**

Vue 3 supports both APIs. They are two ways to organize component logic, not two separate versions of Vue.

Options API example:

```js
export default {
  data() {
    return {
      count: 0
    }
  },
  methods: {
    increase() {
      this.count++
    }
  }
}
```

Composition API example:

```vue
<script setup>
import { ref } from 'vue'

const count = ref(0)

function increase() {
  count.value++
}
</script>
```

The Options API groups code by options such as `data`, `methods`, and `computed`. The Composition API lets me organize related state and functions together. For learning modern Vue 3 and writing the examples in these notes, I use `<script setup>` with the Composition API.

## Single File Components (SFCs)

A **Single File Component (SFC)** is a `.vue` file that keeps a component's template, JavaScript logic, and CSS styles together. It is useful because the code for one UI responsibility can be read and maintained in one place.

A common structure is:

```vue
<script setup>
// JavaScript logic goes here.
</script>

<template>
  <!-- The UI structure goes here. -->
</template>

<style scoped>
/* Styles for this component go here. */
</style>
```

**`<script setup>`**

This is the component's JavaScript area. I import Vue functions and child components, create state, write functions, and define props or events here.

The `setup` attribute is compile-time syntax for using the Composition API. Top-level variables and functions are available to the template without a `return` statement.

```vue
<script setup>
import { ref } from 'vue'

const taskTitle = ref('Prepare Vue notes')

function updateTaskTitle() {
  taskTitle.value = 'Review Vue components'
}
</script>
```

- `import { ref } from 'vue'` imports Vue's `ref` function.
- `taskTitle` stores a reactive value.
- `taskTitle.value` accesses or updates the value in JavaScript.
- `updateTaskTitle()` changes the state when called.

**`<template>`**

This describes what appears in the browser. Vue template syntax lets me display state, listen for events, conditionally render elements, and render lists.

```vue
<template>
  <section>
    <h2>{{ taskTitle }}</h2>
    <button @click="updateTaskTitle">Update title</button>
  </section>
</template>
```

- `{{ taskTitle }}` displays the current value.
- `@click` is shorthand for `v-on:click`.
- Vue calls `updateTaskTitle` when the button is clicked.
- Because `taskTitle` is reactive, the heading updates after the value changes.

**`<style scoped>`**

This contains component styles. `scoped` makes Vue attach generated scope attributes so these CSS rules normally apply only to elements in this component.

```vue
<style scoped>
section {
  padding: 16px;
  border: 1px solid #dddddd;
  border-radius: 8px;
}

button {
  cursor: pointer;
}
</style>
```

Scoped styles help prevent accidental style leakage, but they are not a security boundary. Styles applied to child components and deeply nested content may need to be written in the child itself or handled with Vue's supported deep selectors.

**How I write an SFC**

1. Decide the component's responsibility. For example, `TaskItem.vue` displays one task.
2. Identify the data it needs and where that data should be owned.
3. Write the state and functions in `<script setup>`.
4. Write the template using the state and functions.
5. Add styles that belong to this component.
6. Test the component in the browser and check empty, normal, and edge cases.

**How the SFC is used by the app**

```text
App imports TaskList.vue
          |
          v
TaskList imports TaskItem.vue
          |
          v
Vue compiles the .vue files using the build tool
          |
          v
The browser renders the component tree
          |
          v
Reactive state changes trigger the required UI updates
```

For a Vite-based Vue application, the build tool processes `.vue` files before the browser runs the application. The browser does not directly understand the raw SFC syntax as a native file format.

## Component Communication: Props and Emits

Components should have clear responsibilities. A parent commonly owns a collection of data, while a child displays one part of that data. The parent and child need a predictable way to communicate.

**Props: parent to child**

A **prop** is a value a parent passes to a child component. Props are suitable for information such as a task title, notification object, selected status, or whether a button should be disabled.

Child (`TaskItem.vue`):

```vue
<script setup>
defineProps({
  title: {
    type: String,
    required: true
  },
  priority: {
    type: String,
    default: 'medium'
  }
})
</script>

<template>
  <article>
    <h3>{{ title }}</h3>
    <span>{{ priority }}</span>
  </article>
</template>
```

Parent:

```vue
<script setup>
import TaskItem from './TaskItem.vue'
</script>

<template>
  <TaskItem title="Review pull request" priority="high" />
</template>
```

How I read this:

- The parent imports the child component.
- `<TaskItem>` uses the component in the parent's template.
- `title` and `priority` are passed as props.
- `defineProps()` declares which props the child expects.
- `required: true` tells Vue that `title` is expected.
- `default: 'medium'` supplies a default priority if the parent does not pass one.

The parent can also bind dynamic values:

```vue
<TaskItem :title="task.title" :priority="task.priority" />
```

The `:` is shorthand for `v-bind`. Without it, `priority="task.priority"` would be a literal string, not the JavaScript value from `task.priority`.

**Props should be treated as read-only.** A child should not directly overwrite a prop to change the parent's data. If the user clicks a button in the child, the child can emit an event and the parent can decide how to update its state.

**Emits: child to parent**

An **emitted event** is a notification sent by a child component to the parent. It allows the child to report that something happened without taking ownership of the parent's data.

Child (`TaskItem.vue`):

```vue
<script setup>
defineProps({
  title: {
    type: String,
    required: true
  }
})

const emit = defineEmits(['complete'])

function completeTask() {
  emit('complete')
}
</script>

<template>
  <article>
    <span>{{ title }}</span>
    <button @click="completeTask">Complete</button>
  </article>
</template>
```

Parent:

```vue
<script setup>
import TaskItem from './TaskItem.vue'

function handleTaskComplete() {
  console.log('The task was marked complete.')
}
</script>

<template>
  <TaskItem title="Review pull request" @complete="handleTaskComplete" />
</template>
```

How I read this:

- `defineEmits(['complete'])` declares the custom event.
- `completeTask()` calls `emit('complete')`.
- The parent listens with `@complete`.
- When the child emits `complete`, the parent calls `handleTaskComplete()`.

**Passing a value with an event**

If the parent needs to know which task was completed, the child can send the task ID:

```js
const emit = defineEmits(['complete'])

function completeTask() {
  emit('complete', props.task.id)
}
```

The parent can receive the value:

```vue
<TaskItem :task="task" @complete="handleTaskComplete" />
```

```js
function handleTaskComplete(taskId) {
  // Find the task in the parent's state and update it.
  console.log('Completed task ID:', taskId)
}
```

For this version, the child would declare `props` using `const props = defineProps(...)` so `props.task.id` is available in the function.

**Communication flow**

```text
Parent owns task data
       |
       | passes task using a prop
       v
Child displays task
       |
       | user clicks Complete
       v
Child emits "complete" with task ID
       |
       v
Parent receives the event
       |
       v
Parent updates its own task state
       |
       v
Vue updates the UI that depends on that state
```

I use props when the child needs data, and emits when the child needs to notify the parent about an action. For a direct parent-child relationship, this is normally clearer than sharing everything through provide/inject.

## Slots System

A **slot** is a place in a child component where the parent can supply template content. Props pass data values; slots pass UI content. Slots help create reusable layout components without hard-coding every heading, action, or message inside the child.

**Default slot**

A default slot is the general content area of a child component.

Child (`PanelCard.vue`):

```vue
<template>
  <section class="panel-card">
    <slot>
      <p>No content was provided.</p>
    </slot>
  </section>
</template>
```

Parent:

```vue
<PanelCard>
  <h2>Overdue tasks</h2>
  <p>Three tasks need attention.</p>
</PanelCard>
```

The parent content appears where the child placed `<slot>`. If the parent does not provide content, the fallback text appears instead.

A default slot is useful when I want to reuse the same card, panel, modal, or layout but display different content inside it.

**Named slots**

Named slots let a child expose multiple content areas, such as a header, body, and footer.

Child (`DashboardPanel.vue`):

```vue
<template>
  <section class="dashboard-panel">
    <header>
      <slot name="header">Panel title</slot>
    </header>

    <div class="panel-body">
      <slot>Panel content</slot>
    </div>

    <footer>
      <slot name="footer"></slot>
    </footer>
  </section>
</template>
```

Parent:

```vue
<DashboardPanel>
  <template #header>
    <h2>Weekly progress</h2>
  </template>

  <p>Seven tasks were completed this week.</p>

  <template #footer>
    <button>View report</button>
  </template>
</DashboardPanel>
```

- `<slot name="header">` defines the named header area.
- `<template #header>` provides content for that area.
- `#header` is shorthand for `v-slot:header`.
- Content not placed in a named template goes into the default slot.
- The child decides where each slot is displayed, while the parent decides what content to place there.

Named slots are useful when a reusable component has a stable structure but needs different header, body, or footer content.

**Scoped slots**

A **scoped slot** lets the child pass values to the parent-provided slot template. This is useful when the child owns data or logic but the parent wants to customize how that data appears.

Child (`TaskStatus.vue`):

```vue
<script setup>
import { computed } from 'vue'

const props = defineProps({
  task: {
    type: Object,
    required: true
  }
})

const statusLabel = computed(() => {
  return props.task.completed ? 'Completed' : 'In progress'
})
</script>

<template>
  <slot name="status" :label="statusLabel" :task="task">
    <span>{{ statusLabel }}</span>
  </slot>
</template>
```

Parent:

```vue
<TaskStatus :task="task">
  <template #status="{ label, task }">
    <span :class="['status-badge', { completed: task.completed }]">
      {{ label }}
    </span>
  </template>
</TaskStatus>
```

How I understand this:

- The child receives `task` through a prop.
- The child calculates `statusLabel`.
- The child exposes `statusLabel` as the slot prop named `label`.
- The child also exposes the task object as the slot prop named `task`.
- The parent receives these values through `{ label, task }`.
- The parent decides which HTML elements and classes to use.

The child owns the state and logic; the parent customizes the UI. The parent does not automatically gain access to the child's local variables. The child must expose the values through the slot.


## Provide and Inject

**Provide/inject** is Vue's dependency-injection feature. An ancestor component can provide a value, and a descendant can inject it without every intermediate component receiving and forwarding it as a prop.

This is useful when many nested components need the same context, such as a theme, current user context, notification actions, or a form context.

**The problem: prop drilling**

Imagine `App.vue` renders `Dashboard.vue`, which renders `NotificationPanel.vue`, which renders `NotificationItem.vue`. If only `NotificationItem.vue` needs the theme, I would have to pass the theme through `Dashboard.vue` and `NotificationPanel.vue` even if those components do not use it. Passing data through unrelated intermediate components is called prop drilling.

```text
App.vue provides a theme
        |
        v
Dashboard.vue
  (does not need the theme itself)
        |
        v
NotificationPanel.vue
  (does not need the theme itself)
        |
        v
NotificationItem.vue injects the theme
```

**`provide()`**

I call `provide(key, value)` in an ancestor component's setup context. The key identifies the provided dependency, and the value is what descendants can inject.

**`inject()`**

I call `inject(key)` in a descendant component to retrieve the nearest matching value from an ancestor. If no provider exists for that key, the result is `undefined` unless I supply a default value.

**Example**

Ancestor (`App.vue`):

```vue
<script setup>
import { provide, ref } from 'vue'
import UserPanel from './UserPanel.vue'

const username = ref('Gowtham')

// Descendants can access this reactive value.
provide('username', username)
</script>

<template>
  <UserPanel />
</template>
```

Descendant (`UserPanel.vue`):

```vue
<script setup>
import { inject } from 'vue'

const username = inject('username')
</script>

<template>
  <p v-if="username">Hello, {{ username }}!</p>
  <p v-else>Username was not provided.</p>
</template>
```

The ancestor provides the `ref` itself. That means the descendant receives the reactive reference, rather than a one-time copy of the string. In the template, Vue unwraps the ref so `{{ username }}` displays its current value.

**Reactivity and ownership**

If I provide a primitive value such as a plain string, descendants receive that value as it was provided; later reassignment of the ancestor's local variable is not automatically shared as reactive state. If the value needs to stay reactive, provide a `ref` or `reactive` object.

For shared state, I should decide which component owns updates. One approach is to provide a readonly view of state along with functions that update it. Descendants can call the functions without directly mutating shared data.

```js
provide('taskContext', {
  tasks: readonly(tasks),
  completeTask,
  removeTask
})
```

This makes the intended interface clear: descendants can read the tasks and call the supported actions.

**When I would use provide/inject**

- Several deeply nested descendants need the same context.
- Passing props through many components would make the intermediate components unnecessarily aware of that context.
- A reusable component group needs a shared context, such as a form and its fields.
- I want to provide theme configuration or shared actions to a subtree.

**When I would not use it**

For a simple parent and direct child, props and emits are usually easier to understand. I should not use provide/inject just to avoid writing one prop. For application-wide state shared across unrelated parts of a large application, a state-management tool such as Pinia may be more suitable.

For larger projects, typed injection keys can reduce spelling mistakes and make the dependency contract clearer. When using `inject()`, I should also handle the case where a provider is missing if the component can be rendered outside its expected parent.

##Example: Notification Center

This example combines SFCs, props, emits, a scoped slot, and provide/inject in a notification center. It is more realistic than a single button because it includes a list, read/unread state, dismiss behavior, shared theme configuration, and a customizable action area.

**What the feature should do**

- Display a list of notifications.
- Show an active notification count.
- Make unread notifications visually distinct.
- Allow an unread notification to be marked as read.
- Allow a notification to be dismissed.
- Let the parent customize the action area through a scoped slot.
- Provide theme settings to the child without passing the theme through every component.
- Keep notification state owned by the parent and expose controlled actions to descendants.

**Suggested file structure**

```text
src/
├── App.vue
└── components/
    ├── NotificationCenter.vue
    └── NotificationItem.vue
```

`App.vue` renders the notification center. `NotificationCenter.vue` owns the data and business functions. `NotificationItem.vue` renders one notification.

### 1. `App.vue`

```vue
<script setup>
import NotificationCenter from './components/NotificationCenter.vue'
</script>

<template>
  <main class="app-page">
    <h1>Team Notifications</h1>
    <p class="page-description">Updates that may need attention.</p>

    <NotificationCenter />
  </main>
</template>

<style scoped>
.app-page {
  max-width: 760px;
  margin: 40px auto;
  padding: 0 20px;
  font-family: Arial, sans-serif;
}

.page-description {
  color: #64748b;
  margin-bottom: 24px;
}
</style>
```

**How I write this file**

1. First, I decide what the app's entry screen should display.
2. I import `NotificationCenter.vue` because that component owns the feature.
3. I place `<NotificationCenter />` inside the template.
4. I keep only page-level layout styles here. The notification-specific styling belongs to the notification components.

This keeps `App.vue` simple. It does not need to know how notifications are stored, marked as read, or dismissed.

### 2. `NotificationCenter.vue`

```vue
<script setup>
import { computed, provide, reactive, readonly } from 'vue'
import NotificationItem from './NotificationItem.vue'

// This component owns the notification data.
const notificationState = reactive({
  list: [
    {
      id: 101,
      title: 'Build completed',
      message: 'The staging build is ready for review.',
      type: 'success',
      createdAt: '10 minutes ago',
      read: false
    },
    {
      id: 102,
      title: 'Review requested',
      message: 'A teammate requested a review on the task tracker.',
      type: 'info',
      createdAt: '35 minutes ago',
      read: false
    },
    {
      id: 103,
      title: 'Deployment finished',
      message: 'The latest version was deployed successfully.',
      type: 'success',
      createdAt: 'Yesterday',
      read: true
    }
  ]
})

// The count is calculated from the current reactive list.
const unreadCount = computed(() => {
  return notificationState.list.filter(item => !item.read).length
})

// Remove one notification using its ID.
function dismissNotification(id) {
  notificationState.list = notificationState.list.filter(item => item.id !== id)
}

// Mark one notification as read.
function markAsRead(id) {
  const notification = notificationState.list.find(item => item.id === id)

  if (notification) {
    notification.read = true
  }
}

// Give descendants read-only state and approved actions.
provide('notificationContext', {
  notifications: readonly(notificationState),
  markAsRead
})

// Theme is shared with descendants that need to use it.
provide('notificationTheme', {
  cardClass: 'notification-theme-dark'
})
</script>

<template>
  <section class="notification-center" aria-labelledby="notification-heading">
    <header class="center-header">
      <div>
        <h2 id="notification-heading">Notifications</h2>
        <p>Updates from your workspace</p>
      </div>

      <span class="unread-count" aria-live="polite">
        {{ unreadCount }} unread
      </span>
    </header>

    <div v-if="notificationState.list.length" class="notification-list">
      <NotificationItem
        v-for="item in notificationState.list"
        :key="item.id"
        :item="item"
        @dismiss="dismissNotification"
      >
        <!-- Parent decides what action appears inside each item. -->
        <template #actions="{ notification, markRead }">
          <button
            v-if="!notification.read"
            class="mark-read-button"
            type="button"
            @click="markRead(notification.id)"
          >
            Mark as read
          </button>
        </template>
      </NotificationItem>
    </div>

    <div v-else class="empty-state">
      <h3>You're all caught up</h3>
      <p>There are no notifications to show.</p>
    </div>
  </section>
</template>

<style scoped>
.notification-center {
  overflow: hidden;
  border: 1px solid #263244;
  border-radius: 14px;
  background: #111827;
  color: #f8fafc;
}

.center-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 22px;
  border-bottom: 1px solid #263244;
}

.center-header h2 {
  margin: 0 0 6px;
  font-size: 20px;
}

.center-header p {
  margin: 0;
  color: #94a3b8;
  font-size: 14px;
}

.unread-count {
  flex-shrink: 0;
  padding: 6px 10px;
  border-radius: 999px;
  background: #1d4ed8;
  color: #ffffff;
  font-size: 12px;
  font-weight: 600;
}

.notification-list {
  padding: 12px 18px;
}

.mark-read-button {
  padding: 7px 10px;
  border: 1px solid #475569;
  border-radius: 7px;
  background: #263244;
  color: #e2e8f0;
  cursor: pointer;
}

.mark-read-button:hover {
  background: #334155;
}

.empty-state {
  padding: 36px 22px;
  text-align: center;
}

.empty-state h3 {
  margin: 0 0 8px;
}

.empty-state p {
  margin: 0;
  color: #94a3b8;
}
</style>
```

**Explanation**

**Step 1: Create the data structure**

```js
const notificationState = reactive({
  list: [
    { id: 101, title: 'Build completed', message: 'The staging build is ready for review.', type: 'success', createdAt: '10 minutes ago', read: false }
  ]
})
```

I start by deciding what one notification needs. It has an ID so Vue can track it, a title and message for display, a type for styling or meaning, a timestamp label, and a `read` flag for its current state.

I use `reactive()` because I want to manage an object containing a list. When the list or a notification property changes, Vue can update UI that depends on it. I access `notificationState.list` directly; I do not use `.value` on an object returned by `reactive()`.

**Step 2: Calculate values that depend on state**

```js
const unreadCount = computed(() => {
  return notificationState.list.filter(item => !item.read).length
})
```

I do not manually keep a second `unreadCount` number and remember to update it every time a notification changes. That could become inconsistent. Instead, I calculate the number from the source list with `computed()`.

- `filter()` keeps only notifications whose `read` value is false.
- `.length` counts those notifications.
- `computed()` recalculates the value when its reactive dependencies change.
- In the template, I can write `{{ unreadCount }}` without `.value`.

**Step 3: Write the state-changing functions**

```js
function dismissNotification(id) {
  notificationState.list = notificationState.list.filter(item => item.id !== id)
}

function markAsRead(id) {
  const notification = notificationState.list.find(item => item.id === id)

  if (notification) {
    notification.read = true
  }
}
```

I write these functions before connecting buttons because they represent the actual behavior of the feature.

For dismissing, `filter()` returns a new array without the matching ID. For marking as read, `find()` looks for one item and returns `undefined` if it cannot find it, so I check `if (notification)` before changing the object.

**Step 4: Provide the shared context**

```js
provide('notificationContext', {
  notifications: readonly(notificationState),
  markAsRead
})
```

`NotificationItem.vue` needs to call `markAsRead`, but I do not want to pass the same action through multiple intermediate components. I provide a context containing a read-only view of the state and the function that is allowed to update it.

`readonly(notificationState)` discourages descendants from directly mutating the shared object through the provided reference. The parent still owns the original state and can update it inside its functions.

The theme is a separate dependency:

```js
provide('notificationTheme', {
  cardClass: 'notification-theme-dark'
})
```

I keep theme configuration separate from notification behavior because they have different responsibilities.

**Step 5: Render the list**

    `<NotificationItem v-for="item in notificationState.list" :key="item.id" :item="item" @dismiss="dismissNotification">`

- `v-for` renders one `NotificationItem` for each notification.
- `:key="item.id"` gives every rendered item a stable identity.
- `:item="item"` passes the current notification to the child through a prop.
- `@dismiss="dismissNotification"` listens for a custom event from the child. Vue passes the event payload to the handler.

This combines props and emits: the parent sends data down using `:item`, and the child can ask the parent to dismiss an item by emitting `dismiss`.

**Step 6: Customize the action area with a scoped slot**

```vue
<template #actions="{ notification, markRead }">
  <button
    v-if="!notification.read"
    type="button"
    @click="markRead(notification.id)"
  >
    Mark as read
  </button>
</template>
```

The parent decides what action should appear. The child exposes `notification` and `markRead` through its `actions` slot. The parent receives them with destructuring and renders the button only if the notification is unread.

This keeps the card layout reusable. Another parent could use the same card but provide a different action area.

**Step 7: Handle an empty list**

```vue
<div v-if="notificationState.list.length" class="notification-list">
  <!-- Notification items render here. -->
</div>

<div v-else class="empty-state">
  <h3>You're all caught up</h3>
  <p>There are no notifications to show.</p>
</div>
```

The UI should still make sense after the user dismisses every notification. `v-if` checks whether the list has items; `v-else` displays the empty state when the list is empty.

### 3. `NotificationItem.vue`

```vue
<script setup>
import { inject } from 'vue'

const props = defineProps({
  item: {
    type: Object,
    required: true,
    validator: (value) => {
      return value !== null
        && typeof value.id === 'number'
        && typeof value.title === 'string'
        && typeof value.message === 'string'
        && typeof value.read === 'boolean'
    }
  }
})

// The child receives the shared actions and theme from an ancestor.
const notificationContext = inject('notificationContext')
const notificationTheme = inject('notificationTheme')

if (!notificationContext || !notificationTheme) {
  throw new Error('NotificationItem must be used inside NotificationCenter.')
}

const emit = defineEmits(['dismiss'])

function dismissItem() {
  emit('dismiss', props.item.id)
}

function markItemAsRead(id) {
  notificationContext.markAsRead(id)
}
</script>

<template>
  <article
    :class="[
      'notification-card',
      notificationTheme.cardClass,
      { 'is-unread': !item.read }
    ]"
  >
    <div class="notification-content">
      <div class="notification-heading">
        <span :class="['type-indicator', `type-${item.type}`]" aria-hidden="true"></span>
        <h3>{{ item.title }}</h3>
        <span v-if="!item.read" class="unread-label">New</span>
      </div>

      <p class="notification-message">{{ item.message }}</p>
      <time class="notification-time">{{ item.createdAt }}</time>
    </div>

    <div class="notification-actions">
      <!-- Parent-provided actions render here. -->
      <slot
        name="actions"
        :notification="item"
        :mark-read="markItemAsRead"
      >
        <span class="no-action">No actions available</span>
      </slot>

      <button
        class="dismiss-button"
        type="button"
        aria-label="Dismiss notification"
        @click="dismissItem"
      >
        Dismiss
      </button>
    </div>
  </article>
</template>

<style scoped>
.notification-card {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 20px;
  padding: 18px 4px;
  border-bottom: 1px solid #263244;
}

.notification-card:last-child {
  border-bottom: none;
}

.notification-theme-dark {
  color: #f8fafc;
}

.notification-card.is-unread {
  background: linear-gradient(90deg, #17243a, transparent);
}

.notification-content {
  min-width: 0;
}

.notification-heading {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 9px;
}

.notification-heading h3 {
  margin: 0;
  font-size: 15px;
}

.type-indicator {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #94a3b8;
}

.type-success {
  background: #34d399;
}

.type-info {
  background: #60a5fa;
}

.unread-label {
  padding: 3px 7px;
  border-radius: 999px;
  background: #1e3a8a;
  color: #bfdbfe;
  font-size: 10px;
  font-weight: 700;
}

.notification-message {
  margin: 8px 0;
  color: #cbd5e1;
  font-size: 14px;
  line-height: 1.5;
}

.notification-time {
  color: #94a3b8;
  font-size: 12px;
}

.notification-actions {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  flex-wrap: wrap;
  gap: 8px;
}

.dismiss-button {
  padding: 7px 10px;
  border: 1px solid #475569;
  border-radius: 7px;
  background: transparent;
  color: #cbd5e1;
  cursor: pointer;
}

.dismiss-button:hover {
  border-color: #f87171;
  color: #fca5a5;
}

.no-action {
  color: #94a3b8;
  font-size: 12px;
}
</style>
```

**How I write this file, step by step**

**Step 1: Declare the input with props**

```js
const props = defineProps({
  item: {
    type: Object,
    required: true
  }
})
```

The child needs one notification to display, so I receive it as an `item` prop. The parent is responsible for providing the object. In the full example, the validator also checks the expected field types. Vue's prop validator helps catch incorrect inputs during development, but it is not a replacement for validating API data.

**Step 2: Inject shared dependencies**

```js
const notificationContext = inject('notificationContext')
const notificationTheme = inject('notificationTheme')
```

The child gets the actions and theme from `NotificationCenter.vue` without the parent passing the theme through each level as a prop.

I check that the dependencies exist. If this component is accidentally used outside its expected parent, the error points to the missing setup instead of causing a less clear error later. In a reusable library, I might choose a fallback or make these dependencies optional instead.

**Step 3: Declare the event**

```js
const emit = defineEmits(['dismiss'])

function dismissItem() {
  emit('dismiss', props.item.id)
}
```

The child does not remove itself from the parent's list. It sends a `dismiss` event with the item ID. The parent listens for that event and runs its own `dismissNotification()` function.

This keeps data ownership clear: the parent owns the list, and the child reports the user's action.

**Step 4: Expose the mark-as-read action to the slot**

```js
function markItemAsRead(id) {
  notificationContext.markAsRead(id)
}
```

The child wraps the injected action in a function that it can expose through its slot. The parent-provided slot can call it. The actual state update still happens in the parent-owned function.

**Step 5: Build the template from the notification data**

```vue
<h3>{{ item.title }}</h3>
<p>{{ item.message }}</p>
<time>{{ item.createdAt }}</time>
```

I first display the fields the child receives. Then I add conditional UI such as the unread label and dynamic classes. `:class` can combine normal classes with conditional ones:

```vue
:class="[
  'notification-card',
  notificationTheme.cardClass,
  { 'is-unread': !item.read }
]"
```

The card always has `notification-card`, receives the configured theme class, and gets `is-unread` only when `item.read` is false.

**Step 6: Put the slot where the action controls belong**

```vue
<slot
  name="actions"
  :notification="item"
  :mark-read="markItemAsRead"
>
  <span class="no-action">No actions available</span>
</slot>
```

The child owns the card layout, but the parent decides which action controls appear. The child exposes the current notification and a function through slot props. If the parent does not provide the `actions` slot, the fallback text appears.

## Full Interaction Flow

```text
App.vue
  |
  | renders
  v
NotificationCenter.vue
  |
  | owns reactive list and action functions
  | provides notification context and theme
  |
  | v-for + :item prop
  v
NotificationItem.vue
  |
  | injects shared context and theme
  | renders notification card
  | exposes notification + markRead through scoped slot
  v
Parent-provided actions slot
  |
  | user clicks Mark as read
  v
markItemAsRead(id)
  |
  v
notificationContext.markAsRead(id)
  |
  v
Parent changes reactive notification state
  |
  v
Unread label and unread count update automatically
```

**Dismiss flow:**

```text
User clicks Dismiss
      |
      v
NotificationItem emits "dismiss" with the item ID
      |
      v
NotificationCenter receives @dismiss
      |
      v
dismissNotification(id) filters the item out of the list
      |
      v
Vue renders the updated list or the empty state
```

# Module 2 – Advanced Reactivity (Composition API)

**What reactivity means**

Reactivity means the application can track which pieces of state are read by a computation or render, then update dependent work when that state changes. I do not manually update every text node, button, and count after each state change. Vue tracks dependencies and schedules the required updates.

A simplified process:

```text
Reactive state changes
        |
        v
Vue detects the change
        |
        v
Dependent computed values / watchers / component render effects are invalidated
        |
        v
Vue schedules the relevant work
        |
        v
The UI updates
```

Vue batches many component DOM updates instead of applying every update synchronously. If code needs to inspect the updated DOM immediately after a state change, `nextTick()` can be used to wait for Vue's DOM update flush.

**The main tools in this module**

- `ref()` creates a reactive reference and is a good default for individual pieces of state.
- `reactive()` creates a reactive proxy for an object or collection.
- `computed()` derives a value from reactive state and caches the result until its dependencies change.
- `watch()` observes an explicitly selected source and runs a callback when that source changes.
- `watchEffect()` runs an effect immediately and automatically tracks reactive values read synchronously inside it.
- A **composable** is a reusable JavaScript function that uses Composition API features to share stateful logic.
- `shallowRef()` and `shallowReactive()` track only the outer level, which can help when large nested structures are treated as immutable or are managed by another library.

## Ref vs. Reactive

**Definition of `ref()`**

`ref()` takes a value and returns a reactive ref object with a `.value` property. Vue tracks reads and writes to `.value`. If the value is an object, Vue normally makes that object deeply reactive as well.

```js
import { ref } from "vue";

const searchText = ref("");
const pageNumber = ref(1);
const isLoading = ref(false);

searchText.value = "invoice";
pageNumber.value++;
isLoading.value = true;
```

In JavaScript code, I access the value with `.value`. In a Vue template, top-level refs are automatically unwrapped, so I can write `{{ searchText }}` rather than `{{ searchText.value }}`.

**When I use `ref()`**

- For primitive values such as strings, numbers, booleans, and nullable IDs.
- When the whole value may be replaced, such as changing the selected customer or replacing an API response.
- For arrays or objects when I prefer a consistent `.value` interface.
- When I want a value that can be returned from a composable and destructured without losing the ref connection.
- As the normal starting choice for reactive state in Composition API code.

**Definition of `reactive()`**

`reactive()` takes an object and returns a reactive Proxy. Vue tracks property access and mutations, including nested object changes by default.

```js
import { reactive } from "vue";

const filters = reactive({
  status: "open",
  ownerId: null,
  dateRange: {
    from: "",
    to: ""
  }
});

filters.status = "pending";
filters.dateRange.from = "2026-10-01";
```

There is no `.value` for `filters.status` because `filters` itself is the proxy object.

**When I use `reactive()`**

- For a form or grouped state object whose properties are updated individually.
- When several related fields belong together and I want to access them through one state object.
- When nested property mutation is a natural part of the state model.
- When I do not need to replace the entire state object reference frequently.

**Important constraints of `reactive()`**

- It only works with objects, arrays, and collection types. It cannot directly wrap a primitive like `0` or `"open"`.
- Replacing the variable with a new object can disconnect code that still holds the old proxy reference. If whole-value replacement is common, `ref()` is usually simpler.
- Destructuring a primitive property creates a local value that is no longer connected to the original property.

```js
const filters = reactive({ status: "open" });

// This local variable is a string, not a reactive connection to filters.status.
const { status } = filters;

filters.status = "closed";
console.log(status); // "open"
```

For reactive destructuring in Vue 3.5+, the `props` destructuring behavior inside `<script setup>` has special compiler support, but that behavior should not be generalized to every `reactive()` object. For ordinary reactive objects, use the object directly or use `toRefs()` when individual properties must be extracted.

```js
import { reactive, toRefs } from "vue";

const filters = reactive({ status: "open", ownerId: null });
const { status, ownerId } = toRefs(filters);

status.value = "closed"; // updates filters.status
```

**Template unwrapping and JavaScript unwrapping**

- Top-level refs used in a template are automatically unwrapped.
- In JavaScript, a ref is accessed with `.value`.
- A ref stored as a property of a deep reactive object is generally unwrapped when that property is accessed.
- Refs stored as elements of reactive arrays or native collections such as `Map` are not automatically unwrapped in the same way.

**How I decide between them in real code**

```js
const selectedOrderId = ref(null);
const isSaving = ref(false);
const searchText = ref("");

const orderForm = reactive({
  customerName: "",
  status: "draft",
  notes: "",
  lineItems: []
});
```

The first three values are independent state values and can be replaced directly. The form is a group of related fields that are usually edited in place. This is a convention, not a strict rule; using `ref()` for an object is also valid.

**Common mistakes**

- Forgetting `.value` in JavaScript: `searchText = "hello"` reassigns the local variable instead of updating the ref. Use `searchText.value = "hello"`.
- Expecting a primitive destructured from `reactive()` to remain connected to the original property.
- Replacing a `reactive()` object and expecting all existing references to follow the replacement.
- Using `reactive()` for every state value without considering whether the entire value needs to be replaced.
- Assuming every nested value must be deeply reactive. For large or immutable structures, shallow APIs may be more suitable.

## Computed and Watchers

**Definition of `computed()`**

`computed()` creates a reactive value derived from other reactive values. Vue caches the computed result and recalculates it when a dependency used by its getter changes and the computed value is accessed again.

```js
const total = computed(() => quantity.value * unitPrice.value);
```

This is useful for values such as filtered lists, totals, unread counts, formatted labels, permission flags, and whether a form can be submitted.

**Why computed values are cached**

A normal function runs every time it is called. A computed getter is tracked by Vue. If its reactive dependencies have not changed, Vue can reuse the cached result instead of running the calculation again.

```js
const filteredOrders = computed(() => {
  return orders.value.filter((order) => order.status === selectedStatus.value);
});
```

The filtered list is recalculated when `orders` or `selectedStatus` changes. It is not recalculated from scratch every time an unrelated part of the template renders.

Computed getters should remain free of side effects. They should calculate and return a value, not make API calls, mutate other state, or change the DOM.

**Writable computed values**

Most computed properties should be read-only. A writable computed can be created with a getter and setter when a value needs a controlled conversion between what the UI edits and the underlying state.

```js
const fullName = computed({
  get() {
    return `${firstName.value} ${lastName.value}`.trim();
  },
  set(value) {
    const parts = value.trim().split(/\s+/);
    firstName.value = parts.shift() ?? "";
    lastName.value = parts.join(" ");
  }
});
```

A writable computed is useful only when the setter has a clear meaning. It should not be used to hide complicated state changes behind a property-looking interface.

**Definition of `watch()`**

`watch()` observes a specific reactive source, such as a ref, a getter function, or a list of sources. When the watched source changes, Vue runs a callback. It is appropriate when I need to respond to a particular state change with a side effect.

Examples of side effects:

- Fetching records when a filter changes.
- Saving preferences to local storage.
- Updating a document title.
- Triggering analytics.
- Running validation that should occur after a specific field changes.
- Starting or cancelling a timer or request.

```js
watch(selectedCustomerId, async (newCustomerId, oldCustomerId) => {
  // Load data for the newly selected customer.
});
```

`watch()` is explicit: the source is declared separately from the callback. It normally runs when the source changes, not immediately on setup. Add `{ immediate: true }` when the initial callback should run too.

**Watching nested state**

Watching a ref or getter that returns an object is not automatically the same as watching every nested mutation. A `reactive()` object passed directly to `watch()` is deeply watched by default. A getter returning an object can be watched deeply with `{ deep: true }` when needed.

Deep watchers can be expensive when the object tree is large. If possible, watch the specific fields that matter instead of the whole object.

```js
watch(
  () => filters.status,
  (newStatus) => {
    // Respond only when the status filter changes.
  }
);
```

**Definition of `watchEffect()`**

`watchEffect()` runs its callback immediately and automatically tracks the reactive values read during the synchronous execution of that callback. When one of those dependencies changes, the effect runs again.

```js
watchEffect(() => {
  document.title = `Orders: ${orders.value.length}`;
});
```

It is useful when the effect naturally depends on several reactive values and I do not want to declare each source manually.

**`watch()` vs. `watchEffect()` in practical use**

- Use `watch()` when the exact source matters, when old and new values are useful, or when I want the side effect to run only for a defined change.
- Use `watchEffect()` when the dependencies can be discovered from the effect body and the immediate initial run is desired.
- Use `computed()` when the result is a value for the UI, not a side effect.
- Do not use a watcher just to calculate a value that could be a computed property.
- Avoid changing the same watched source inside its callback unless the update flow is carefully controlled; otherwise it can create repeated or circular updates.

**Async watchers and cleanup**

When a watcher starts an asynchronous request, a newer request may begin before the older request finishes. The old response must not overwrite newer data. Use the watcher's cleanup mechanism to cancel the old request or mark its result as stale.

```js
watch(searchText, async (query, _oldQuery, onCleanup) => {
  const controller = new AbortController();

  onCleanup(() => {
    controller.abort();
  });

  const response = await fetch(
    `/api/search?q=${encodeURIComponent(query)}`,
    { signal: controller.signal }
  );

  // Handle the response and update state here.
});
```

The `onCleanup` callback is registered before the `await`, so it is ready if the watcher invalidates while the request is in progress. Handle `AbortError` in real code so expected cancellations are not reported as application failures.

In Vue 3.5+, `onWatcherCleanup()` is another API for registering cleanup, but it must be called during the synchronous execution of the watcher callback, before an `await`. The callback-provided `onCleanup` argument works across more Vue 3 versions.

**Watcher timing**

Vue batches updates. The default watcher flush timing is generally before the owner component's DOM update. If the watcher needs to inspect the updated DOM, use `{ flush: "post" }`. `flush: "sync"` runs synchronously and should be used cautiously because it bypasses normal batching and can run repeatedly during a burst of changes.

## Custom Composables

**Definition**

A composable is a JavaScript function that uses Vue's Composition API to encapsulate and reuse stateful logic. It is a way to extract logic that would otherwise be duplicated across components.

A composable is commonly named with the `use` prefix, for example:

- `useFetch()`
- `useOrders()`
- `usePagination()`
- `useDebouncedRef()`
- `usePermissions()`

**Why I create a composable**

When two components need the same behavior, copying the same watchers and API logic into both components creates duplication. If a bug is fixed in one copy but not the other, the components may behave differently.

A composable gives the logic one implementation and a clear interface. The component can focus on displaying data and responding to user actions.

**What belongs in a composable**

- Reactive state and derived values.
- API request logic and request cancellation.
- Loading and error state.
- Reusable watchers.
- Lifecycle cleanup, such as removing event listeners.
- Functions that allow the component to request an operation.

**What should remain in the component**

- Markup and layout.
- Component-specific visual details.
- Decisions that only make sense for that screen.
- Events that connect the reusable logic to the particular UI.

**A reusable `useFetch()` pattern**

```js
// src/composables/useFetch.js
import { ref, watch } from "vue";

export function useFetch(url) {
  const data = ref(null);
  const error = ref(null);
  const isLoading = ref(false);

  watch(
    url,
    async (newUrl, _oldUrl, onCleanup) => {
      const controller = new AbortController();

      onCleanup(() => controller.abort());

      isLoading.value = true;
      error.value = null;

      try {
        const response = await fetch(newUrl, {
          signal: controller.signal
        });

        if (!response.ok) {
          throw new Error(`Request failed: ${response.status}`);
        }

        data.value = await response.json();
      } catch (requestError) {
        if (requestError.name !== "AbortError") {
          error.value = requestError;
        }
      } finally {
        // A production implementation may also guard this assignment
        // so an older aborted request cannot change the newer request's state.
        isLoading.value = false;
      }
    },
    { immediate: true }
  );

  return { data, error, isLoading };
}
```

This shows the shape of a composable, but a production-grade shared fetch composable should carefully guard loading/error updates against stale requests and should define how it handles non-JSON responses, authentication, retries, and API-specific errors. Those policies depend on the application.

**Composable state ownership**

- If a composable creates `ref()` values each time it is called, each call normally gets its own state.
- If a composable intentionally defines shared state at module scope, all consumers may share the same state. This can be useful for a shared cache but must be deliberate.
- Do not accidentally create global shared state when each component should have an independent instance.
- Return refs or a clear object of refs and functions. If returning a `reactive()` object and consumers destructure its properties, use `toRefs()` or document that the object should be accessed directly.
- Composables that use component lifecycle hooks should normally be called synchronously from `setup()` or another composable while an active component instance exists.

## Shallow Reactivity

**Definition of `shallowRef()`**

`shallowRef()` creates a ref that tracks changes to its `.value` property but does not convert the value's nested properties into reactive proxies. Assigning a new value to `.value` triggers dependents. Mutating a nested property by itself does not.

```js
import { shallowRef } from "vue";

const chartSnapshot = shallowRef({
  labels: ["Mon", "Tue"],
  values: [12, 18]
});

// Triggers an update because the outer ref value is replaced.
chartSnapshot.value = {
  labels: ["Mon", "Tue", "Wed"],
  values: [12, 18, 25]
};
```

This does not automatically trigger Vue updates:

```js
chartSnapshot.value.values.push(30);
```

The nested array is not deeply reactive just because it is inside a `shallowRef`.

**Definition of `shallowReactive()`**

`shallowReactive()` creates a reactive object whose root-level properties are reactive, while nested objects remain as they were. Updating a root property can trigger dependents, but changing a nested property will not be tracked by this shallow wrapper.

```js
import { shallowReactive } from "vue";

const dashboardState = shallowReactive({
  selectedRange: "30d",
  chartData: {
    points: [12, 18, 25]
  }
});

dashboardState.selectedRange = "7d"; // root-level change is reactive
dashboardState.chartData.points.push(31); // nested change is not tracked by this wrapper
```

**When shallow reactivity is useful**

- A large dataset is treated as immutable: whenever it changes, I replace the whole snapshot instead of mutating nested properties.
- Data comes from an external state system that already manages its own updates.
- A charting, mapping, editor, or visualization library owns a complex object that should not be deeply converted by Vue.
- I want to avoid the proxying and dependency-tracking overhead associated with deeply reactive structures.
- I am holding a large read-only API response and replace it when a new response arrives.

**When shallow reactivity is not useful**

- I need to edit nested fields directly and expect Vue to detect every change.
- The object is a small form whose nested fields change frequently.
- The team has not agreed to replace the whole object when changes occur.
- I am choosing shallow APIs only because they sound faster without measuring the actual performance issue.

**Immutable update pattern with `shallowRef()`**

```js
const reportRows = shallowRef([]);

function replaceRows(newRows) {
  reportRows.value = newRows;
}

function updateRow(updatedRow) {
  reportRows.value = reportRows.value.map((row) => {
    return row.id === updatedRow.id ? updatedRow : row;
  });
}
```

The array is replaced after each update. That outer assignment is the reactive signal.

**Forcing an update is not the first choice**

Vue exposes `triggerRef()` for cases where a shallow ref's inner value was mutated and dependents must be triggered manually. However, immutable replacement is usually easier to reason about because it makes the update explicit and helps prevent unexpected shared mutations.

```js
import { shallowRef, triggerRef } from "vue";

const snapshot = shallowRef({ count: 0 });

snapshot.value.count++;
triggerRef(snapshot);
```

This is available, but I should not use it as a substitute for a clear state update strategy.

## example: Orders analytics dashboard

**Feature scenario**

I am building an internal orders analytics dashboard for an operations team. The screen needs to:

- Fetch orders for a selected date range and status.
- Display loading and error states.
- Filter orders by a search term.
- Calculate visible order count, total revenue, and pending value.
- Support paging and sorting.
- Avoid applying a stale API response after a user quickly changes filters.
- Reuse the API loading logic across multiple components.
- Handle a large chart/report snapshot without deeply proxying every nested data point.
- Keep the filter form easy to edit.

This example demonstrates why each reactivity API has a different job. The values below are illustrative; a real project would use the organization's API response contract and currency rules.

**Suggested file structure**

```text
src/
├── components/
│   └── OrdersTable.vue
├── composables/
│   └── useOrders.js
├── services/
│   └── ordersApi.js
└── views/
    └── OrdersDashboard.vue
```

**1. API service: `src/services/ordersApi.js`**

The service owns the HTTP request details. Components and composables should not each build their own URL and error handling.

```js
const API_BASE_URL = "/api/v1";

export async function fetchOrders(filters, signal) {
  const params = new URLSearchParams({
    status: filters.status,
    from: filters.from,
    to: filters.to,
    page: String(filters.page),
    pageSize: String(filters.pageSize)
  });

  const response = await fetch(
    `${API_BASE_URL}/orders?${params.toString()}`,
    { signal }
  );

  if (!response.ok) {
    throw new Error(`Could not load orders (${response.status})`);
  }

  return response.json();
}
```

- `URLSearchParams` encodes query parameters safely.
- `signal` allows a watcher/composable to cancel a request that is no longer needed.
- The API base path is centralized rather than repeated throughout components.
- In a real application, authentication, response validation, and shared API error handling may live in a common client.

**2. Reusable request logic: `src/composables/useOrders.js`**

```js
import { computed, ref, watch } from "vue";
import { fetchOrders } from "../services/ordersApi.js";

export function useOrders(filters) {
  const orders = ref([]);
  const chartSnapshot = ref([]);
  const isLoading = ref(false);
  const errorMessage = ref("");
  const totalRecords = ref(0);
  let requestNumber = 0;

  watch(
    [
      () => filters.status,
      () => filters.from,
      () => filters.to,
      () => filters.page,
      () => filters.pageSize
    ],
    async (_newValues, _oldValues, onCleanup) => {
      const currentRequest = ++requestNumber;
      const controller = new AbortController();

      onCleanup(() => controller.abort());

      isLoading.value = true;
      errorMessage.value = "";

      try {
        const result = await fetchOrders(filters, controller.signal);

        // Ignore any response that no longer belongs to the latest request.
        if (currentRequest !== requestNumber) return;

        orders.value = result.items;
        totalRecords.value = result.total;

        // Treat chart data as a replace-only snapshot.
        chartSnapshot.value = result.chartPoints ?? [];
      } catch (error) {
        if (error.name !== "AbortError" && currentRequest === requestNumber) {
          errorMessage.value = error.message || "Something went wrong.";
        }
      } finally {
        if (currentRequest === requestNumber) {
          isLoading.value = false;
        }
      }
    },
    { immediate: true }
  );

  const orderCount = computed(() => orders.value.length);

  const revenueTotal = computed(() => {
    return orders.value.reduce((total, order) => {
      return total + Number(order.totalAmount || 0);
    }, 0);
  });

  const pendingValue = computed(() => {
    return orders.value.reduce((total, order) => {
      return order.status === "pending"
        ? total + Number(order.totalAmount || 0)
        : total;
    }, 0);
  });

  return {
    orders,
    chartSnapshot,
    isLoading,
    errorMessage,
    totalRecords,
    orderCount,
    revenueTotal,
    pendingValue
  };
}
```

**How this composable works**

- `filters` is a reactive object supplied by the screen. The watcher explicitly observes only the fields that should trigger a new request.
- `watch()` runs immediately because `{ immediate: true }` is configured.
- Each request gets an `AbortController`. When the watched source changes, cleanup aborts the previous request.
- `requestNumber` is an additional stale-response guard. Even if a response resolves near cancellation, only the latest request may update state.
- `isLoading` and `errorMessage` are state values because they change over time.
- `orderCount`, `revenueTotal`, and `pendingValue` are computed values because they can be derived from the current order list.
- The composable returns state and derived values so multiple screens can reuse the behavior.
- The `chartSnapshot` shown here uses `ref()` for readability. If the chart payload is very large and treated as immutable, it can be changed to `shallowRef([])` and replaced as a whole. That is a deliberate performance choice, not a requirement for all arrays.

A real API contract must guarantee the shape of `result.items`, `result.total`, and `result.chartPoints`, or validate it before assigning it. The example assumes a response such as `{ items: [], total: 0, chartPoints: [] }`.

**3. Dashboard screen: `src/views/OrdersDashboard.vue`**

```vue
<script setup>
import { computed, reactive, ref, watch } from "vue";
import { useOrders } from "../composables/useOrders.js";
import OrdersTable from "../components/OrdersTable.vue";

// These fields are edited together as one filter form.
const filters = reactive({
  status: "all",
  from: "2026-10-01",
  to: "2026-10-31",
  page: 1,
  pageSize: 25
});

const searchText = ref("");
const sortBy = ref("createdAt");
const sortDirection = ref("desc");

const {
  orders,
  chartSnapshot,
  isLoading,
  errorMessage,
  totalRecords,
  orderCount,
  revenueTotal,
  pendingValue
} = useOrders(filters);

// Search is local to the currently loaded page of results.
const visibleOrders = computed(() => {
  const query = searchText.value.trim().toLowerCase();

  const matchingOrders = orders.value.filter((order) => {
    return (
      !query ||
      String(order.orderNumber).toLowerCase().includes(query) ||
      String(order.customerName).toLowerCase().includes(query)
    );
  });

  return [...matchingOrders].sort((a, b) => {
    const first = a[sortBy.value];
    const second = b[sortBy.value];

    let comparison = 0;

    if (first < second) comparison = -1;
    if (first > second) comparison = 1;

    return sortDirection.value === "asc" ? comparison : -comparison;
  });
});

const revenueLabel = computed(() => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0
  }).format(revenueTotal.value);
});

const pendingValueLabel = computed(() => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0
  }).format(pendingValue.value);
});

// Reset paging when the main query filters change.
watch(
  [() => filters.status, () => filters.from, () => filters.to, () => filters.pageSize],
  () => {
    filters.page = 1;
  }
);

function changeSort(field) {
  if (sortBy.value === field) {
    sortDirection.value = sortDirection.value === "asc" ? "desc" : "asc";
    return;
  }

  sortBy.value = field;
  sortDirection.value = "asc";
}
</script>

<template>
  <main class="orders-dashboard">
    <header class="dashboard-heading">
      <div>
        <p class="eyebrow">OPERATIONS / REPORTING</p>
        <h1>Orders analytics</h1>
        <p>Monitor order activity and outstanding work.</p>
      </div>
    </header>

    <section class="filters" aria-label="Order filters">
      <label>
        Status
        <select v-model="filters.status">
          <option value="all">All statuses</option>
          <option value="pending">Pending</option>
          <option value="paid">Paid</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </label>

      <label>
        From
        <input v-model="filters.from" type="date" />
      </label>

      <label>
        To
        <input v-model="filters.to" type="date" />
      </label>

      <label>
        Rows per page
        <select v-model.number="filters.pageSize">
          <option :value="25">25</option>
          <option :value="50">50</option>
          <option :value="100">100</option>
        </select>
      </label>
    </section>

    <p v-if="isLoading" role="status">Loading orders...</p>
    <p v-else-if="errorMessage" role="alert">{{ errorMessage }}</p>

    <section class="metrics" aria-label="Order metrics">
      <article class="metric-card">
        <span>Orders on this page</span>
        <strong>{{ orderCount }}</strong>
      </article>

      <article class="metric-card">
        <span>Revenue on this page</span>
        <strong>{{ revenueLabel }}</strong>
      </article>

      <article class="metric-card">
        <span>Pending value on this page</span>
        <strong>{{ pendingValueLabel }}</strong>
      </article>

      <article class="metric-card">
        <span>Total matching records</span>
        <strong>{{ totalRecords }}</strong>
      </article>
    </section>

    <section class="table-toolbar">
      <label>
        Search current page
        <input v-model="searchText" type="search" placeholder="Order number or customer" />
      </label>

      <label>
        Sort by
        <select :value="sortBy" @change="changeSort($event.target.value)">
          <option value="createdAt">Created date</option>
          <option value="orderNumber">Order number</option>
          <option value="customerName">Customer</option>
          <option value="totalAmount">Amount</option>
        </select>
      </label>

      <span>Direction: {{ sortDirection }}</span>
    </section>

    <OrdersTable :orders="visibleOrders" />

    <section class="chart-note">
      <h2>Chart data snapshot</h2>
      <p>
        Received {{ chartSnapshot.length }} chart points. A chart library can consume
        this snapshot without Vue deeply tracking every point if shallowRef is used.
      </p>
    </section>
  </main>
</template>
```

**How the dashboard uses reactivity**

- `filters` uses `reactive()` because the fields form one filter model and are edited individually.
- `searchText`, `sortBy`, and `sortDirection` use `ref()` because they are independent values that may be replaced.
- `useOrders(filters)` keeps request logic outside the component.
- `visibleOrders` is computed because it is derived from loaded orders, search text, and sort state.
- `revenueLabel` and `pendingValueLabel` are computed display values.
- The `watch()` that resets the page is a side effect: changing the filter should reset the pagination state.
- The current search and sorting only apply to the loaded page. In a real large dataset, server-side search/sort/pagination may be needed so the browser does not have to process every record.

**4. Reusable table: `src/components/OrdersTable.vue`**

```vue
<script setup>
defineProps({
  orders: {
    type: Array,
    required: true
  }
});
</script>

<template>
  <div class="table-wrapper">
    <table>
      <thead>
        <tr>
          <th>Order</th>
          <th>Customer</th>
          <th>Status</th>
          <th>Created</th>
          <th class="amount-cell">Amount</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="order in orders" :key="order.id">
          <td>{{ order.orderNumber }}</td>
          <td>{{ order.customerName }}</td>
          <td>
            <span class="status-badge" :class="`status-${order.status}`">
              {{ order.status }}
            </span>
          </td>
          <td>{{ order.createdAt }}</td>
          <td class="amount-cell">
            {{ Number(order.totalAmount).toLocaleString("en-IN", {
              style: "currency",
              currency: "INR",
              maximumFractionDigits: 0
            }) }}
          </td>
        </tr>

        <tr v-if="orders.length === 0">
          <td colspan="5" class="empty-cell">No matching orders on this page.</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
```

**5. Styling note**

The example concentrates on the reactivity architecture, so the following CSS is a starter rather than a full design system. It can be added to the project's global stylesheet.

```css
.orders-dashboard {
  max-width: 1200px;
  margin: 0 auto;
  padding: 32px 24px;
  color: #202438;
}

.dashboard-heading p,
.eyebrow {
  color: #7b8196;
}

.eyebrow {
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 1.4px;
}

.filters,
.metrics,
.table-toolbar {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  margin: 24px 0;
}

.filters label,
.table-toolbar label {
  display: grid;
  gap: 7px;
  color: #656b80;
  font-size: 12px;
}

input,
select {
  min-height: 38px;
  padding: 8px 10px;
  border: 1px solid #dfe2eb;
  border-radius: 7px;
  background: #fff;
  color: #202438;
}

.metric-card {
  flex: 1 1 190px;
  padding: 18px;
  border: 1px solid #e4e7ef;
  border-radius: 12px;
  background: #fff;
}

.metric-card span,
.metric-card strong {
  display: block;
}

.metric-card span {
  margin-bottom: 10px;
  color: #7b8196;
  font-size: 12px;
}

.metric-card strong {
  font-size: 22px;
}

.table-wrapper {
  overflow-x: auto;
  border: 1px solid #e4e7ef;
  border-radius: 12px;
  background: #fff;
}

table {
  width: 100%;
  border-collapse: collapse;
  text-align: left;
  white-space: nowrap;
}

th,
td {
  padding: 14px 16px;
  border-bottom: 1px solid #edf0f5;
  font-size: 12px;
}

th {
  background: #f8f9fc;
  color: #737990;
}

.amount-cell {
  text-align: right;
}

.status-badge {
  display: inline-block;
  padding: 5px 8px;
  border-radius: 20px;
  background: #f0f1f6;
  font-size: 11px;
}

.status-pending {
  background: #fff0d9;
  color: #95600c;
}

.status-paid {
  background: #dcf7e9;
  color: #147b50;
}

.status-cancelled {
  background: #ffe5e8;
  color: #b52f46;
}

.empty-cell {
  padding: 28px;
  color: #7b8196;
  text-align: center;
}

.chart-note {
  margin-top: 24px;
  padding: 18px;
  border: 1px solid #e4e7ef;
  border-radius: 12px;
  background: #fff;
}

.chart-note p {
  color: #7b8196;
  font-size: 13px;
}
```

# Module 3 — Built-in Components & Templates

## 1. Dynamic Components

**Definition:** Dynamic components allow the component displayed in a particular location on a page to change at runtime based on a variable or application state. Vue provides the special `<component>` element with the `:is` attribute to render the selected component dynamically.

**Why dynamic components are needed**

In a real application, different sections may need to appear in the same content area depending on the user's actions.

For example, an order management dashboard may have the following sections:

* Order details
* Customer information
* Payment history
* Delivery tracking

One approach is to use `v-if` and `v-else-if` for every section. This works for a small number of components, but as the application grows, the template can become difficult to maintain.

Dynamic components allow the application to select which component should be rendered without writing a separate conditional block for every component.

**Syntax**

```vue
<component :is="activeComponent" />
```

Here, `activeComponent` determines which component Vue renders.

The value passed to `:is` can be:

* An imported component object.
* A registered component's name.
* An HTML element name when rendering a native element dynamically.

In a Vue application using `<script setup>`, imported components can be used directly in the template without explicitly registering them in a `components` option.

**Example — Switching between dashboard sections**

```vue
<script setup>
import { ref } from 'vue'
import OrderDetails from './OrderDetails.vue'
import PaymentHistory from './PaymentHistory.vue'
import DeliveryTracking from './DeliveryTracking.vue'

const activeTab = ref('orders')

const dashboardComponents = {
  orders: OrderDetails,
  payments: PaymentHistory,
  delivery: DeliveryTracking
}
</script>

<template>
  <div class="dashboard">
    <button @click="activeTab = 'orders'">Orders</button>
    <button @click="activeTab = 'payments'">Payments</button>
    <button @click="activeTab = 'delivery'">Delivery</button>

    <component :is="dashboardComponents[activeTab]" />
  </div>
</template>
```

**How it works**

* `activeTab` stores the currently selected section.
* `dashboardComponents` maps each tab identifier to its corresponding component.
* When a button is clicked, `activeTab` changes.
* Vue tracks the reactive value and updates the rendered component.
* The selected component appears in the same location where `<component>` is declared.

For example, selecting `payments` causes Vue to render `PaymentHistory`.

The component mapping also separates the tab identifiers from the actual component implementations. This makes it easier to add or rename dashboard sections.

**Important behaviour when switching components**

By default, Vue unmounts the previously active component when a different component replaces it.

Suppose `OrderDetails.vue` contains a search input and the user enters `ORD-1024`. If the user switches to `PaymentHistory.vue` and then returns to `OrderDetails.vue`, the previous component instance has normally been destroyed. A new instance is created, so its local input state returns to its initial value.

This behaviour is not necessarily a problem. Some components should start fresh whenever they are opened. However, it becomes inconvenient when the user is working on a long form or a detailed dashboard.

The built-in `<KeepAlive>` component can be used when the previous component state needs to be preserved.

**Dynamic components in production**

* Use dynamic components when several related views need to occupy the same content area.
* Keep the component mapping in a clear object instead of using complicated nested conditions.
* Pass required data through props and communicate changes through emitted events.
* Remember that dynamically switching components does not automatically preserve the previous component's local state.
* Use `<KeepAlive>` selectively when preserving component instances is useful.

**Flow of dynamic component rendering**

```text
User selects a dashboard tab
            |
            v
activeTab reactive value changes
            |
            v
Vue checks dashboardComponents
            |
            v
<component :is="selectedComponent">
            |
            v
Selected component is rendered
```

## 2. KeepAlive

**Definition:** `<KeepAlive>` is a built-in Vue component that caches inactive component instances instead of destroying them when switching between dynamic components. When a cached component is displayed again, Vue can reuse its existing instance and preserve its local state.

**Why KeepAlive is needed**

Dynamic components make it easy to switch between different views, but switching normally destroys the component that is no longer active.

In a production application, a component may contain:

* Form values entered by a user.
* Search terms and filter selections.
* The current pagination page.
* Expanded table rows.
* A partially completed workflow.
* Data loaded from an API.

Destroying and recreating the component can cause unnecessary data fetching and force the user to repeat previous actions.

`<KeepAlive>` helps avoid this by keeping selected component instances in memory.

**Syntax**

```vue
<KeepAlive>
  <component :is="activeComponent" />
</KeepAlive>
```

Vue caches the component instances rendered inside `<KeepAlive>`.

When the active component changes, the previous instance becomes inactive and is cached. If the same component is selected again, Vue can restore the cached instance instead of creating a new one.

**Example — Preserving a user's search and filters**

```vue
<script setup>
import { ref } from 'vue'
import OrdersView from './OrdersView.vue'
import CustomersView from './CustomersView.vue'

const activeView = ref('orders')

const views = {
  orders: OrdersView,
  customers: CustomersView
}
</script>

<template>
  <div>
    <button @click="activeView = 'orders'">Orders</button>
    <button @click="activeView = 'customers'">Customers</button>

    <KeepAlive>
      <component :is="views[activeView]" />
    </KeepAlive>
  </div>
</template>
```

Assume `OrdersView.vue` contains a search input, status filter, and pagination.

1. The user opens the Orders view.
2. The user searches for `ORD-1024` and moves to page 3.
3. The user switches to Customers.
4. The Orders component becomes inactive and is cached.
5. The user returns to Orders.
6. Vue reuses the cached component instance, preserving its local reactive state.

The component's state can survive the switch because the instance was cached rather than destroyed.

However, caching a component does not automatically guarantee that its data is fresh. If the orders have changed on the server while the component was inactive, the component may need to refresh its data when activated.

**KeepAlive with include, exclude, and max**

`<KeepAlive>` provides props to control its cache.

**`include`**

Caches only components whose names match the specified names or patterns.

```vue
<KeepAlive :include="['OrdersView', 'CustomersView']">
  <component :is="activeComponent" />
</KeepAlive>
```

**`exclude`**

Prevents matching components from being cached.

```vue
<KeepAlive :exclude="['PaymentConfirmation']">
  <component :is="activeComponent" />
</KeepAlive>
```

This is useful when a component should always be recreated instead of restoring an old instance.

**`max`**

Limits the number of cached component instances.

```vue
<KeepAlive :max="5">
  <component :is="activeComponent" />
</KeepAlive>
```

When the cache reaches its limit, Vue evicts the least recently accessed cached instance to make room for another one. This behaves like a least-recently-used (LRU) cache.

Component names matter when using `include` and `exclude`. In Vue 3.2.34 and later, single-file components using `<script setup>` automatically infer their component names from their filenames.

**KeepAlive lifecycle**

Cached components have a different lifecycle from ordinary components.

Vue provides two Composition API lifecycle hooks:

* `onActivated()` — called when a cached component is inserted into the active view. It is also called on the component's initial mount.
* `onDeactivated()` — called when a component is removed from the active view and placed into the cache. It is also called when the component is eventually unmounted.

Example:

```vue
<script setup>
import { onActivated, onDeactivated } from 'vue'

onActivated(() => {
  console.log('Orders view is active')
})

onDeactivated(() => {
  console.log('Orders view is inactive')
})
</script>
```

These hooks are useful when an inactive component needs to pause an activity and restart it when the user returns.

For example, a component displaying live order updates might stop an unnecessary polling timer when deactivated and restart it when activated.

**Important production considerations**

* Caching consumes memory because component instances remain in memory.
* Avoid caching every component without considering how many views the application contains.
* Refresh server-side data when necessary; cached state is not the same as current server data.
* Stop or pause timers, polling, and other background work when a cached component becomes inactive.
* Do not use component caching as a replacement for database persistence or durable application state.
* If sensitive information must not remain in memory after leaving a view, consider whether caching is appropriate.

**Dynamic components and KeepAlive work together**

```text
User opens Orders
        |
        v
Orders component is rendered
        |
        v
User switches to Customers
        |
        v
Orders component becomes inactive
        |
        v
KeepAlive caches Orders instance
        |
        v
User returns to Orders
        |
        v
Cached instance is reused
        |
        v
Previous local state is restored
```

## 3. Teleport

**Definition:** `<Teleport>` is a built-in Vue component that renders part of a component's template into a different location in the DOM tree while preserving its logical relationship with the original Vue component.

**Why Teleport is needed**

A Vue component's template is usually rendered within its parent's DOM structure. This is convenient for normal page content, but it can create problems for overlays such as modals, tooltips, and notifications.

Consider a modal inside a dashboard card.

The card might have:

* `overflow: hidden`, which clips the modal.
* A CSS `transform`, which changes how fixed-position elements behave.
* A stacking context that prevents the modal from appearing above other content.
* A `z-index` that cannot overcome a higher stacking context elsewhere on the page.

Increasing the modal's `z-index` does not always solve these problems because stacking contexts restrict how elements are layered.

`<Teleport>` allows the modal's rendered DOM to be placed elsewhere, commonly near the end of the document's `<body>`.

**Syntax**

```vue
<Teleport to="body">
  <div class="modal">
    Modal content
  </div>
</Teleport>
```

The `to` prop identifies the destination.

It can be a CSS selector such as `body` or `#modal-root`, or an actual DOM node.

The destination must exist when the Teleport is mounted. In Vue 3.5 and later, the `defer` prop can postpone resolving the target until later in the same mount/update tick.

**Example — Teleporting a confirmation modal**

```vue
<script setup>
import { ref } from 'vue'

const isModalOpen = ref(false)

function confirmDelete() {
  // The actual delete API call would happen here.
  isModalOpen.value = false
}
</script>

<template>
  <button @click="isModalOpen = true">
    Delete order
  </button>

  <Teleport to="body">
    <div v-if="isModalOpen" class="modal-overlay">
      <div class="modal">
        <h2>Delete this order?</h2>
        <p>This action cannot be undone.</p>

        <button @click="isModalOpen = false">
          Cancel
        </button>

        <button @click="confirmDelete">
          Confirm delete
        </button>
      </div>
    </div>
  </Teleport>
</template>
```

**How it works**

* `isModalOpen` controls whether the modal is displayed.
* Clicking the Delete order button changes `isModalOpen` to `true`.
* Vue renders the modal through `<Teleport>` into the document's `<body>`.
* Clicking Cancel closes the modal by changing the same reactive variable.
* Clicking Confirm delete calls the confirmation handler.

The example only demonstrates the modal's UI behaviour. A real deletion operation must call the backend, handle errors, and update the application state only when appropriate.

**Teleport changes DOM placement, not component ownership**

This is an important distinction.

Even though the modal's DOM is rendered under `<body>`, it remains logically part of the Vue component that contains `<Teleport>`.

Therefore:

* Reactive variables still work normally.
* Props can still be passed to child components inside the Teleport.
* Child components can still emit events to their logical parents.
* Dependency injection through `provide` and `inject` continues to work according to the Vue component hierarchy.

Teleport does not create a separate Vue application.

**Teleport and CSS**

A teleported element is no longer a DOM descendant of the element where its template was originally declared.

This means CSS selectors that depend on the original DOM ancestry may no longer match.

For example, a selector such as `.dashboard .modal-overlay` will not match a modal teleported directly into `<body>` unless the modal is actually inside an element with the `dashboard` class in the destination DOM.

Global styles or suitable component styles should be used for the teleported overlay.

**Multiple Teleports**

Multiple Teleport components can target the same destination.

For example, several modals may render into a shared `#modal-root` container. Their content is appended to the target, so a production application may need to coordinate stacking order and prevent multiple conflicting overlays.

**Production considerations for modals**

Teleport solves DOM placement problems, but it does not implement all modal behaviour.

A production modal may also need:

* Keyboard handling, including closing with Escape when appropriate.
* Focus management when opening and closing.
* Focus trapping when the modal is intended to block interaction with the page.
* Accessible dialog semantics and an accessible name.
* Background scroll management.
* Correct stacking behaviour when multiple overlays exist.
* Cleanup when the component closes or unmounts.

These behaviours should be implemented and tested separately from Teleport itself.

## 4. Suspense

**Definition:** `<Suspense>` is a built-in Vue component that coordinates asynchronous dependencies in a component tree and displays fallback content while those dependencies are being resolved.

**Why Suspense is needed**

In a production application, one page may depend on several components that need asynchronous work before they can render their final content.

For example, an order details page may contain:

* An order information component that loads order details.
* A customer component that loads customer information.
* A payment component that loads payment details.

Without a shared loading boundary, each component may need to manage its own loading UI. This can lead to several separate loading indicators appearing and disappearing at different times.

`<Suspense>` can provide a common fallback while Vue waits for supported asynchronous component dependencies in the default slot.

**Syntax**

```vue
<Suspense>
  <template #default>
    <OrderDetails />
  </template>

  <template #fallback>
    <p>Loading order details...</p>
  </template>
</Suspense>
```

There are two important slots:

* **`#default`** — contains the content Vue attempts to render.
* **`#fallback`** — contains the temporary content displayed while the supported asynchronous dependencies are pending.

The default slot must have one immediate child node. A `<template>` can be used to organise the slot content.

**What counts as an asynchronous dependency?**

Vue's `<Suspense>` coordinates two main types of dependencies:

* A component with an asynchronous `setup()` function.
* An asynchronous component created with `defineAsyncComponent()`, when it is controlled by the relevant Suspense boundary.

In `<script setup>`, a top-level `await` makes the component's setup asynchronous.

For example:

```vue
<script setup>
const response = await fetch('/api/orders/1024')

if (!response.ok) {
  throw new Error('Failed to load order')
}

const order = await response.json()
</script>

<template>
  <section>
    <h2>Order {{ order.id }}</h2>
    <p>Status: {{ order.status }}</p>
  </section>
</template>
```

When this component is rendered inside a Suspense boundary, Vue waits for its asynchronous setup to resolve before displaying the resolved content.

**Important distinction: Suspense does not detect every asynchronous operation**

Consider this code:

```vue
<script setup>
import { ref, onMounted } from 'vue'

const orders = ref([])

onMounted(async () => {
  const response = await fetch('/api/orders')
  orders.value = await response.json()
})
</script>
```

Here, the API request happens inside `onMounted()`. It is not an asynchronous setup dependency, so Suspense does not automatically wait for this request to finish.

The component can mount with an empty `orders` array while the request is running.

This is a common source of confusion: **Suspense coordinates supported asynchronous rendering dependencies; it is not a universal loading manager for all promises in the application.**

For API calls started in lifecycle hooks or event handlers, explicit loading and error state may still be necessary.

**Suspense rendering flow**

```text
Vue starts rendering default slot
                |
                v
Are there supported async dependencies?
          /             \
        No               Yes
        |                 |
        v                 v
Render resolved       Show fallback
content               content
                          |
                          v
                Wait for dependencies
                          |
                          v
                 Dependencies resolve
                          |
                          v
                 Render resolved content
```

**Suspense events**

Vue provides three events that can be used to observe the boundary's state:

* `@pending` — emitted when the boundary enters a pending state.
* `@resolve` — emitted when the default slot has finished resolving.
* `@fallback` — emitted when the fallback content is displayed.

Example:

```vue
<Suspense @pending="isLoading = true" @resolve="isLoading = false">
  <OrderDetails />

  <template #fallback>
    <p>Loading order details...</p>
  </template>
</Suspense>
```

This illustrates the events, but in a real component, `isLoading` must be declared in the script. Also, the exact timing of these events depends on the boundary's state transitions.

**Suspense and error handling**

Suspense does not provide a built-in error slot that automatically handles all errors from asynchronous dependencies.

A production application still needs error handling. Vue's `onErrorCaptured()` hook can be used by an ancestor component to capture errors from descendant components, including relevant asynchronous component errors.

A simplified example:

```vue
<script setup>
import { ref, onErrorCaptured } from 'vue'

const loadingError = ref('')

onErrorCaptured((error) => {
  loadingError.value = error.message

  // Stop this error from propagating to other error handlers.
  return false
})
</script>

<template>
  <p v-if="loadingError">
    Unable to load this section: {{ loadingError }}
  </p>
</template>
```

This component must be an ancestor of the component whose error it should capture. The error boundary and Suspense boundary solve different problems: Suspense coordinates loading, while error handling deals with failures.


## Example — Order Management Dashboard

**Real-world requirement**

An order management application has one main dashboard with three sections:

* **Order Workspace:** Search, filter, and update orders.
* **Customer Insights:** Review customer information and order history.
* **Payment Audit:** Review payment transactions and reconciliation information.

The application has the following requirements:

* Switch between dashboard sections without rendering all sections simultaneously.
* Preserve the user's search and filter state when switching sections.
* Display confirmation dialogs outside the dashboard's DOM hierarchy.
* Display fallback content while asynchronously loaded dashboard sections are being prepared.
* Handle asynchronous errors rather than leaving the user with an endless loading indicator.

The four built-in components have different responsibilities in this application.

| Built-in component | Responsibility |
|---|---|
| `<component :is="...">` | Selects the dashboard section. |
| `<KeepAlive>` | Preserves selected section instances between switches. |
| `<Teleport>` | Renders confirmation dialogs into a separate DOM location. |
| `<Suspense>` | Coordinates supported asynchronous component dependencies. |

**Suggested project structure**

```text
src/
├── components/
│   └── DeleteOrderModal.vue
├── views/
│   ├── OrderWorkspace.vue
│   ├── CustomerInsights.vue
│   └── PaymentAudit.vue
├── App.vue
└── main.js
```

The following implementation demonstrates the parent dashboard, asynchronous component loading, caching, and a teleported confirmation dialog. The three dashboard views are assumed to exist at the paths shown above.

**App.vue — Main dashboard**

```vue
<script setup>
import { ref, defineAsyncComponent, onErrorCaptured } from 'vue'
import DeleteOrderModal from './components/DeleteOrderModal.vue'

// These views are loaded only when they are needed.
const OrderWorkspace = defineAsyncComponent(() => import('./views/OrderWorkspace.vue'))
const CustomerInsights = defineAsyncComponent(() => import('./views/CustomerInsights.vue'))
const PaymentAudit = defineAsyncComponent(() => import('./views/PaymentAudit.vue'))

// This stores which section is currently selected.
const activeTab = ref('orders')

// This maps each tab to its component.
const dashboardViews = {
  orders: OrderWorkspace,
  customers: CustomerInsights,
  payments: PaymentAudit
}

// This controls the confirmation modal.
const showDeleteModal = ref(false)
const selectedOrderId = ref(null)

// This stores errors captured from descendant components.
const pageError = ref('')

function openDeleteModal(orderId) {
  selectedOrderId.value = orderId
  showDeleteModal.value = true
}

function closeDeleteModal() {
  showDeleteModal.value = false
  selectedOrderId.value = null
}

// This catches errors that bubble up from child components.
onErrorCaptured((error) => {
  pageError.value = error.message

  // Prevent the same error from continuing to ancestor handlers.
  return false
})
</script>

<template>
  <main class="dashboard">
    <header class="dashboard-header">
      <div>
        <h1>Order Management</h1>
        <p>Manage orders, customers, and payment activity.</p>
      </div>

      <nav class="dashboard-tabs" aria-label="Dashboard sections">
        <button :aria-pressed="activeTab === 'orders'" @click="activeTab = 'orders'">
          Orders
        </button>

        <button :aria-pressed="activeTab === 'customers'" @click="activeTab = 'customers'">
          Customers
        </button>

        <button :aria-pressed="activeTab === 'payments'" @click="activeTab = 'payments'">
          Payments
        </button>
      </nav>
    </header>

    <div v-if="pageError" class="error-message" role="alert">
      <p>Unable to display this section: {{ pageError }}</p>
      <button @click="pageError = ''">Dismiss</button>
    </div>

    <KeepAlive :max="3">
      <Suspense>
        <template #default>
          <component :is="dashboardViews[activeTab]" />
        </template>

        <template #fallback>
          <section class="loading-panel" aria-live="polite">
            <h2>Preparing dashboard</h2>
            <p>Please wait while this section loads.</p>
          </section>
        </template>
      </Suspense>
    </KeepAlive>

    <DeleteOrderModal
      v-if="showDeleteModal"
      :order-id="selectedOrderId"
      @close="closeDeleteModal"
    />
  </main>
</template>
```

**How the parent dashboard works**

**1. Asynchronous component loading**

```js
const OrderWorkspace = defineAsyncComponent(() => import('./views/OrderWorkspace.vue'))
```

`defineAsyncComponent()` creates a component that loads its implementation through a dynamic import when needed.

This helps divide the application into separately loadable JavaScript chunks, provided the build tool supports code splitting.

The browser does not need to download every dashboard view as part of the initial JavaScript bundle. A view can be loaded when it is first required.

This is a performance optimisation, but it does not automatically make the view's API requests faster. Network requests, backend processing, and rendering costs still need to be managed separately.

**2. Dynamic component selection**

```vue
<component :is="dashboardViews[activeTab]" />
```

The selected component comes from `dashboardViews`.

When `activeTab` changes, Vue renders the corresponding view in the same location. The application does not need three separate conditional rendering blocks for the main dashboard content.

**3. Component caching**

```vue
<KeepAlive :max="3">
  <Suspense>
    ...
  </Suspense>
</KeepAlive>
```

The intended behaviour is to preserve the dashboard section instances while the user switches between them, with at most three cached instances.

Since the maximum is three and the dashboard has three sections, the cache can retain all three section instances once they have been visited, subject to Vue's cache behaviour.

**4. Loading state**

```vue
<template #fallback>
  <section class="loading-panel" aria-live="polite">
    <h2>Preparing dashboard</h2>
    <p>Please wait while this section loads.</p>
  </section>
</template>
```

The fallback is used when the Suspense boundary encounters supported asynchronous dependencies while resolving its default slot.

The asynchronous components created with `defineAsyncComponent()` participate in Suspense by default. Their own loading, delay, timeout, and error options are ignored when the relevant Suspense boundary controls them.

**5. Error handling**

```js
onErrorCaptured((error) => {
  pageError.value = error.message
  return false
})
```

This provides a place to display an error captured from a descendant component.

However, it should not be treated as a complete replacement for error handling. A production implementation should also consider errors from failed component imports, retries, API requests, and user actions. In particular, asynchronous component loading failures should be handled using the appropriate `defineAsyncComponent()` error configuration or another deliberate error-handling strategy.

**DeleteOrderModal.vue — Confirmation modal using Teleport**

```vue
<script setup>
import { ref } from 'vue'

const props = defineProps({
  orderId: {
    type: [String, Number],
    required: true
  }
})

const emit = defineEmits(['close'])

const isDeleting = ref(false)
const errorMessage = ref('')

async function deleteOrder() {
  isDeleting.value = true
  errorMessage.value = ''

  try {
    const response = await fetch(`/api/orders/${props.orderId}`, {
      method: 'DELETE'
    })

    if (!response.ok) {
      throw new Error('Unable to delete this order.')
    }

    // Close the modal only after the server confirms success.
    emit('close')
  } catch (error) {
    errorMessage.value = error.message
  } finally {
    isDeleting.value = false
  }
}
</script>

<template>
  <Teleport to="body">
    <div class="modal-overlay">
      <section class="modal" role="dialog" aria-modal="true" aria-labelledby="delete-title">
        <h2 id="delete-title">Delete order {{ orderId }}?</h2>
        <p>This action cannot be undone.</p>

        <p v-if="errorMessage" class="error-message" role="alert">
          {{ errorMessage }}
        </p>

        <div class="modal-actions">
          <button :disabled="isDeleting" @click="emit('close')">
            Cancel
          </button>

          <button :disabled="isDeleting" @click="deleteOrder">
            {{ isDeleting ? 'Deleting...' : 'Confirm delete' }}
          </button>
        </div>
      </section>
    </div>
  </Teleport>
</template>
```

**How the modal works**

* The parent passes the selected order ID through the `order-id` prop.
* `defineProps()` exposes that value to the modal component.
* `defineEmits()` declares the `close` event used to notify the parent.
* `<Teleport to="body">` renders the overlay and dialog under the document's `<body>`.
* `deleteOrder()` sends a DELETE request to the backend.
* If the request fails, the modal displays an error and remains open.
* If the server confirms the deletion, the modal emits `close`.
* The parent handles that event and closes the modal.

The frontend is responsible for presenting the confirmation UI, but the backend must enforce authentication, authorisation, and the actual deletion rules.

**Production details to add before using this modal in a real application**

* Prevent the user from interacting with the background while the modal is open.
* Move keyboard focus into the dialog when it opens and restore focus when it closes.
* Support Escape and appropriate keyboard navigation.
* Refresh or update the order list after a successful deletion.
* Handle expired sessions, insufficient permissions, and server errors.
* Ensure the backend verifies that the user is allowed to delete the selected order.

**How all four concepts fit together**

```text
User selects a dashboard section
                 |
                 v
Dynamic component selects the view
                 |
                 v
KeepAlive reuses or caches its instance
                 |
                 v
Suspense coordinates supported async dependencies
                 |
          +------+------+
          |             |
          v             v
      Still loading   Resolved
          |             |
          v             v
   Show fallback    Show dashboard
                        |
                        v
              User requests deletion
                        |
                        v
              Open confirmation modal
                        |
                        v
               Teleport renders modal
                    under body
                        |
                        v
             Backend confirms deletion
                        |
                        v
              Close modal and update UI
```

**Important distinction between the four components**

* `<component :is="...">` decides **which component to render**.
* `<KeepAlive>` decides whether an inactive component instance should be **cached and reused**.
* `<Teleport>` decides **where a portion of the template appears in the DOM**.
* `<Suspense>` coordinates **when content with supported asynchronous dependencies becomes available for rendering**.



    <!-- Suspense handles the loading fallback for async views. -->
    <Suspense :timeout="0">
      <template #default>
        <!-- KeepAlive preserves the selected view's component instance. -->
        <KeepAlive :max="3">
          <component
            :is="dashboardViews[activeTab]"
            :key="activeTab"
            @request-delete="openDeleteModal"
          />
        </KeepAlive>
      </template>

      <template #fallback>
        <div class="suspense-fallback">
          <div class="loading-spinner"></div>
          <h2>Loading workspace...</h2>
          <p>Please wait while the workspace loads.</p>
        </div>
      </template>
    </Suspense>