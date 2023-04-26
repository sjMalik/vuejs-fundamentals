<template>
    <p>Original Message: {{ message }}</p>
    <p>Reverse Message: {{ reverseMessage }}</p>
    <!-- <p>Reverse Message: {{ message.split('').reverse().join('') }}</p> -->
</template>

<script>
    export default {
        computed: {
            reverseMessage: function() {
                return this.message.split('').reverse().join('')
            }
        },
        data(){
            return {
                message: 'Hello'
            }
        }
    }
</script>