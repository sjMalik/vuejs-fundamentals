<!-- In-template expressions are very convenient, but they are meant for simple operations. 
    Putting too much logic in your templates can make them bloated and hard to maintain. -->
<!-- That's why for complex logic that includes reactive data, it is recommended to use a computed property. -->
<!-- computed properties are cached based on their reactive dependencies. A computed property will only re-evaluate when some of its reactive dependencies have changed. 
In comparison, a method invocation will always run the function whenever a re-render happens. -->
<!-- Computed properties are by default getter-only. If you attempt to assign a new value to a computed property, you will receive a runtime warning. -->

<template>
    <p>Has published books</p>
    <!-- Template Expression -->
    <span>{{ author.books.length > 0 ? "Yes" : "no" }}</span>
    <!-- Using computed property -->
    <span>{{ publishedBookMessage }}</span>
</template>

<script>
    export default {
        data(){
            return {
                author: {
                    name: 'Satyajit Roy',
                    books: [
                        'Prof Shonku',
                        'Pather Pachali'
                    ]
                }
            }
        },
        computed: {
            // a computed getters
            publishedBookMessage() {
                // this points to the component instanace
                return this.author.books.length > 0 ? 'Yes' : 'No'
            }
        }
    }
</script>