<template>
    <h1>Get Input values</h1>
    <input type="email" name="email" id="email" v-model="email" />
    <br>
    <input type="password" name="password" id="password" v-model="password" />
    <br>
    <button type="button" @click="getVal()">Click Me</button>
</template>

<script>
    import RadioAndCheckbox from './RadioAndCheckbox.vue';

    export default {
    data() {
        return {
            email: "",
            password: ""
        };
    },
    methods: {
        getVal() {
            console.warn(this.email, this.password);
        }
    },
    components: { RadioAndCheckbox }
}
</script>