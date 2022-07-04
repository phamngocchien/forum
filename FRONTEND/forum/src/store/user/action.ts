import NotiAPI from "apis/notification";
import UserAPI from "apis/user";
import { Dispatch } from "redux";
import IUser from "types/user";
import {
  ActionTypes,
  GET_USER,
  REJECTED,
  PENDING,
  GET_USER_BY_ID,
  LOGIN,
  SEARCH_USER,
  EDIT_USER,
  CREATE_USER,
  DELETE_USER,
  CREATE_LIST_USER,
  REJECTED_ADD_LIST,
  EDIT_A_USER,
  LOG_OUT,
  HANDLE_MARK,
  GET_USER_LOGIN,
  HANDLE_FOLLOW,
  GET_USER_FOLLOW,
  GET_NOTIFICATION,
  PUSH_NOTIFICATION,
  HANDLE_NOTIFICATION,
  GET_QUATITY_USER
} from "./contant";

export const getUsers = () => async (dispatch: Dispatch<ActionTypes>) => {
  dispatch({ type: PENDING });
  try {
    const response = await UserAPI.getAllUser();
    dispatch({ type: GET_USER, payload: response.data });
  } catch (error) {
    dispatch({ type: REJECTED });
  }
};
export const getQuantityOfUser =
  () => async (dispatch: Dispatch<ActionTypes>) => {
    dispatch({ type: PENDING });
    try {
      const response = await UserAPI.getQuantityOfUser();
      dispatch({ type: GET_QUATITY_USER, payload: response.data });
    } catch (error) {
      dispatch({ type: REJECTED });
    }
  };
export const getUserDetail =
  (id: string) => async (dispatch: Dispatch<ActionTypes>) => {
    dispatch({ type: PENDING });
    try {
      const response = await UserAPI.getUserById(id);
      dispatch({ type: GET_USER_BY_ID, payload: response.data });
    } catch (error) {
      dispatch({ type: REJECTED });
    }
  };
export const getUserLogin =
  (id: string) => async (dispatch: Dispatch<ActionTypes>) => {
    dispatch({ type: PENDING });
    try {
      const response = await UserAPI.getUserById(id);
      dispatch({ type: GET_USER_LOGIN, payload: response.data });
    } catch (error) {
      dispatch({ type: REJECTED });
    }
  };
export const getUserId =
  (id: string) => async (dispatch: Dispatch<ActionTypes>) => {
    dispatch({ type: PENDING });
    try {
      const { data: user } = await UserAPI.getUserById(id);
      dispatch({ type: GET_USER_BY_ID, payload: user });
    } catch (error) {
      dispatch({ type: REJECTED });
    }
  };

export const getUserFollow =
  (id: string) => async (dispatch: Dispatch<ActionTypes>) => {
    dispatch({ type: PENDING });
    try {
      const { data: user } = await UserAPI.getUserFollow(id);
      dispatch({ type: GET_USER_FOLLOW, payload: user });
    } catch (error) {
      dispatch({ type: REJECTED });
    }
  };

export const searchUser =
  (key: {}) => async (dispatch: Dispatch<ActionTypes>) => {
    dispatch({ type: PENDING });
    try {
      const { data: user } = await UserAPI.searchUser(key);
      dispatch({ type: SEARCH_USER, payload: user });
    } catch (error) {
      dispatch({ type: REJECTED });
    }
  };

export const editUser =
  (id: string, item: IUser) => async (dispatch: Dispatch<ActionTypes>) => {
    dispatch({ type: PENDING });
    try {
      const response = await UserAPI.editUser(id, item);
      dispatch({ type: EDIT_USER, payload: response.data });
    } catch (error) {
      dispatch({ type: REJECTED });
    }
  };

export const editAUser =
  (id: string, item: IUser) => async (dispatch: Dispatch<ActionTypes>) => {
    dispatch({ type: PENDING });
    try {
      const response = await UserAPI.editUser(id, item);
      dispatch({ type: EDIT_A_USER, payload: response.data });
    } catch (error) {
      dispatch({ type: REJECTED });
    }
  };

export const handleMarkPost =
  (id: string, item: any) => async (dispatch: Dispatch<ActionTypes>) => {
    dispatch({ type: PENDING });
    try {
      const response = await UserAPI.handleMark(id, item);
      dispatch({ type: HANDLE_MARK, payload: response.data });
    } catch (error) {
      dispatch({ type: REJECTED });
    }
  };

export const handleFollow =
  (id: string, item: any) => async (dispatch: Dispatch<ActionTypes>) => {
    dispatch({ type: PENDING });
    try {
      const response = await UserAPI.handleFollow(id, item);
      dispatch({ type: HANDLE_FOLLOW, payload: response.data });
    } catch (error) {
      dispatch({ type: REJECTED });
    }
  };

export const addUser =
  (item: IUser) => async (dispatch: Dispatch<ActionTypes>) => {
    dispatch({ type: PENDING });
    try {
      const response = await UserAPI.addUser(item);
      dispatch({ type: CREATE_USER, payload: response.data });
    } catch (error) {
      dispatch({ type: REJECTED, payload: Object(error)?.response?.data });
    }
  };

export const addListUser =
  (item: any) => async (dispatch: Dispatch<ActionTypes>) => {
    dispatch({ type: PENDING });
    try {
      const response = await UserAPI.addListUser(item);
      dispatch({ type: CREATE_LIST_USER, payload: response.data });
    } catch (error) {
      dispatch({
        type: REJECTED_ADD_LIST,
        payload: Object(error)?.response?.data
      });
    }
  };

export const login = (user: []) => async (dispatch: Dispatch<ActionTypes>) => {
  dispatch({ type: PENDING });
  try {
    const { data } = await UserAPI.login(user);
    localStorage.setItem("accessToken", JSON.stringify(data.accessToken));
    localStorage.setItem("userLogin", JSON.stringify({ _id: data.user._id }));
    dispatch({ type: LOGIN, payload: data.user });
  } catch (errors) {
    dispatch({ type: REJECTED, payload: Object(errors)?.response?.data });
  }
};
export const logOut = () => async (dispatch: Dispatch<ActionTypes>) => {
  dispatch({ type: PENDING });
  try {
    localStorage.removeItem(`accessToken`);
    localStorage.removeItem(`userLogin`);
    dispatch({ type: LOG_OUT });
  } catch (errors) {
    dispatch({ type: REJECTED });
  }
};
export const deleteUser =
  (id: string) => async (dispatch: Dispatch<ActionTypes>) => {
    dispatch({ type: PENDING });
    try {
      await UserAPI.deleteUser(id);
      dispatch({ type: DELETE_USER, payload: id });
    } catch (error) {
      dispatch({ type: REJECTED });
    }
  };

export const getNotification =
  (id: string) => async (dispatch: Dispatch<ActionTypes>) => {
    dispatch({ type: PENDING });
    try {
      const response = await NotiAPI.getNotificationByUser(id);
      dispatch({ type: GET_NOTIFICATION, payload: response.data });
    } catch (error) {
      dispatch({ type: REJECTED });
    }
  };

export const pushNotification =
  (item: {}) => async (dispatch: Dispatch<ActionTypes>) => {
    dispatch({ type: PUSH_NOTIFICATION, payload: item });
  };

export const handleNotification =
  (idUser: string, item: {}) => async (dispatch: Dispatch<ActionTypes>) => {
    dispatch({ type: PENDING });
    try {
      const response = await NotiAPI.handleNotify(idUser, item);
      dispatch({ type: HANDLE_NOTIFICATION, payload: response.data });
    } catch (error) {
      dispatch({ type: REJECTED });
    }
  };
