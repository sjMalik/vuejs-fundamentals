<template>
    <Child>
        <template v-slot:header><h2>Show in v-slot</h2></template>
        <template v-slot:content><p>We have learned that components can accept props, which can be JavaScript values of any type. But how about template content? In some cases, we may want to pass a template fragment to a child component, and let the child component render the fragment within its own template.</p></template>
        <template v-slot:footer><h2>sjmalik</h2></template>
    </Child>
</template>

import Child from './Child.vue';
<script>
export default {
    name: 'Parent'
}
</script>