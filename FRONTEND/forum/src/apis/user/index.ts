import { axiosClient } from "apis";
import IUser from "types/user";

const UserAPI = {
  getAllUser() {
    const url: string = `/api/users`;
    return axiosClient.get(url);
  },
  getQuantityOfUser() {
    const url: string = `/api/users/quatity`;
    return axiosClient.get(url);
  },
  getUserById(id: string) {
    const url: string = `/api/users/${id}`;
    return axiosClient.get(url);
  },
  getUserFollow(id: string) {
    const url: string = `/api/users/follow/${id}`;
    return axiosClient.get(url);
  },
  addUser(user: IUser) {
    const url: string = `/api/users/create`;
    return axiosClient.post(url, user);
  },
  addListUser(user: any) {
    const url: string = `/api/users/createlist`;
    return axiosClient.post(url, user);
  },
  editUser(id: string, user: IUser) {
    const url: string = `/api/users/update/${id}`;
    return axiosClient.post(url, user);
  },
  deleteUser(id: string) {
    const url: string = `/api/users/delete/${id}`;
    return axiosClient.delete(url);
  },
  login(user: {}) {
    const url: string = `/api/login`;
    return axiosClient.post(url, user);
  },
  searchUser(key: {}) {
    const url: string = `/api/users/search`;
    return axiosClient.post(url, key);
  },
  handleMark(id: string, content: {}) {
    const url: string = `/api/users/mark/${id}`;
    return axiosClient.post(url, content);
  },
  handleFollow(id: string, item: {}) {
    const url: string = `/api/users/follow/${id}`;
    return axiosClient.post(url, item);
  }
};
export default UserAPI;
