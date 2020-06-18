import { Action } from 'redux'
import { setTask } from '../reducers/task.reducer'
import { RootState } from './store'
import { ThunkAction } from 'redux-thunk'
import { TaskType } from '../../components/TaskForm/Task.model'

export const thunkSendMessage = (
  task: TaskType
): ThunkAction<void, RootState, unknown, Action<string>> => async dispatch => {
  const asyncResp = await exampleAPI()
  dispatch(
    setTask( task, )
  )
}

function exampleAPI() {
  return Promise.resolve('Async Chat Bot')
}