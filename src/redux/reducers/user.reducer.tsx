import { UserType } from "../../components/User/User.model";

const SET_USER = "SET_USER";
const CLEAR_USER = "CLEAR_USER";

export interface UserAction {
  type: string;
  user: UserType;
}

export interface UserState {
  user: UserType | null;
}

interface SetUserAction {
  type: typeof SET_USER;
  user: UserType;
}

interface ClearUserAction {
  type: typeof CLEAR_USER;
  user: null;
}

export type UserActionTypes = SetUserAction | ClearUserAction;

export function setUser(user: UserType): UserActionTypes {
  return {
    type: SET_USER,
    user,
  };
}

export function clearUser(): UserActionTypes {
  return {
    type: CLEAR_USER,
    user: null,
  };
}

const initialState: UserState = {
  user: null,
};

export function userReducer(
  state = initialState,
  action: UserActionTypes
): UserState {
  switch (action.type) {
    case SET_USER:
      return { user: action.user };
    case CLEAR_USER:
      return { user: null };
    default:
      return state;
  }
}
