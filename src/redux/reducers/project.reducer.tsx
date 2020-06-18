import { ProjectType } from "../../components/Project/project.model";


export interface ProjectAction {
  type: string;
  project: ProjectType;
}

export interface ProjectState {
  project: ProjectType | undefined;
}

export const SET_PROJECT = "SET_PROJECT";
export const CLEAR_PROJECT = "CLEAR_PROJECT";

interface SetProjectAction {
  type: typeof SET_PROJECT;
  project: ProjectType;
}

interface ClearProjectAction {
  type: typeof CLEAR_PROJECT;
  project: null;
}

export type ProjectActionTypes = SetProjectAction | ClearProjectAction;

export function setProject(project: ProjectType): ProjectActionTypes {
  return {
    type: SET_PROJECT,
    project,
  };
}

export function clearProject(): ProjectActionTypes {
  return {
    type: CLEAR_PROJECT,
    project: null,
  };
}

const initialState: ProjectState = {
  project: undefined,
};

export function projectReducer(
  state = initialState,
  action: ProjectActionTypes
): ProjectState {
  switch (action.type) {
    case SET_PROJECT:
      return { project: action.project };
    case CLEAR_PROJECT:
      return { project: undefined };
    default:
      return state;
  }
}
