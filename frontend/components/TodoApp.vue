<template>
    <div>
        <todo-creator @create-todo="createTodo"/>
        <todo-item/>
    </div>
</template>
<script>
import lowdb from 'lowdb'
import LocalStrage from 'lowdb/adapters/LocalStorage'
import cryptoRandomString from 'crypto-random-string'

import TodoCreator from './TodoCreator'
import TodoItem from './TodoItem'

export default {
    components: {
        TodoCreator,
        TodoItem
    },
    methods: {
        initDB () {
            const adapter = new LocalStrage('todo-app') //  DB
            this.db = lowdb(adapter)
            console.log(this.db)
            //  로컬 DB초기화
            this.db.defaults({
                todos: []   //  넣을 것 : Collection
            }).write()
        },
        createTodo (title) {
            const newTodo = {
                //  랜덤 문자열 생성(10개 문자 생성)
                id: cryptoRandomString({length: 10}),
                titile,
                createAt: new Date(),
                updatedAt: new Date(),
                done: false
            }
            this.db
                .get('todos')   //  lodsh
                .push(newTodo)  //  lodsh
                .write()        //  lodsh
        }
    },
    data () {
        return{
            db: null
        }
    },
    created () {
        this.initDB()
    }
}
</script>