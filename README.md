# vuejs-fundamentals

1. [What is VueJS](#what-is-vuejs)
2. [What is Sigle File Component](#single-file-component-sfc)
3. [API Style: Options API](#options-api)
4. [Vue Application Instance](#the-application-instance​)
5. [Root Component](#the-root-component)
6. [Deep Reactivity](#deep-reactivity)
7. [Computed Properties](#computed-properties)
8. [Binding HTML Class](#binding-html-classes)
9. [Conditional Rendering](#conditional-rendering)
10. [List Rendering](#list-rendering)
10. [What is event Handling](#event-handling)
11. [Event Modifiers](#event-modifiers)
12. [Form Input Binding](#form-input-binding)
13. [Lifecycle Hooks](#lifecycle-hooks)
14. [Watchers](#watchers)
15. [v-slot](#v-slot)
16. [Passing Props(Parent -> Child)](#passsing-props-passing-data-from-parent-to-child)
17. [Listening to events(Child -> Parent)](#listening-to-events-communicating-back-up-to-the-parent)
18. [Vuex and State Management](#vuex-and-state-management)
19. [Vue Router](#vue-router)

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
### Displaying Filtered/Sorted Results​
Sometimes we want to display a filtered or sorted version of an array without actually mutating or resetting the original data. In this case, you can create a computed property that returns the filtered or sorted array.

For example:
```
data() {
  return {
    numbers: [1, 2, 3, 4, 5]
  }
},
computed: {
  evenNumbers() {
    return this.numbers.filter(n => n % 2 === 0)
  }
}
<li v-for="n in evenNumbers">{{ n }}</li>
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
  - The difference is that an element with v-show will always be rendered and remain in the DOM; 
  - v-show only toggles the display CSS property of the element.
  - v-show doesn't support the `<template>` element, nor does it work with v-else

### v-if vs v-show
v-if is "real" conditional rendering because it ensures that event listeners and child components inside the conditional block are properly destroyed and re-created during toggles.

v-if is also lazy: if the condition is false on initial render, it will not do anything - the conditional block won't be rendered until the condition becomes true for the first time.

In comparison, v-show is much simpler - the element is always rendered regardless of initial condition, with CSS-based toggling.

Generally speaking, v-if has higher toggle costs while v-show has higher initial render costs. So prefer v-show if you need to toggle something very often, and prefer v-if if the condition is unlikely to change at runtime.

### v-if with v-for
When v-if and v-for are both used on the same element, v-if will be evaluated first.

## List Rendering
### v-for
We can use the `v-for` directive to render a list of items based on an array. The v-for directive requires a special syntax in the form of item in items, where items is the source data array and item is an alias for the array element being iterated on. `v-for` also supports an optional second alias for the index of the current item:
```
<template>
    <li v-for="(item, index) in items">{{ index }} - {{ item.message }}</li>
</template>

<script>
    export default {
        data() {
            return {
                items: [
                    {message: 'Foo'},
                    {message: 'Bar'}
                ]
            }
        }
    }
</script>
```
### Maintaining State with key​
When Vue is updating a list of elements rendered with v-for, by default it uses an "in-place patch" strategy. If the order of the data items has changed, instead of moving the DOM elements to match the order of the items, Vue will patch each element in-place and make sure it reflects what should be rendered at that particular index.

This default mode is efficient, but only suitable when your list render output does not rely on child component state or temporary DOM state (e.g. form input values).

To give Vue a hint so that it can track each node's identity, and thus reuse and reorder existing elements, you need to provide a unique key attribute for each item:
```
<template v-for="todo in todos" :key="todo.name">
  <li>{{ todo.name }}</li>
</template>
```

### Array Change Detection
Mutation Methods​
Vue is able to detect when a reactive array's mutation methods are called and trigger necessary updates. These mutation methods are:

- push()
- pop()
- shift()
- unshift()
- splice()
- sort()
- reverse()
### Replacing an Array​
Mutation methods, as the name suggests, mutate the original array they are called on. In comparison, there are also non-mutating methods, e.g. filter(), concat() and slice(), which do not mutate the original array but always return a new array. When working with non-mutating methods, we should replace the old array with the new one:
```
this.items = this.items.filter((item) => item.message.match(/Foo/))
```

## Event Handling
We can use the v-on directive, which we typically shorten to the @ symbol, to listen to DOM events and run some JavaScript when they're triggered. The usage would be v-on:click="handler" or with the shortcut, @click="handler".

The handler value can be one of the following:

* Inline handlers: Inline JavaScript to be executed when the event is triggered (similar to the native onclick attribute).
```
<button @click="count++">Add 1</button>
<p>Count is: {{ count }}</p>
```
* Method handlers: A property name or path that points to a method defined on the component.
```
<!-- `greet` is the name of the method defined above -->
<button @click="greet">Greet</button>

methods: {
  greet(event) {
    // `this` inside methods points to the current active instance
    alert(`Hello ${this.name}!`)
    // `event` is the native DOM event
    if (event) {
      alert(event.target.tagName)
    }
  }
}
```

### Accessing Event Argument in Inline Handlers
Sometimes we also need to access the original DOM event in an inline handler. You can pass it into a method using the special $event variable
```
<button @click="warn('Hello', $event)"></button>

methods: {
  warn(message, event){
    if(event){
      event.preventDefault();
    }
    alert(message);
  }
}
```

Reference: https://vuejs.org/guide/essentials/event-handling.html

## Event Modifiers
It is a very common need to call event.preventDefault() or event.stopPropagation() inside event handlers. We can easily DOM event into a method and access it using $event, it would be better if the methods can be purely about data logic rather than having to deal with DOM event details.
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
    - use capture mode when adding the event listener. i.e. an event targeting an inner element is handled here before being handled by that element
    ```
    <div @click.capture="doThis">...</div>
    ```
  - once
    - the click event will be triggered at most once
    ```
    <a @click.once="doThis"></a>
    ```
  - passive

### Key Modifiers​
When listening for keyboard events, we often need to check for specific keys. Vue allows adding key modifiers for v-on or @ when listening for key events:
```
<!-- only call `submit` when the `key` is `Enter` -->
<input @keyup.enter="submit" />

<!-- Alt + Enter -->
<input @keyup.alt.enter="clear" />

<!-- Ctrl + Click -->
<div @click.ctrl="doSomething">Do something</div>
```
Vue provides aliases for the most commonly used keys:

* enter
* tab
* delete (captures both "Delete" and "Backspace" keys)
* esc
* space
* up
* down
* left
* right

## Form Input Binding
When dealing with forms on the frontend, we often need to sync the state of form input elements with corresponding state in JavaScript. It can be cumbersome to manually wire up value bindings and change event listeners:
```
<input
  :value="text"
  @input="event => text = event.target.value">
```
The `v-model` directive helps us simplify the above to:
```
<input v-model="text">
```
 It automatically expands to different DOM property and event pairs based on the element it is used on:

* `<input>` with text types and `<textarea>` elements use value property and input event;
* `<input type="checkbox">` and `<input type="radio">` use checked property and change event;
* `<select>` use value as a prop and change as an event.

N.B. `v-model` will ignore the initial value, checked or selected attributes found on any form elements. It will always treat the current bound JavaScript state as the source of truth. You should declare the initial value on the JavaScript side, using the data option

### Modifiers​
* `.lazy​`: By default, v-model syncs the input with the data after each input event (with the exception of IME composition as stated above). You can add the lazy modifier to instead sync after change events:
```
<!-- synced after "change" instead of "input" -->
<input v-model.lazy="msg" />
```
* .number​: If you want user input to be automatically typecast as a number, you can add the number modifier to your v-model managed inputs:
```
<input v-model.number="age" />
```
If the value cannot be parsed with parseFloat(), then the original value is used instead.

The number modifier is applied automatically if the input has type="number".

* .trim​
If you want whitespace from user input to be trimmed automatically, you can add the trim modifier to your v-model-managed inputs:
```
<input v-model.trim="msg" />
```

## Lifecycle Hooks
Each vue coponent instance goes through a series of intialization steps while its created. For example its needs to 
* set up data observation, 
* compile the template, 
* mount the instance to the DOM, 
* update the DOM when data changes. 

Along this way it also runs functions called lifecycle hooks, giving user the opportunity to add their own code at specific stages.

By using these hooks, you will know when your component is created, added to the DOM, updated, or destroyed.

Reference: https://github.com/sudheerj/vuejs-interview-questions#what-are-the-lifecycle-methods-of-vuejs

### i. Creation(Initialization): 
Creation Hooks allow you to perform actions before your component has even been added to the DOM. You need to use these hooks if you need to set things up in your component both during client rendering and server rendering. Unlike other hooks, creation hooks are also run during server-side rendering.
#### beforeCreate: 
This hook runs at the very initialization of your component. hook observes data and initialization events in your component. Here, data is still not reactive and events that occur during the component’s lifecycle have not been set up yet.
```
    new Vue({
      data: {
       count: 10
      },
      beforeCreate: function () {
        console.log('Nothing gets called at this moment')
        // `this` points to the view model instance
        console.log('count is ' + this.count);
      }
    })
       // count is undefined
```
#### created: 
This hook is invoked when Vue has set up events and data observation. Here, events are active and access to reactive data is enabled though templates have not yet been mounted or rendered.
  new Vue({
    data: {
     count: 10
    },
    created: function () {
      // `this` points to the view model instance
      console.log('count is: ' + this.count)
    }
  })
     // count is: 10
Note: Remember that, You will not have access to the DOM or the target mounting element (this.$el) inside of creation hooks

### ii. Mounting(DOM Insertion): 
Mounting hooks are often the most-used hooks and they allow you to access your component immediately before and after the first render.
#### beforeMount: 
The beforeMount allows you to access your component immediately before and after the first render.
```
  new Vue({
    beforeMount: function () {
      // `this` points to the view model instance
      console.log(`this.$el is yet to be created`);
    }
  })
```
#### mounted: 
This is a most used hook and you will have full access to the reactive component, templates, and rendered DOM (via. this.$el). The most frequently used patterns are fetching data for your component.
```
<div id="app">
    <p>I’m text inside the component.</p>
</div>
  new Vue({
    el: ‘#app’,
    mounted: function() {
      console.log(this.$el.textContent); // I'm text inside the component.
    }
  })
  ```

### Updating (Diff & Re-render): 
Updating hooks are called whenever a reactive property used by your component changes, or something else causes it to re-render
#### beforeUpdate: 
The beforeUpdate hook runs after data changes on your component and the update cycle begins, right before the DOM is patched and re-rendered.
```
<div id="app">
  <p>{{counter}}</p>
</div>
...// rest of the code
  new Vue({
    el: '#app',
    data() {
      return {
        counter: 0
      }
    },
     created: function() {
      setInterval(() => {
        this.counter++
      }, 1000)
    },

    beforeUpdate: function() {
      console.log(this.counter) // Logs the counter value every second, before the DOM updates.
    }
  })
```
#### updated: 
This hook runs after data changes on your component and the DOM re-renders.
```
<div id="app">
  <p ref="dom">{{counter}}</p>
</div>
...//
  new Vue({
    el: '#app',
    data() {
      return {
        counter: 0
      }
    },
     created: function() {
      setInterval(() => {
        this.counter++
      }, 1000)
    },
    updated: function() {
      console.log(+this.$refs['dom'].textContent === this.counter) // Logs true every second
    }
  })
```

### Destruction (Teardown): 
Destruction hooks allow you to perform actions when your component is destroyed, such as cleanup or analytics sending.
#### beforeDestroy: 
beforeDestroy is fired right before teardown. If you need to cleanup events or reactive subscriptions, beforeDestroy would probably be the time to do it. Your component will still be fully present and functional.
```
new Vue ({
  data() {
    return {
      message: 'Welcome VueJS developers'
    }
  },

  beforeDestroy: function() {
    this.message = null
    delete this.message
  }
})
```
#### destroyed: 
This hooks is called after your component has been destroyed, its directives have been unbound and its event listeners have been removed.
```
new Vue ({
    destroyed: function() {
      console.log(this) // Nothing to show here
    }
  })
```

## Watchers
Computed properties allow us to declaratively compute derived values. However, there are cases where we need to perform "side effects" in reaction to state changes - for example, mutating the DOM, or changing another piece of state based on the result of an async operation.

With the Options API, we can use the watch option to trigger a function whenever a reactive property changes:
```
export default {
  data() {
    return {
      question: '',
      answer: 'Questions usually contain a question mark. ;-)'
    }
  },
  watch: {
    // whenever question changes, this function will run
    question(newQuestion, oldQuestion) {
      if (newQuestion.includes('?')) {
        this.getAnswer()
      }
    }
  },
  methods: {
    async getAnswer() {
      this.answer = 'Thinking...'
      try {
        const res = await fetch('https://yesno.wtf/api')
        this.answer = (await res.json()).answer
      } catch (error) {
        this.answer = 'Error! Could not reach the API. ' + error
      }
    }
  }
}
```
```
<p>
  Ask a yes/no question:
  <input v-model="question" />
</p>
<p>{{ answer }}</p>
```
### Deep Watchers​
watch is shallow by default: the callback will only trigger when the watched property has been assigned a new value - it won't trigger on nested property changes. If you want the callback to fire on all nested mutations, you need to use a deep watcher:
```
export default {
  watch: {
    someObject: {
      handler(newValue, oldValue) {
        // Note: `newValue` will be equal to `oldValue` here
        // on nested mutations as long as the object itself
        // hasn't been replaced.
      },
      deep: true
    }
  }
}
```

### Eager Watchers​
watch is lazy by default: the callback won't be called until the watched source has changed. But in some cases we may want the same callback logic to be run eagerly - for example, we may want to fetch some initial data, and then re-fetch the data whenever relevant state changes.

We can force a watcher's callback to be executed immediately by declaring it using an object with a handler function and the immediate: true option:
```
export default {
  // ...
  watch: {
    question: {
      handler(newQuestion) {
        // this will be run immediately on component creation.
      },
      // force eager callback execution
      immediate: true
    }
  }
  // ...
}
```
The initial execution of the handler function will happen just before the created hook. Vue will have already processed the data, computed, and methods options, so those properties will be available on the first invocation.

## Template Refs
While Vue's declarative rendering model abstracts away most of the direct DOM operations for you, there may still be cases where we need direct access to the underlying DOM elements. To achieve this, we can use the special ref attribute.
It allows us to obtain a direct reference to a specific DOM element or child component instance after it's mounted. 
```
<script>
export default {
  mounted() {
    this.$refs.input.focus()
  }
}
</script>

<template>
  <input ref="input" />
</template>
```
Note that you can only access the ref after the component is mounted. If you try to access $refs.input in a template expression, it will be null on the first render. This is because the element doesn't exist until after the first render!

## Components Basics
Components allow us to split the UI into independent and reusable pieces, and think about each piece in isolation. It's common for an app to be organized into a tree of nested components:
`ButtonCounter.vue`
```
<script>
export default {
  data() {
    return {
      count: 0
    }
  }
}
</script>

<template>
  <button @click="count++">You clicked me {{ count }} times.</button>
</template>
```
To use a child component, we need to import it in the parent component. 
```
<script>
import ButtonCounter from './ButtonCounter.vue'

export default {
  components: {
    ButtonCounter
  }
}
</script>

<template>
  <h1>Here is a child component!</h1>
  <ButtonCounter />
</template>
```

---
<p align="center">
  <a href=https://vuejs.org/guide/essentials/component-basics.html>
    <img src=https://vuejs.org/assets/components.7fbb3771.png alt="ZTM Logo">
  </a>
</p>

---

## v-slot
slots are a way to pass HTML from a parent component to a child component in Vue. js. This allows us to create reusable components that can be customized according to the needs of the individual developer.
```
Vue.component('alert', {
  template: `
    <div class="alert-box">
      <strong>Error!</strong>
      <slot></slot>
    </div>
  `
})
```
Now you can insert dynamic content as below,
```
<alert>
  There is an issue with in application.
</alert>
```

Refernce: https://vuejs.org/api/built-in-directives.html#v-slot

## Passsing Props (Passing data from parent to child)
If we are building a blog, we will likely need a component representing a blog post. We want all the blog posts to share the same visual layout, but with different content. Such a component won't be useful unless you can pass data to it, such as the title and content of the specific post we want to display. That's where props come in.

Props are custom attributes you can register on a component. To pass a title to our blog post component, we must declare it in the list of props this component accepts, using the props option:
```
<!-- BlogPost.vue -->
<script>
export default {
  props: ['title']
}
</script>

<template>
  <h4>{{ title }}</h4>
</template>
```
When a value is passed to a prop attribute, it becomes a property on that component instance. The value of that property is accessible within the template and on the component's this context, just like any other component property.
```
<BlogPost title="My journey with Vue" />
<BlogPost title="Blogging with Vue" />
<BlogPost title="Why Vue is so fun" />
```

## Listening to Events (communicating back up to the parent)
As we develop our <BlogPost> component, some features may require communicating back up to the parent. For example, we may decide to include an accessibility feature to enlarge the text of blog posts, while leaving the rest of the page at its default size.

In the parent, we can support this feature by adding a postFontSize data property:

 we want clicking the button to communicate to the parent that it should enlarge the text of all posts. To solve this problem, components provide a custom events system. The parent can choose to listen to any event on the child component instance with v-on or @, just as we would with a native DOM event:
```
data() {
  return {
    posts: [
      /* ... */
    ],
    postFontSize: 1
  }
}

<div :style="{ fontSize: postFontSize + 'em' }">
  <BlogPost
    v-for="post in posts"
    :key="post.id"
    :title="post.title"
     @enlarge-text="postFontSize += 0.1"
   />
</div>
```
Then the child component can emit an event on itself by calling the built-in $emit method, passing the name of the event:
`BlogSpot.vue`
```
<!-- BlogPost.vue, omitting <script> -->
<template>
  <div class="blog-post">
    <h4>{{ title }}</h4>
    <button @click="$emit('enlarge-text')">Enlarge text</button>
  </div>
</template>
```
Thanks to the @enlarge-text="postFontSize += 0.1" listener, the parent will receive the event and update the value of postFontSize.

## Vuex and State Management
Reference: https://github.com/sjMalik/vuex-basics/tree/master#vuex-basics

Video Reference: https://www.youtube.com/watch?v=2CSr2vBApSI&list=PL55RiY5tL51pT0DNJraU93FhMzhXxtDAo&index=1&t=387s&ab_channel=Academind

```
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

// Vuex uses single state tree i.e. the single object contains all of your application level state
//and serve as single source of truth. It allows us to easily take snapshots of the current state
const state = {
    todos: [
        {id: 1, text: '...', done: true},
        {id: 2, text: '...', done: false}
    ]
};

// Sometimes we may need compute derived state based on the stored state. If more than 
// one component needs to make use of this we have to either duplicate the function or
// extract it into shared helper and import in multiple places. But with the use of getters
// in the store we can do it easily. You can think its computed property of stores
const getters = {
    doneTodos: function(state) {
        return state.todos.filter(todo=> todo.done);
    },
    count: 1
}

// mapGetters helper simply map store getters to local computed property
/**
 * import {mapGetters} from 'vuex';
 * 
 * export default {
 *      computed: {
 *          ...mapGetters([doneTodos])
 *      }
 * }
 */

// The only way to actually change state in Vuex is commiting the mutation. Vuex mutation
// are very similar to the events

const mutations = {
    markTodoAsDone: function(state, id){
        let targetTodo = state.todos.find(state=> state.id === id);
        targetTodo.done = true;
    }
}

// You cannot directly call a mutation handler. Think of it more like event registration
// To invoke a mutation handler, you need to call store.commit with its type
/**
 * this.$store.commit('markTodoAsDone', 1)
 */

// One important rule to remember is that mutation handler functions must be synchronous. To handle asynchronous operations, let's introduce Actions.
const actions = {
    changeTodoAsync: function({commit}) {
        setTimeout(()=> {
            commit('markTodoAsDone')
        }, 1000)
    }
}

// Actions are triggered with the store.dispatch method:
/**
 * this.$store.dispatch('changeTodoAsync', {
  id: 1
 })
 */

export default new Vuex.Store({
    state,
    mutations,
    getters,
    actions
})
```
## Vue Router
```
import Vue from 'vue';
import VueRouter from 'vue-router';

const Home = {template: '<div>Home</div>'};
const About = {template: '<div>About</div>'};

Vue.use(VueRouter);

const routes = [
    {path: '/', component: Home},
    {path: '/about', component: About},
];

const router = new VueRouter({
    mode: 'history',
    routes,
});

export default router;
```