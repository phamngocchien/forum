import PostAPI from "apis/post";
import { Dispatch } from "redux";
import IPost from "types/post";

import {
  ActionTypes,
  PENDING,
  GET_POST,
  GET_POST_BY_ID,
  CREATE_POST,
  GET_POST_BY_ADMIN,
  GET_POST_BY_USER_ID,
  GET_POST_BY_STUDENT_QUESTION,
  GET_POST_BY_STUDENT_SHARE,
  GET_POST_BY_TRENDING,
  GET_POST_BY_NEWEST,
  GET_POST_BY_STUDENT_QUESTION_NOW,
  FIND_POST,
  DELETE_POST,
  FIND_POST_APPROVAL,
  EDIT_POST,
  GET_POST_BOOKMARK,
  GET_POST_BY_TAG_ID,
  GET_POST_BY_JOB,
  HANDLE_VOTE,
  HANDLE_VIEW,
  GET_POST_BY_TAGS,
  GET_POST_BY_TITLE,
  GET_ANALYZE_POST,
  GET_ANALYZE_POST_PER_MONTH,
  REJECTED,
  HANDLE_IS_FINISH,
  HANDLE_POST_APPROVAL
} from "./contant";

export const getPosts = () => async (dispatch: Dispatch<ActionTypes>) => {
  dispatch({ type: PENDING });
  try {
    const { data: posts } = await PostAPI.getAllPost();
    dispatch({ type: GET_POST, payload: posts });
  } catch (error) {
    dispatch({ type: REJECTED });
  }
};
export const getAnalyzePost = () => async (dispatch: Dispatch<ActionTypes>) => {
  dispatch({ type: PENDING });
  try {
    const { data: posts } = await PostAPI.analyzePost();
    dispatch({ type: GET_ANALYZE_POST, payload: posts });
  } catch (error) {
    dispatch({ type: REJECTED });
  }
};

export const getAnalyzePostPerMonth =
  (item: {}) => async (dispatch: Dispatch<ActionTypes>) => {
    dispatch({ type: PENDING });
    try {
      const { data: posts } = await PostAPI.analyzePostPerMonth(item);
      console.log("action", posts);

      dispatch({ type: GET_ANALYZE_POST_PER_MONTH, payload: posts });
    } catch (error) {
      dispatch({ type: REJECTED });
    }
  };

export const getPostByAdmin = () => async (dispatch: Dispatch<ActionTypes>) => {
  dispatch({ type: PENDING });
  try {
    const { data: posts } = await PostAPI.getPostByAdmin();
    dispatch({ type: GET_POST_BY_ADMIN, payload: posts });
  } catch (error) {
    dispatch({ type: REJECTED });
  }
};
export const getPostByUserId =
  (idUser: string) => async (dispatch: Dispatch<ActionTypes>) => {
    dispatch({ type: PENDING });
    try {
      const { data: posts } = await PostAPI.getPostByUserId(idUser);
      dispatch({ type: GET_POST_BY_USER_ID, payload: posts });
    } catch (error) {
      dispatch({ type: REJECTED });
    }
  };

export const getPostByTitle =
  (item: {}) => async (dispatch: Dispatch<ActionTypes>) => {
    dispatch({ type: PENDING });
    try {
      const { data: id } = await PostAPI.getPostByTitle(item);
      dispatch({ type: GET_POST_BY_TITLE, payload: id });
    } catch (error) {
      dispatch({ type: REJECTED });
    }
  };

export const getPostByJob = () => async (dispatch: Dispatch<ActionTypes>) => {
  dispatch({ type: PENDING });
  try {
    const { data: posts } = await PostAPI.getPostByJob();
    dispatch({ type: GET_POST_BY_JOB, payload: posts });
  } catch (error) {
    dispatch({ type: REJECTED });
  }
};

export const getPostByStudentQuestion =
  () => async (dispatch: Dispatch<ActionTypes>) => {
    dispatch({ type: PENDING });
    try {
      const { data: posts } = await PostAPI.getPostByStudentQuestion();
      dispatch({ type: GET_POST_BY_STUDENT_QUESTION, payload: posts });
    } catch (error) {
      dispatch({ type: REJECTED });
    }
  };
export const getPostByStudentShare =
  () => async (dispatch: Dispatch<ActionTypes>) => {
    dispatch({ type: PENDING });
    try {
      const { data: posts } = await PostAPI.getPostByStudentShare();
      dispatch({ type: GET_POST_BY_STUDENT_SHARE, payload: posts });
    } catch (error) {
      dispatch({ type: REJECTED });
    }
  };
export const getPostByStudentQuestionNow =
  () => async (dispatch: Dispatch<ActionTypes>) => {
    dispatch({ type: PENDING });
    try {
      const { data: posts } = await PostAPI.getPostByQuestionNewest();
      dispatch({ type: GET_POST_BY_STUDENT_QUESTION_NOW, payload: posts });
    } catch (error) {
      dispatch({ type: REJECTED });
    }
  };
export const getPostByTrending =
  () => async (dispatch: Dispatch<ActionTypes>) => {
    dispatch({ type: PENDING });
    try {
      const { data: posts } = await PostAPI.getPostByTrending();
      dispatch({ type: GET_POST_BY_TRENDING, payload: posts });
    } catch (error) {
      dispatch({ type: REJECTED });
    }
  };
export const getPostByNewest =
  () => async (dispatch: Dispatch<ActionTypes>) => {
    dispatch({ type: PENDING });
    try {
      const { data: posts } = await PostAPI.getPostByNewest();
      dispatch({ type: GET_POST_BY_NEWEST, payload: posts });
    } catch (error) {
      dispatch({ type: REJECTED });
    }
  };
export const getPostDetail =
  (id: string) => async (dispatch: Dispatch<ActionTypes>) => {
    dispatch({ type: PENDING });
    try {
      const { data: post } = await PostAPI.getPostById(id);
      dispatch({ type: GET_POST_BY_ID, payload: post });
    } catch (error) {
      dispatch({ type: REJECTED });
    }
  };
export const getPostByTagId =
  (item: {}) => async (dispatch: Dispatch<ActionTypes>) => {
    dispatch({ type: PENDING });
    try {
      const response = await PostAPI.getPostByTagId(item);
      dispatch({ type: GET_POST_BY_TAG_ID, payload: response.data });
    } catch (error) {
      dispatch({ type: REJECTED });
    }
  };

export const getPostByTags =
  (id: string) => async (dispatch: Dispatch<ActionTypes>) => {
    dispatch({ type: PENDING });
    try {
      const response = await PostAPI.getPostByTags(id);
      dispatch({ type: GET_POST_BY_TAGS, payload: response.data });
    } catch (error) {
      dispatch({ type: REJECTED });
    }
  };
export const getPostBookmark =
  (idUser: string) => async (dispatch: Dispatch<ActionTypes>) => {
    dispatch({ type: PENDING });
    try {
      const response = await PostAPI.getPostBookmark(idUser);
      dispatch({ type: GET_POST_BOOKMARK, payload: response.data });
    } catch (error) {
      dispatch({ type: REJECTED });
    }
  };
export const addPost =
  (item: IPost) => async (dispatch: Dispatch<ActionTypes>) => {
    dispatch({ type: PENDING });
    try {
      const response = await PostAPI.addPost(item);
      dispatch({ type: CREATE_POST, payload: response.data });
    } catch (error) {
      dispatch({ type: REJECTED });
    }
  };
export const findPost =
  (item: any) => async (dispatch: Dispatch<ActionTypes>) => {
    dispatch({ type: PENDING });
    try {
      const response = await PostAPI.findPost(item);
      dispatch({ type: FIND_POST, payload: response.data });
    } catch (error) {
      dispatch({ type: REJECTED });
    }
  };

export const findPostApproval =
  (item: any) => async (dispatch: Dispatch<ActionTypes>) => {
    dispatch({ type: PENDING });
    try {
      const response = await PostAPI.findPost(item);
      dispatch({ type: FIND_POST_APPROVAL, payload: response.data });
    } catch (error) {
      dispatch({ type: REJECTED });
    }
  };

export const deletePost =
  (id: string) => async (dispatch: Dispatch<ActionTypes>) => {
    dispatch({ type: PENDING });
    try {
      await PostAPI.remove(id);
      dispatch({ type: DELETE_POST, payload: id });
    } catch (error) {
      dispatch({ type: REJECTED });
    }
  };

export const editPost =
  (id: string, item: IPost) => async (dispatch: Dispatch<ActionTypes>) => {
    dispatch({ type: PENDING });
    try {
      await PostAPI.editPost(id, item);
      dispatch({ type: EDIT_POST, payload: id });
    } catch (error) {
      dispatch({ type: REJECTED });
    }
  };
export const handleApproval =
  (id: string) => async (dispatch: Dispatch<ActionTypes>) => {
    dispatch({ type: HANDLE_POST_APPROVAL, payload: id });
  };
export const handlePostVote =
  (id: string, item: {}) => async (dispatch: Dispatch<ActionTypes>) => {
    dispatch({ type: PENDING });
    try {
      const response = await PostAPI.handlePostVote(id, item);
      dispatch({ type: HANDLE_VOTE, payload: response.data });
    } catch (error) {
      dispatch({ type: REJECTED });
    }
  };
export const handleView =
  (id: string, item: {}) => async (dispatch: Dispatch<ActionTypes>) => {
    const response = await PostAPI.handleView(id, item);
    dispatch({ type: HANDLE_VIEW, payload: response.data });
  };

export const handleIsFinish =
  (id: string, item: {}) => async (dispatch: Dispatch<ActionTypes>) => {
    dispatch({ type: PENDING });
    try {
      const response = await PostAPI.handleIsFinish(id, item);
      dispatch({ type: HANDLE_IS_FINISH, payload: item });
    } catch (error) {
      dispatch({ type: REJECTED });
    }
  };
