import { axiosClient } from "apis";

const NotiAPI = {
  getNotificationByUser(id: string) {
    const url: string = `/api/notification/${id}`;
    return axiosClient.get(url);
  },
  handleNotify(idUser: string, item: {}) {
    const url: string = `/api/handleNotify/${idUser}`;
    return axiosClient.put(url, item);
  }
};
export default NotiAPI;
