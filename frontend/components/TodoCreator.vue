<template>
    <div>
        <button @click="createTodo">추가</button>
        <input 
            :value="title"
            placeholder="할 일 작성"
            type="text"
            @input="title = $event.target.value"
            @keypress.enter="createTodo(title)"/>
    </div>
</template>
<script>
export default {
    data () {
        return {
            title: '',
            placeholder: "할 일 추가"
        }
    },
    methods: {
        createTodo () {
            const validatedTitle = this.title && this.title.trim()
            if(!validatedTitle) {
                console.log("유효 X"),
                validatedTitle.trim()
                return
            }
                this.$emit('create-todo', this.title)
                this.title = ''

        }
    }
}
</script>