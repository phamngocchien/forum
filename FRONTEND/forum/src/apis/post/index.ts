import { axiosClient } from "apis";
import IPost from "types/post";
import IReply from "types/reply";

const PostAPI = {
  getAllPost() {
    const url: string = `/api/posts`;
    return axiosClient.get(url);
  },
  analyzePost() {
    const url: string = `/api/posts/analyze`;
    return axiosClient.get(url);
  },
  analyzePostPerMonth(item: {}) {
    const url: string = `/api/posts/analyzepostpermonth`;
    return axiosClient.post(url, item);
  },
  getPostById(id: string) {
    const url: string = `/api/posts/${id}`;
    return axiosClient.get(url);
  },
  getPostByTitle(item: {}) {
    const url: string = `/api/posts/postbytitle`;
    return axiosClient.post(url, item);
  },
  getPostByAdmin() {
    const url: string = `api/posts/postbyadmin`;
    return axiosClient.get(url);
  },
  getPostByJob() {
    const url: string = `api/posts/postbyjob`;
    return axiosClient.get(url);
  },
  getPostByUserId(idUser: string) {
    const url: string = `api/posts/postbyuser/${idUser}`;
    return axiosClient.get(url);
  },
  getPostByStudentQuestion() {
    const url: string = `/api/posts/postbystudent/question`;
    return axiosClient.get(url);
  },
  getPostByStudentShare() {
    const url: string = `/api/posts/postbystudent/share`;
    return axiosClient.get(url);
  },
  getPostByTrending() {
    const url: string = `/api/posts/postbytrending`;
    return axiosClient.get(url);
  },
  getPostByNewest() {
    const url: string = `/api/posts/postbynewest`;
    return axiosClient.get(url);
  },
  getPostByQuestionNewest() {
    const url: string = `/api/posts/postbyquestionnewest`;
    return axiosClient.get(url);
  },
  addPost(post: IPost) {
    const url: string = `/api/posts/create`;
    return axiosClient.post(url, post);
  },
  editPost(id: string, post: IPost) {
    const url: string = `/api/posts/update/${id}`;
    return axiosClient.post(url, post);
  },
  remove(id: string) {
    const url: string = `/api/posts/delete/${id}`;
    return axiosClient.delete(url);
  },
  createReply(id: string, item: IReply) {
    const url: string = `/api/posts/${id}/create/reply`;
    return axiosClient.post(url, item);
  },
  findPost(item: any) {
    const url: string = `/api/posts/find`;
    return axiosClient.post(url, item);
  },
  getPostByTagId(item: {}) {
    const url: string = `/api/posts/postbytag`;
    return axiosClient.post(url, item);
  },
  getPostByTags(id: string) {
    const url: string = `/api/posts/postbytags/${id}`;
    return axiosClient.get(url);
  },
  getPostBookmark(idUser: string) {
    const url: string = `/api/posts/bookmark/${idUser}`;
    return axiosClient.get(url);
  },
  handlePostVote(id: string, item: {}) {
    const url: string = `/api/posts/handlevotepost/${id}`;
    return axiosClient.post(url, item);
  },
  handleView(id: string, item: {}) {
    const url: string = `/api/posts/handleview/${id}`;
    return axiosClient.post(url, item);
  },
  handleIsFinish(id: string, item: {}) {
    const url: string = `/api/posts/handleisfinish/${id}`;
    return axiosClient.post(url, item);
  }
};
export default PostAPI;
