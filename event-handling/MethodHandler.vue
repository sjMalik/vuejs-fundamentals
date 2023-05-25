<template>
    <button @click="greet">Greet</button>
</template>

<script>
    export default {
        data() {
            return {
                message: 'Hello World'
            }
        },
        methods: {
            greet(event) {
                alert(this.message);
                if(event.target.tagName) {
                    alert(event.target.tagName)
                }
            }
        }
    }
</script>