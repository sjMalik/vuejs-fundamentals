<template>
    <button @click="warn('Hello', $event)"></button>
</template>

<script>
    export default {
        methods: {
            warn(message, event){
                if(event){
                    event.preventDefault();
                }
                alert(message)
            }
        }
    }
</script>