import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';
import { Provider } from 'react-redux';
import { legacy_createStore as createStore } from 'redux';


const initState=[
  {
    id:1,
    text:'Task 1',
    completed:false
  },
  {
    id:2,
    text:'Task 2',
    completed:false
  },
  {
    id:3,
    text:'Task 3',
    completed:true
  }
]

const todos=(state=initState,action)=>{
  switch(action.type){

    case 'ADD_TODO':
      return[
        ...state,
        {
          id:action.id,
          text:action.text,
          completed:false

        }

      ]
      case 'TOGGLE_TODO':
        return state.map(todo=>{
          if(todo.id!==action.id){
            return todo
          }
          return{
            ...todo,
            completed:!todo.completed
          }
        })
        default:
          return state
  }
}
const visibilityFilter=(state='SHOW_ALL',action)=>{
switch (action.type){
  case 'SET_VISIBILITY_FILTER':
return action.filter
default:
  return state

}

}

const todoApp = (state = {}, action) => {
  return {
    todos: todos(state.todos, action),
    visibilityFilter: visibilityFilter(state.visibilityFilter, action)
  }
}
console.log(todoApp);
const store=createStore(todoApp)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
<Provider store={store}>

  <App />
</Provider>
 
);

