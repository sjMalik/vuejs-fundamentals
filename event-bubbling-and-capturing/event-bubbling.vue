<!-- When an event happens on an element, it first runs the handlers on it, then on its parent, then all the way up on other ancestors. -->
<!-- Stop Bubbbling - event.stopPropagation() or event.stopImmediatePropagation() in case of multiple events -->

<!-- So if we click on <p>, then we’ll see 3 alerts: p → div → form. -->
<!-- The process is called “bubbling”, because events “bubble” from the inner element up through parents like a bubble in the water. -->
<!-- To stop bubbling we can use event.stopPropagation() -->
<!-- Bubbling is convenient. Don’t stop it without a real need: obvious and architecturally well thought out.
Sometimes event.stopPropagation() creates hidden pitfalls that later may become problems. -->


<!-- EVENT CAPTURING -->
<!-- Event capturing is one of two ways to do event propagation in the HTML DOM. 
    In event capturing, an event propagates from the outermost element to the target element. 
    It is the opposite of event bubbling, where events propagate outwards from the target to the outer elements. -->

<template>
    <form onclick="alert('form')">
      FORM
      <div onclick="alert('div')">
        DIV
        <p onclick="alert('p')">P</p>
      </div>
    </form>
  </template>
  
  <style scoped>
  body * {
    margin: 10px;
    border: 1px solid;
  }
  </style>