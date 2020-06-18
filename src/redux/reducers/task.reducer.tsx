import { TaskType } from "../../components/TaskForm/Task.model";

export interface TaskAction {
  type: string;
  task: TaskType;
}

export interface TaskState {
  task: TaskType | null;
}

export const SET_TASK = "SET_TASK";
export const CLEAR_TASK = "CLEAR_TASK";

interface SetTaskAction {
  type: typeof SET_TASK;
  task: TaskType;
}

interface ClearTaskAction {
  type: typeof CLEAR_TASK;
  task: null;
}

export type TaskActionTypes = SetTaskAction | ClearTaskAction;

export function setTask(task: TaskType): TaskActionTypes {
  return {
    type: SET_TASK,
    task,
  };
}

export function clearTask(): TaskActionTypes {
  return {
    type: CLEAR_TASK,
    task: null,
  };
}

const initialState: TaskState = {
  task: null,
};

export function taskReducer(
  state = initialState,
  action: TaskActionTypes
): TaskState {
  switch (action.type) {
    case SET_TASK:
      return { task: action.task };
    case CLEAR_TASK:
      return { task: null };
    default:
      return state;
  }
}
