import { axiosClient } from "apis";
import IReply from "types/reply";

const ReplyAPI = {
  getReplyByIdPost(id: string) {
    const url: string = `/api/replies/${id}`;
    return axiosClient.get(url);
  },
  getReplyByUserId(idUser: string) {
    const url: string = `/api/replies/user/${idUser}`;
    return axiosClient.get(url);
  },
  addReply(reply: IReply) {
    const url: string = `/api/replies/create`;
    return axiosClient.post(url, reply);
  },
  editReply(id: string, reply: IReply) {
    const url: string = `/api/replies/update/${id}`;
    return axiosClient.post(url, reply);
  },
  removeReply(id: string) {
    const url: string = `/api/replies/delete/${id}`;
    return axiosClient.delete(url);
  },
  removeAllReply(id: string) {
    const url: string = `/api/replies/deletebypost/${id}}`;
    return axiosClient.delete(url);
  }
};
export default ReplyAPI;
