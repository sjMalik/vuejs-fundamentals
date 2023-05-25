<template>
    <!-- The click event's propagation will be stopped -->
    <a @click.stop="doThis"></a>
    <!-- The submit event no longer reload the page -->
    <form @submit.prevent="onSubmit"></form>
    <!-- Modifer can be chained -->
    <a @click.stop.prevent="doThis"></a>
</template>

<script>
    export default {
        methods: {
            doThis(){},
            onSubmit(){}
        }
    }
</script>