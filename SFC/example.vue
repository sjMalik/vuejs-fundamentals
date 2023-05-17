<template>
    <button @click="counter++">Count is {{ counter }}</button>
</template>

<script>
    export default{
        data(){
            return {
                counter: 0
            }
        }
    }
</script>

<style>
    button {
        font-weight: bold;
    }
</style>