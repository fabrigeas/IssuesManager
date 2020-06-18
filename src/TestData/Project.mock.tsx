import { ProjectType } from "../components/Project/project.model";

export default {
  id: "5ee1909f77c020302cab0fe1",
  _id: "5ee1909f77c020302cab0fe1",
  dueDate: "",
  priority: "Low",
  tasks: [],
  people: [],
  name: "Test",
  description: "asdasdas",
  taskPriorities: [
    {
      name: "Low",
      color: "#2196f3",
      order: 0,
    },
    {
      name: "High",
      color: "#f44336",
      order: 1,
    },
    {
      name: "High",
      color: "",
      order: 2,
    },
  ],
  rows: [
    {
      name: "Todo",
      color: "RED",
      order: 0,
    },
    {
      name: "Completed",
      color: "Green",
      order: 1,
    },
  ],
  owner: "5ebc169bb05a2c11188de73a",
} as ProjectType