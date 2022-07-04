import IUser from "types/user";
import {
  ActionTypes,
  CREATE_USER,
  EDIT_USER,
  GET_USER,
  GET_USER_BY_ID,
  LOGIN,
  PENDING,
  REJECTED,
  SEARCH_USER,
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

interface IInitialState {
  loading: boolean;
  users: any[];
  error: "";
  userDetail: any;
  errorAddList: any;
  userLogin: any;
  userFollow: IUser[];
  notification: any[];
  quatityUser: number;
}
const initialState: IInitialState = {
  loading: false,
  users: [],
  userDetail: {
    _id: "",
    name: "",
    msv: "",
    password: "",
    role: "",
    major: "",
    email: "",
    facebook: "",
    github: "",
    createdAt: "",
    updatedAt: ""
  },
  error: "",
  errorAddList: [],
  userLogin: {},
  userFollow: [],
  notification: [],
  quatityUser: 0
};

const UsersReducer = (state = initialState, action: ActionTypes) => {
  switch (action.type) {
    case PENDING:
      return { ...state, loading: true };
    case GET_USER:
      return { ...state, users: action.payload, loading: false };
    case SEARCH_USER:
      return { ...state, users: action.payload, loading: false };
    case GET_USER_BY_ID:
      return { ...state, userDetail: action.payload, loading: false };
    case GET_USER_FOLLOW:
      return { ...state, userFollow: action.payload, loading: false };
    case GET_QUATITY_USER:
      return { ...state, quatityUser: action.payload, loading: false };
    case EDIT_A_USER:
      return { ...state, userDetail: action.payload, loading: false };
    case HANDLE_MARK:
      return { ...state, userDetail: action.payload, loading: false };
    case HANDLE_FOLLOW:
      return { ...state, userLogin: action.payload, loading: false };
    case CREATE_USER:
      return {
        ...state,
        users: [...state.users, action.payload],
        loading: false
      };
    case CREATE_LIST_USER:
      return {
        ...state,
        users: [...state.users, action.payload],
        loading: false
      };
    case EDIT_USER: {
      const { payload } = action;
      const newUsers = state.users.map((item: IUser) => {
        if (item._id === payload._id) {
          return action.payload;
        }
        return item;
      });
      return {
        ...state,
        users: newUsers,
        loading: false
      };
    }
    case DELETE_USER: {
      const filterUser = state.users.filter(
        (item: any) => item._id !== action.payload
      );
      return { ...state, users: filterUser, loading: false };
    }
    case LOGIN:
      return { ...state, userLogin: action.payload, loading: false };
    case GET_USER_LOGIN:
      return { ...state, userLogin: action.payload, loading: false };
    case LOG_OUT:
      return { ...state, loading: false };
    case REJECTED:
      return { ...state, error: action.payload, loading: false };
    case REJECTED_ADD_LIST:
      return { ...state, errorAddList: action.payload, loading: false };
    case GET_NOTIFICATION:
      return { ...state, notification: action.payload, loading: false };
    case PUSH_NOTIFICATION:
      return {
        ...state,
        notification: [...state.notification, action.payload]
      };

    case HANDLE_NOTIFICATION: {
      const { payload } = action;
      const newNotifications = state.notification.map((item: any) => {
        if (item._id === payload._id) {
          return action.payload;
        }
        return item;
      });
      return {
        ...state,
        notification: newNotifications,
        loading: false
      };
    }
    default:
      return state;
  }
};

export default UsersReducer;
