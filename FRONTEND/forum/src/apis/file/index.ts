import { axiosClient } from "apis";

const FileAPI = {
  getFiles() {
    const url: string = `/files`;
    return axiosClient.get(url);
  },
  getQuantityOfFile() {
    const url: string = `/files/quantity`;
    return axiosClient.get(url);
  },
  createFile(idCategory: string, item: any) {
    const url: string = `/files/upload/${idCategory}`;
    return axiosClient.post(url, item);
  },
  deleteFile(id: string) {
    const url: string = `/files/${id}`;
    return axiosClient.delete(url);
  },
  getFileByCategory(idDoctype: string) {
    const url: string = `/filebydoc/${idDoctype}`;
    return axiosClient.get(url);
  }
};
export default FileAPI;
