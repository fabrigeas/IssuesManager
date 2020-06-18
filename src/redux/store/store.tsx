import { createStore, combineReducers } from "redux";
import { projectReducer } from "../reducers/project.reducer";
import { taskReducer } from "../reducers/task.reducer";
import { userReducer } from "../reducers/user.reducer";

export const rootReducer = 
    combineReducers({
      project: projectReducer,
      task: taskReducer,
      user: userReducer,
    })
    // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() //To use redux devtools

export default createStore(rootReducer);

export type RootState = ReturnType<typeof rootReducer>;
