import { TaskType } from "./components/TaskForm/Task.model";


export interface Item {
  color: string,
  name: string,
  order: number;
  [index: string]: string |number
}
export interface Items {
  [index: string]: Row;
}


export interface Row {
  name: string;
  color: string;
  order: number;
  tasks: Array<TaskType>;
}

export interface Rows {
  [index: string]: Row;
}

