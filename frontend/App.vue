<template>
    <h1>{{ msg }}</h1>
</template>

<script>
export default {
    el: '#app',
    data() {
        return {
            msg: 'hi'
        }
    }
}
</script>

<style>
h1{
    color: red;
}
</style>