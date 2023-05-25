<script>
    export default {
        data() {
            return {
                obj: {
                    nested: {
                        count: 0
                    },
                    arr: [
                        'foo'
                    ]
                }
            }
        },
        methods: {
            mutedDeeply() {
                // This will work as expected
                this.obj.nested.count++;
                this.obj.arr.push('baz')
            }
        }
    }
</script>