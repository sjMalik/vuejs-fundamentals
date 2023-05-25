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