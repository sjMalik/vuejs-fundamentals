# vuejs-fundamentals

1. [What is VueJS](#what-is-vuejs)
2. [What is Sigle File Component](#single-file-component-sfc)
3. [API Style: Options API](#options-api)
4. [Vue Application Instance](#the-application-instance​)
5. [Root Component](#the-root-component)
6. [Deep Reactivity](#deep-reactivity)
7. [Computed Properties](#computed-properties)
8. [What is event Handling](#event-handling)
9. [Event Modifiers](#event-modifiers)

## What is VueJS?
Vue (pronounced /vjuː/, like view) is a JavaScript framework for building user interfaces. It builds on top of standard HTML, CSS, and JavaScript and provides a declarative and component-based programming model that helps you efficiently develop user interfaces, be they simple or complex.

```
import { createApp } from 'vue'

createApp({
  data() {
    return {
      count: 0
    }
  }
}).mount('#app')

<div id="app">
  <button @click="count++">
    Count is: {{ count }}
  </button>
</div>
```
The above example demonstrates the two core features of Vue:

* Declarative Rendering: Vue extends standard HTML with a template syntax that allows us to declaratively describe HTML output based on JavaScript state.

* Reactivity: Vue automatically tracks JavaScript state changes and efficiently updates the DOM when changes happen.

## Single File Component (SFC)
In most build-tool-enabled Vue projects, we author Vue components using an HTML-like file format called Single-File Component (also known as *.vue files, abbreviated as SFC). A Vue SFC, as the name suggests, encapsulates the component's logic (JavaScript), template (HTML), and styles (CSS) in a single file
```
<template>
    <button @click="counter++">Increment</button>
    <p>{{ counter }}</p>
</template>

<script>
    export default {
        data() {
            return {
                counter: 0
            }
        }
    }
</script>

<style scoped>
    button {
        font-weight: bold;
    }
</style>
```

## API Styles
Vue component can be authored in two different API styles: Options API and Composition API

### Options API
With Options API we define component's logic using an object such as data, method and mounted. Properties defined by options are exposed on `this` inside functions, which points to component instance
```
<script>
export default {
  // Properties returned from data() become reactive state
  // and will be exposed on `this`.
  data() {
    return {
      count: 0
    }
  },

  // Methods are functions that mutate state and trigger updates.
  // They can be bound as event handlers in templates.
  methods: {
    increment() {
      this.count++
    }
  },

  // Lifecycle hooks are called at different stages
  // of a component's lifecycle.
  // This function will be called when the component is mounted.
  mounted() {
    console.log(`The initial count is ${this.count}.`)
  }
}
</script>

<template>
  <button @click="increment">Count is: {{ count }}</button>
</template>
```

## The application instance​
Every Vue application starts by creating a new application instance with the createApp function:
```
import { createApp } from 'vue'

const app = createApp({
  /* root component options */
})
```

## The Root Component
The object we are passing into createApp is in fact a component. Every app requires a "root component" that can contain other components as its children.

If you are using Single-File Components, we typically import the root component from another file:
```
import { createApp } from 'vue'
// import the root component App from a single-file component.
import App from './App.vue'

const app = createApp(App)
```
### Application Component Tree
```
App (root component)
├─ TodoList
│  └─ TodoItem
│     ├─ TodoDeleteButton
│     └─ TodoEditButton
└─ TodoFooter
   ├─ TodoClearButton
   └─ TodoStatistics
```

## Mounting the App​
An application instance won't render anything until its .mount() method is called. It expects a "container" argument, which can either be an actual DOM element or a selector string:
```
<div id="app"></div>
app.mount('#app')
```
The .mount() method should always be called after all app configurations and asset registrations are done.

## Deep Reactivity
In Vue, state is deeply reactive by default. This means you can expect changes to be detected even when you mutate nested objects or arrays
```
export default {
  data() {
    return {
      obj: {
        nested: { count: 0 },
        arr: ['foo', 'bar']
      }
    }
  },
  methods: {
    mutateDeeply() {
      // these will work as expected.
      this.obj.nested.count++
      this.obj.arr.push('baz')
    }
  }
}
```

## Event Handling
We can use the v-on directive, which we typically shorten to the @ symbol, to listen to DOM events and run some JavaScript when they're triggered. The usage would be v-on:click="handler" or with the shortcut, @click="handler".

Reference: https://vuejs.org/guide/essentials/event-handling.html

## Event Modifiers
We can easily DOM event into a method and access it using $event, it would be better if the methods can be purely about data logic rather than having to deal with DOM event details.
To address this problem, Vue provides event modifiers for v-on. Recall that modifiers are directive postfixes denoted by a dot.
  - stop
    - The click event's propagation will be stopped
    ```
    <a @click.stop="doThis"></a>
    ```
  - prevent
    - The submit event no longer reload the page 
    ```
      <form @submit.prevent="onSubmit"></form>
    ```
  - self
  - capture
  - once
  - passive


## Declaring Reactive State
With the Options API, we use the data option to declare reactive state of a component. The option value should be a function that returns an object. Vue will call the function when creating a new component instance, and wrap the returned object in its reactivity system. Any top-level properties of this object are proxied on the component instance (this in methods and lifecycle hooks):

These instance properties are only added when the instance is first created, so you need to ensure they are all present in the object returned by the data function. Where necessary, use null, undefined or some other placeholder value for properties where the desired value isn't yet available.
```
export default {
  data() {
    return {
      count: 1
    }
  },

  // `mounted` is a lifecycle hook which we will explain later
  mounted() {
    // `this` refers to the component instance.
    console.log(this.count) // => 1

    // data can be mutated as well
    this.count = 2
  }
}
```

## Declaring Methods
To add methods to a component instance we use the methods option. This should be an object containing the desired methods.

Vue automatically binds the this value for methods so that it always refers to the component instance. This ensures that a method retains the correct this value if it's used as an event listener or callback. You should avoid using arrow functions when defining methods, as that prevents Vue from binding the appropriate this value

## Computed Properties
In-template expressions are very convenient, but they are meant for simple operations. Putting too much logic in your templates can make them bloated and hard to maintain. More importantly, we probably don't want to repeat ourselves if we need to include this calculation in the template more than once. That's why for complex logic that includes reactive data, it is recommended to use a computed property.
```
 computed: {
    // a computed getter
    publishedBooksMessage() {
      // `this` points to the component instance
      return this.author.books.length > 0 ? 'Yes' : 'No'
    }
  }
  ```
### Computed Caching vs. Methods
Instead of a computed property, we can define the same function as a method. For the end result, the two approaches are indeed exactly the same. However, the difference is that computed properties are cached based on their reactive dependencies. A computed property will only re-evaluate when some of its reactive dependencies have changed.
In comparison, a method invocation will always run the function whenever a re-render happens.

Why do we need caching? Imagine we have an expensive computed property list, which requires looping through a huge array and doing a lot of computations. Then we may have other computed properties that in turn depend on list. Without caching, we would be executing list’s getter many more times than necessary! In cases where you do not want caching, use a method call instead.

### Writable Computed
Computed properties are by default getter-only. If you attempt to assign a new value to a computed property, you will receive a runtime warning. In the rare cases where you need a "writable" computed property, you can create one by providing both a getter and a setter:
```
computed: {
    fullName: {
      // getter
      get() {
        return this.firstName + ' ' + this.lastName
      },
      // setter
      set(newValue) {
        // Note: we are using destructuring assignment syntax here.
        [this.firstName, this.lastName] = newValue.split(' ')
      }
    }
  }
  ```

  ### Getters should be side-effect free
  Don't make async requests or mutate the DOM inside a computed getter! Think of a computed property as declaratively describing how to derive a value based on other values - its only responsibility should be computing and returning that value. Later in the guide we will discuss how we can perform side effects in reaction to state changes with watchers.

  ### Avoid mutating computed value
  The returned value from a computed property is derived state. Think of it as a temporary snapshot - every time the source state changes, a new snapshot is created. It does not make sense to mutate a snapshot, so a computed return value should be treated as read-only and never be mutated 

  ## Binding HTML Classes
  We can pass an object to :class (short for v-bind:class) to dynamically toggle classes:
  ```
  <div :class="{ active: isActive }"></div>
  ```
  ### Binding to Arrays
  We can bind :class to an array to apply a list of classes:
  ```
  data() {
  return {
    activeClass: 'active',
    errorClass: 'text-danger'
  }
}
<div :class="[activeClass, errorClass]"></div>
```
### Binding Inline Styles
```
<div :style="{ color: activeColor, fontSize: fontSize + 'px' }"></div>
```

## Conditional Rendering
The directive v-if is used to conditionally render a block. The block will only be rendered if the directive's expression returns a truthy value.
```
<h1 v-if='awesome'>Vue is awesome</h1>
```

### v-if on `<template>`
Because v-if is a directive, it has to be attached to a single element. But what if we want to toggle more than one element? In this case we can use v-if on a `<template>` element, which serves as an invisible wrapper.

### v-show
Another option for conditionally displaying an element is the v-show directive

  * The difference is that an element with v-show will always be rendered and remain in the DOM; 
  * v-show only toggles the display CSS property of the element.
  * v-show doesn't support the <template> element, nor does it work with v-else
  
### v-if vs v-show
v-if is "real" conditional rendering because it ensures that event listeners and child components inside the conditional block are properly destroyed and re-created during toggles.

v-if is also lazy: if the condition is false on initial render, it will not do anything - the conditional block won't be rendered until the condition becomes true for the first time.

In comparison, v-show is much simpler - the element is always rendered regardless of initial condition, with CSS-based toggling.

Generally speaking, v-if has higher toggle costs while v-show has higher initial render costs. So prefer v-show if you need to toggle something very often, and prefer v-if if the condition is unlikely to change at runtime.

### v-if with v-for
When v-if and v-for are both used on the same element, v-if will be evaluated first.

## List Rendering
