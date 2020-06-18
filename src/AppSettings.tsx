import { Item } from "./Types";


export interface settingsType {
  priorities: Array <Item>;
  statusses: Array <Item>;
  defaultTaskStatus: Item,
  defaultTaskPriority: Item,
}

export default {
  priorities: [
    {name: "Low", order: 0, color: "green"},
    {name: "Normal", order: 1, color: "Blue"},
    {name: "High", order: 2, color: "orange"},
    {name: "Critical", order: 3, color: "red"},
  ],
  statusses: [
    {name: "Todo", color: "blue", order: 0}
  ],
  defaultTaskStatus: {
    color: "blue",
    name: "Todo",
    order: 0
  },
  defaultTaskPriority: {
    name: "Low",
    color: "green",
    order: 0
  },
} as settingsType