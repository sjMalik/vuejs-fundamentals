<template>
    <header><slot name="header"></slot></header>
    <content><slot name="content"></slot></content>
    <footer><slot name="footer"></slot></footer>
</template>

<script>
export default {
    name: 'Child'
}
</script>