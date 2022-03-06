import React, { useEffect } from 'react'
import ReactDOM from 'react-dom'

import {
  titleChanged,
  taskDeleted,
  completeTask,
  loadTasks,
  getTasks,
  getTasksLoadingStatus,
  getError,
  createTask,
} from './store/task'
import configureStore from './store/store'
import { Provider, useSelector, useDispatch } from 'react-redux'

const store = configureStore()

const App = (params) => {
  const state = useSelector(getTasks())
  const isLoading = useSelector(getTasksLoadingStatus())
  const error = useSelector(getError())

  const dispatch = useDispatch()
  console.log(state)
  useEffect(() => {
    dispatch(loadTasks())
  }, [])

  const deleteTask = (taskId) => {
    dispatch(taskDeleted(taskId))
  }
  const changeTitle = (taskId) => {
    dispatch(titleChanged(taskId))
  }

  if (error) {
    return <p>{error}</p>
  }

  if (isLoading) {
    return <h1>Loading...</h1>
  }

  return (
    <>
      <h1>App</h1>
      <br />
      <button onClick={() => dispatch(createTask())}>Create Task</button>

      <ul>
        {state.map((el) => (
          <li key={el.id}>
            <p>{el.title}</p>
            <p>{`Completed: ${el.completed}`}</p>
            <button onClick={() => dispatch(completeTask(el.userId))}>
              Completed
            </button>
            <br />
            <br />
            <button onClick={() => changeTitle(el.id)}>Change title</button>
            <br />
            <br />
            <button onClick={() => deleteTask(el.id)}>Delete</button>
            <hr />
          </li>
        ))}
      </ul>
    </>
  )
}

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
)
