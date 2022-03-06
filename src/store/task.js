import { createSlice } from '@reduxjs/toolkit'
import todosService from '../services/todos.service'
import { setError } from './errors'

const initialState = { entities: [], isLoading: true }

const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    recived(state, action) {
      state.entities = action.payload
      state.isLoading = false
    },
    update(state, action) {
      const elIndex = state.entities.findIndex(
        (el) => el.id === action.payload.id,
      )
      state.entities[elIndex] = {
        ...state.entities[elIndex],
        ...action.payload,
      }
    },
    remove(state, action) {
      state.entities = state.entities.filter(
        (el) => el.id !== action.payload.id,
      )
    },
    taskRequested(state) {
      state.isLoading = true
    },
    taskRequestFailed(state, action) {
      state.isLoading = false
    },
    newTask(state, action) {
      state.entities[state.entities.length] = {
        ...action.payload,
      }
    },
  },
})

const { actions, reducer: taskReducer } = taskSlice
const {
  update,
  remove,
  recived,
  taskRequested,
  taskRequestFailed,
  newTask,
} = actions

export const loadTasks = () => async (dispatch) => {
  dispatch(taskRequested())
  try {
    const data = await todosService.fetch()
    console.log('datta', data)
    dispatch(recived(data))
  } catch (error) {
    dispatch(taskRequestFailed(error.message))
    dispatch(setError(error.message))
  }
}
export const createTask = () => async (dispatch) => {
  try {
    const dataResponse = await todosService.add()
    console.log('data', dataResponse)
    dispatch(newTask(dataResponse))
  } catch (error) {
    dispatch(setError(error.message))
  }
}

export const completeTask = (id) => (getState, dispatch) => {
  console.log('idCompleted', id)
  return dispatch(update({ id, completed: true }))
}

export function titleChanged(id) {
  return update({ id, title: `New title for ${id}` })
}

export function taskDeleted(id) {
  return remove({ id })
}

export const getTasks = () => (state) => state.tasks.entities

export const getTasksLoadingStatus = () => (state) => state.tasks.isLoading

export const getError = () => (state) => state.errors.entities[0]

export default taskReducer
