import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import DocumentTypeReducer from "./document-type/reducer";
import FilesReducer from "./file/reducer";
import MesssengerReducer from "./messenger/reducer";
import PostsReducer from "./post/reducer";
import ReplyReducer from "./reply/reducer";
import SearchReducer from "./search/reducer";
import TagsReducer from "./tag/reducer";
import UsersReducer from "./user/reducer";

const middleware = [thunk];

export const store = createStore(
  combineReducers({
    post: PostsReducer,
    user: UsersReducer,
    tag: TagsReducer,
    reply: ReplyReducer,
    search: SearchReducer,
    documenttype: DocumentTypeReducer,
    file: FilesReducer,
    messenger: MesssengerReducer
  }),
  composeWithDevTools(applyMiddleware(...middleware))
);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
