<template>
    <div id="app">
        <button @click="count++">Clicm me</button>
        <p>{{ count }}</p>
    </div>
</template>

<script>
    import {createApp} from 'vue';

    createApp({
        data() {
            return {
                count: 0
            }
        }
    }).mount('#app');
</script>

<style scoped>
    button {
        font-weight: bold;
    }
</style>