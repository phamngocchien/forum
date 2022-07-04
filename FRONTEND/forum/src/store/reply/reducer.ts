import IReply from "types/reply";
import {
  ActionTypes,
  CREATE_REPLY,
  DELETE_REPLY,
  EDIT_REPLY,
  GET_REPLY_BY_ID_POST,
  GET_REPLY_BY_ID_USER,
  PENDING,
  REJECTED
} from "./contant";

interface IInitialState {
  loading: boolean;
  replies: IReply[];
  error: string;
}
const initialState: IInitialState = {
  loading: false,
  replies: [],
  error: ""
};

const ReplyReducer = (state = initialState, action: ActionTypes) => {
  switch (action.type) {
    case PENDING:
      return { ...state, loading: true };
    case GET_REPLY_BY_ID_POST:
      return { ...state, replies: action.payload, loading: false };
    case GET_REPLY_BY_ID_USER:
      return { ...state, replies: action.payload, loading: false };
    case CREATE_REPLY:
      return {
        ...state,
        replies: [...state.replies, action.payload],
        loading: false
      };
    case EDIT_REPLY: {
      const { payload } = action;
      const newReplies = state.replies.map((item: IReply) => {
        if (item._id === payload._id) {
          return action.payload;
        }
        return item;
      });
      return {
        ...state,
        replies: newReplies,
        loading: false
      };
    }
    case DELETE_REPLY: {
      const filterReply = state.replies.filter(
        (item: any) => item._id !== action.payload
      );
      return { ...state, replies: filterReply, loading: false };
    }
    case REJECTED:
      return { ...state, loading: false };
    default:
      return state;
  }
};

export default ReplyReducer;
