<!-- With the Options API, we use the data option to declare reactive state of a component. 
    The option value should be a function that returns an object. Vue will call the function when creating a new component instance, 
    and wrap the returned object in its reactivity system. -->

<template>
    <p>{{ counter }}</p>
</template>

<script>
    export default {
        data() {
            return {
                count: 1
            }
        }
    }
</script>