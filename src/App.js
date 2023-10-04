import { useSelector, useDispatch } from 'react-redux'

let todoId = 0

const getVisibleTodos = (todos, filter) => {
  switch (filter) {
    case 'SHOW_ALL':
      return todos

    case 'COMPLETED':
      return todos.filter(todo => todo.completed)
    case 'PENDING':
      return todos.filter(todo => !todo.completed)
    default:
      break;
  }
}

export default function App() {

  const todos = useSelector((state) => state.todos)
  const filter = useSelector((state) => state.visibilityFilter)

  const dispatch = useDispatch()

  const handleKeyDown = (event) => {
    if ('Enter' === event.code) {
      const { target } = event
      dispatch({
        type: 'ADD_TODO',
        id: todoId++,
        text: target.value
      })

      target.value = ''

    }
  }

  const handleSetVisibility = (filter) => {
    dispatch({
      type: 'SET_VISIBILITY_FILTER',
      filter
    })
  }

  const todosCm = todos ? getVisibleTodos(todos, filter).map(todo => (
    <li
      key={todo.id}
      onClick={() => dispatch({
        type: 'TOGGLE_TODO',
        id: todo.id
      })}
      style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
      {todo.text}
    </li>
  )) : null

  return (
    <div>
      <input onKeyDown={handleKeyDown} type="text" />
      <ul>
        {todosCm}
      </ul>
      <div>
        <button onClick={() => handleSetVisibility('SHOW_ALL')}>all</button>
        <button onClick={() => handleSetVisibility('COMPLETED')}>completed</button>
        <button onClick={() => handleSetVisibility('PENDING')}>pending</button>
      </div>
    </div>
  )
}
