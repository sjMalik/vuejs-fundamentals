<template>
    <p>
        Ask a question?
        <input v-model="question" />
    </p>
    <p>{{ answer }}</p>
</template>

<script>
    export default {
        data() {
            return {
                question: '',
                answer: ''
            }
        },
        watch: {
            question (newQuestion, oldQuestion){
                if(newQuestion.includes('?') !== -1){
                    this.getAnswer()
                }
            }
        },
        methods: {
            async getAnswer(){
                // HTTP requests
            }
        }
    }
</script>