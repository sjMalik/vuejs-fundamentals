<template>
    <h1>Radio and Checkbox</h1>
    <label for="php">PHP</label>
    <input type="checkbox" value="php" id="php" v-model="tech">
    <label for="Javascript">Javascript</label>
    <input type="checkbox" value="js" id="js" v-model="tech">
    <label for="Java"></label>
    <input type="checkbox" value="Java" id="java" v-model="tech">

    <label for="developer">developer</label>
    <input type="radio" value="developer" id="developer" v-model="role">
    <label for="consultant">consultant</label>
    <input type="radio" value="con" id="con" v-model="role">

    <br>
    <br>
    <p>Checkbox: {{ tech }}</p>
    <br>
    <p>Radio: {{ role }}</p>
</template>

<script>
    export default {
        data() {
            return {
                tech: [],
                role: null
            }
        }
    }
</script>