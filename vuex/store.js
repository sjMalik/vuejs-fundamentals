import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

// Vuex uses single state tree i.e. the single object contains all of your application level state
//and serve as single source of truth. It allows us to easily take snapshots of the current state
const state = {
    todos: [
        {id: 1, text: '...', done: true},
        {id: 2, text: '...', done: false}
    ]
};

// Sometimes we may need compute derived state based on the stored state. If more than 
// one component needs to make use of this we have to either duplicate the function or
// extract it into shared helper and import in multiple places. But with the use of getters
// in the store we can do it easily. You can think its computed property of stores
const getters = {
    doneTodos: function(state) {
        return state.todos.filter(todo=> todo.done);
    },
    count: 1
}

// mapGetters helper simply map store getters to local computed property
/**
 * import {mapGetters} from 'vuex';
 * 
 * export default {
 *      computed: {
 *          ...mapGetters([doneTodos])
 *      }
 * }
 */

// The only way to actually change state in Vuex is commiting the mutation. Vuex mutation
// are very similar to the events

const mutations = {
    markTodoAsDone: function(state, id){
        let targetTodo = state.todos.find(state=> state.id === id);
        targetTodo.done = true;
    }
}

// You cannot directly call a mutation handler. Think of it more like event registration
// To invoke a mutation handler, you need to call store.commit with its type
/**
 * this.$store.commit('markTodoAsDone')
 */

// One important rule to remember is that mutation handler functions must be synchronous. To handle asynchronous operations, let's introduce Actions.
const actions = {
    changeTodoAsync: function({commit}) {
        setTimeout(()=> {
            commit('markTodoAsDone')
        }, 1000)
    }
}

// Actions are triggered with the store.dispatch method:
/**
 * this.$store.dispatch('changeTodoAsync')
 */

export default new Vuex.Store({
    state,
    mutations,
    getters,
    actions
})