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

<style lang="scss" scoped>
$color: red;
h1{
    color: $color;
    display: flex;
}
</style>