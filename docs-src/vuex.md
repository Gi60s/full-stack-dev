---
title: Vuex
toc: 1
---

# Introduction

> What is Vuex?
>
> Vuex is a state management pattern + library for Vue.js applications. It serves as a centralized store for all the components in an application, with rules ensuring that the state can only be mutated in a predictable fashion. It also integrates with Vue's official devtools extension to provide advanced features such as zero-config time-travel debugging and state snapshot export / import.
>
> https://vuex.vuejs.org/en/intro.html

## Visual Explanation

Check out the introductory video at https://vuex.vuejs.org/

- We have seen how you can pass data to components through their properties.

- Components can emit events to the parent so that the parent knows of update changes.

- In an app with deeply nested components it can be difficult to ensure that all of the relevant components get all of the data.

- Vuex gives us a predictable, stable, trackable, global state.

## About State Management Engines

With Vuex state management:

- You can have 3 way data binding between the UI, the front-end data store, and the back end web service.

- You greatly simplify data management on the front-end data store.

- You have better debugging (including time travel debugging)

- Code is cleaner and decoupled.

# How to Implement Vuex

https://vuex.vuejs.org/guide/

1. You need a JavaScript file that creates a new Vuex instance.

    ```js
    import Vue from 'vue'
    import Vuex from 'vuex'
    
    // add Vuex as plugin to Vue    
    Vue.use(Vuex)
    
    // create the Vuex store
    export default new Vuex.Store({
 
      // this is the global application state object that can be read
      // anywhere but should only be updated through mutations
      state: {
     
      },
   
      // this allows you to create computed values based on state values
      getters: {
        
      },
   
      // this allows you to define synchronous state change event handlers
      // that will actually mutate the internal state
      mutations: {
    
      },
   
      // this allows you to define action event handlers that perform one
      // or more mutations (synchronously or asynchronously) but that
      // don't directory mutate internal state
      actions: {
    
      }
    })
    ```
    
2. You need to import to store into the main application component and it will make sure that all of its children have access to the store through `this.$store`.

    ```js
    import Vue from 'vue'
    import App from './App.vue'
    import router from './router'
    import store from './store'
    
    new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('#app')
    ```

# Vuex Examples

## A Vuex Store

- By having a `loading` state and a `loadingMessage` state we can show the loading spinner and update the loading message while keeping the spinner up.

- The `markDone` mutation takes an object as a parameter. We're using destructuring to extract the properties from the object.

- The first parameter of an action is the store itself, so in the `save` action we destructure that first parameter as an example of some of what it contains.

- We don't actually have a `saveToDatabase` function yet. This is just pseudo code for now.

```js
import Vue from 'vue'
import Vuex from 'vuex'
    
Vue.use(Vuex)

export default new Vuex.Store({

  state: {
    loading: false,
    loadingMessage: '',
    todoItems: [
      { id: 1, text: 'Todo 1', done: false },
      { id: 2, text: 'Todo 2', done: true },
    ]
  },

  getters: {
    doneTodoItems (state) {
      return state.todoItems.filter(todo => todo.done)
    }
  },

  mutations: {
    markDone (state, { id, done }) {
      const index = state.todoItems.findIndex(todo => todo.id === id)
      if (index !== -1) state.todoItems[index].done = done
    },
    setLoading (state, loading) {
      state.loading = loading
    },
    setLoadingMessage (state, message) {
      state.loadingMessage = message
    }
  },

  actions: {
    save ({ commit, dispatch, getters, state }, message) {
      commit('setLoading', true)
      commit('setLoadingMessage', message)
      saveToDatabase(state.todoItems)   // pseudo code
      commit('setLoading', false)
    }
  }
})
```

## A View that Uses the Vuex Store

- We are using a `todo-item` component that we'll see in the next example

- We pass an identifier to the `todo-item` so that it can manage it's own internal data and relationship to the Vuex store.

- In this example we don't have a `data` property (not that you couldn't have it) because we're able to use getters and methods to do everything we need with the Vuex store.

```html
<template>
  <div>
    <todo-item v-for="task in todoList" :task-id="task.id"></todo-item>
    <button @click="save()">Save</button>
  </div>
</template>

<script>
import TodoItem from '@/components/TodoItem'

export default {
  name: 'todo-list',
  components: {
    TodoItem
  },
  computed: {
    todoList () {
      return this.$store.state.todoItems
    }
  },
  methods: {
    save () {
      this.$store.commit('save')
    }
  }
}
</script>
```

## A Vue Component that Uses the Vuex Store

- We have three getters:

    - `task` gets the task from the Vuex store that relates to this item. Computed properties only recompute when the underlying data changes, so although this getter is costly to run the first time, subsequent gets are immediate.
    
    - `done` get the current done state for the task
    
    - `text` gets the current todo item's text value
    
- We have one setter, `done`. This is tied to the `v-model` on the checkbox and will commit the the Vuex store when its state changes.

```html
<template>
  <div>
    <label>
      <input type="checkbox" name="checkbox" :value="taskId" v-model="done">
      {{ text }}
    </label>
  </div>
</template>

<script>
export default {
  name: 'todo-item',
  props: ['taskId'],
  computed: {
    done: {
      set (isDone) {
        this.$store.commit('markDone', {
          id: this.taskId,
          done: isDone
        })
      },
      get () {
        return this.task.done
      }
    },
    task () {
      return this.$store.state.todoItems.find(task => task.id === this.taskId)
    },
    text () {
      return this.task.text
    }
  }
}
</script>
```

# Exercise

1. Get the latest version of the `ContactsKeeper` app from https://github.com/Gi60s/it410-2019-in-class-app

2. We need some user state that tells us who the authenticated user is:

    - Create user state object that will be null when there is no user or will be a plain object with `username`, `name`, `email`, and `phone` properties when there is a user.
    
    - Create a mutation to set (or unset) the current user.
    
    - Create an action to perform a login request that on success will call the mutation to set the current user. For now this won't actually hit an API.
    
3. Update which links are visible based on authenticated state.

4. Enable updates of profile information.
