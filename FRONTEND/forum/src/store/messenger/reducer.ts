import IMessenger from "types/messenger";
import IMessengerUser from "types/messengerUser";
import {
  ActionTypes,
  CREATE_REPLY_IN_MESSAGE,
  GET_MESSAGES_BY_ID,
  GET_MESSAGES_BY_USER,
  HANDLE_LIST_MESSAGE,
  PENDING,
  REJECTED
} from "./contant";

interface IInitialState {
  loading: boolean;
  messages: IMessenger[];
  messageUsers: IMessengerUser;
}
const initialState: IInitialState = {
  loading: false,
  messages: [
    {
      _id: "",
      isGroup: false,
      participants: [
        {
          _id: "",
          name: ""
        }
      ],
      messages: {
        content: "",
        user: {
          _id: "",
          name: ""
        },
        createdAt: "",
        _id: ""
      },
      updatedAt: ""
    }
  ],
  messageUsers: {
    _id: "",
    isGroup: false,
    messages: [
      {
        content: "",
        user: {
          _id: "",
          name: ""
        },
        createdAt: "",
        _id: ""
      }
    ]
  }
};

const MesssengerReducer = (state = initialState, action: ActionTypes) => {
  switch (action.type) {
    case PENDING:
      return { ...state, loading: true };
    case GET_MESSAGES_BY_USER:
      return { ...state, messages: action.payload, loading: false };
    case GET_MESSAGES_BY_ID:
      return { ...state, messageUsers: action.payload, loading: false };
    case CREATE_REPLY_IN_MESSAGE:
      return {
        ...state,
        messageUsers: {
          ...state.messageUsers,
          messages: [...state.messageUsers.messages, action.payload]
        }
      };
    case HANDLE_LIST_MESSAGE:
      // eslint-disable-next-line no-case-declarations
      const newMessages = state.messages.map((item: any) => {
        if (item._id === action.payload.id) {
          item.messages = action.payload.item;
        }
        return item;
      });
      return {
        ...state,
        messages: newMessages,
        loading: false
      };
    case REJECTED:
      return { ...state, loading: false };
    default:
      return state;
  }
};

export default MesssengerReducer;
// {
//   _id: "21312123",
//   content: action.payload.content,
//   user: {
//     _id: action.payload._id,
//     name: "Something"
//   },
//   createdAt: action.payload.createdAt
// }
