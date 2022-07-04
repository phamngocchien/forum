import IPost from "types/post";
import {
  ActionTypes,
  CREATE_POST,
  GET_POST,
  GET_POST_BY_ADMIN,
  GET_POST_BY_ID,
  GET_POST_BY_NEWEST,
  GET_POST_BY_STUDENT_QUESTION,
  GET_POST_BY_STUDENT_QUESTION_NOW,
  GET_POST_BY_STUDENT_SHARE,
  GET_POST_BY_TRENDING,
  GET_POST_BY_USER_ID,
  FIND_POST,
  PENDING,
  REJECTED,
  DELETE_POST,
  FIND_POST_APPROVAL,
  // EDIT_POST,
  GET_POST_BY_TAG_ID,
  GET_POST_BY_JOB,
  GET_POST_BOOKMARK,
  HANDLE_VOTE,
  GET_POST_BY_TAGS,
  GET_POST_BY_TITLE,
  GET_ANALYZE_POST,
  GET_ANALYZE_POST_PER_MONTH,
  HANDLE_IS_FINISH,
  HANDLE_POST_APPROVAL
} from "./contant";

interface IInitialState {
  loading: boolean;
  posts: IPost[];
  postsQuestionNow: IPost[];
  error: string;
  postDetail: any;
  postApproval: IPost[];
  postTag: IPost[];
  idPostNoti: string;
  analyzePost: [];
  analyzePostPerMonth: [];
}
const initialState: IInitialState = {
  loading: false,
  posts: [],
  postsQuestionNow: [],
  error: "",
  postDetail: [],
  postApproval: [],
  postTag: [],
  idPostNoti: "",
  analyzePost: [],
  analyzePostPerMonth: []
};

const PostsReducer = (state = initialState, action: ActionTypes) => {
  switch (action.type) {
    case PENDING:
      return { ...state, loading: true };
    case GET_POST:
      return { ...state, posts: action.payload, loading: false };
    case GET_POST_BY_ADMIN:
      return { ...state, posts: action.payload, loading: false };
    case GET_POST_BY_TITLE:
      return { ...state, idPostNoti: action.payload, loading: false };
    case GET_POST_BOOKMARK:
      return { ...state, posts: action.payload, loading: false };
    case GET_POST_BY_JOB:
      return { ...state, posts: action.payload, loading: false };
    case GET_POST_BY_STUDENT_QUESTION:
      return { ...state, posts: action.payload, loading: false };
    case GET_POST_BY_STUDENT_SHARE:
      return { ...state, posts: action.payload, loading: false };
    case GET_POST_BY_STUDENT_QUESTION_NOW:
      return { ...state, postsQuestionNow: action.payload, loading: false };
    case GET_POST_BY_TRENDING:
      return { ...state, posts: action.payload, loading: false };
    case GET_POST_BY_NEWEST:
      return { ...state, posts: action.payload, loading: false };
    case GET_POST_BY_USER_ID:
      return { ...state, posts: action.payload, loading: false };
    case GET_POST_BY_ID:
      return { ...state, postDetail: action.payload, loading: false };
    case HANDLE_VOTE:
      return { ...state, postDetail: action.payload, loading: false };
    case GET_POST_BY_TAG_ID:
      return { ...state, postTag: action.payload, loading: false };
    case GET_POST_BY_TAGS:
      return { ...state, posts: action.payload, loading: false };
    case GET_ANALYZE_POST:
      return { ...state, analyzePost: action.payload, loading: false };
    case GET_ANALYZE_POST_PER_MONTH:
      return { ...state, analyzePostPerMonth: action.payload, loading: false };
    case FIND_POST:
      return { ...state, posts: action.payload, loading: false };
    case FIND_POST_APPROVAL:
      return { ...state, postApproval: action.payload, loading: false };
    case HANDLE_POST_APPROVAL:
      // eslint-disable-next-line no-case-declarations
      const newPostApproval = state.postApproval.filter(
        (item2) => item2._id !== action.payload
      );
      return { ...state, postApproval: newPostApproval, loading: false };
    case CREATE_POST:
      return {
        ...state,
        posts: [...state.posts, action.payload],
        loading: false
      };
    case DELETE_POST: {
      const filterPosts = state.posts.filter(
        (item) => item._id !== action.payload
      );
      return { ...state, posts: filterPosts, loading: false };
    }
    // case EDIT_POST: {
    //   const filterPosts = state.postApproval.filter(
    //     (item) => item._id !== action.payload
    //   );
    //   return { ...state, postApproval: filterPosts, loading: false };
    // }
    case HANDLE_IS_FINISH: {
      const newPostDetail = [
        {
          ...state.postDetail[0],
          isFinish: action.payload.status
        }
      ];
      return { ...state, postDetail: newPostDetail, loading: false };
    }
    case REJECTED:
      return { ...state, loading: false };
    default:
      return state;
  }
};

export default PostsReducer;
