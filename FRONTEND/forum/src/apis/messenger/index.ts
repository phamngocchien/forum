import { axiosClient } from "apis";

const MessengerAPI = {
  getMessages(id: string) {
    const url: string = `/api/messenger/${id}`;
    return axiosClient.get(url);
  },
  getMessagesById(id: string) {
    const url: string = `/api/messengerbyid/${id}`;
    return axiosClient.get(url);
  },
  createMessage(item: {}) {
    const url: string = `/api/messenger`;
    return axiosClient.post(url, item);
  },
  createReplyInMessage(id: string, item: {}) {
    const url: string = `/api/messenger/createreply/${id}`;
    return axiosClient.post(url, item);
  }
};
export default MessengerAPI;
