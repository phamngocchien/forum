import { axiosClient } from "apis";
import ITag from "types/tag";

const TagAPI = {
  getAllTag() {
    const url: string = `/api/tags`;
    return axiosClient.get(url);
  },
  getQuantityOfTag() {
    const url: string = `/api/tags/quantity`;
    return axiosClient.get(url);
  },
  getTagById(id: string) {
    const url: string = `/api/tags/${id}`;
    return axiosClient.get(url);
  },
  addTag(tag: ITag) {
    const url: string = `/api/tags/create`;
    return axiosClient.post(url, tag);
  },
  editTag(id: string, tag: ITag) {
    const url: string = `/api/tags/update/${id}`;
    return axiosClient.put(url, tag);
  },
  deleteTag(id: string) {
    const url: string = `/api/tags/delete/${id}`;
    return axiosClient.delete(url);
  },
  searchTag(keyword: {}) {
    const url: string = `/api/tags/search`;
    return axiosClient.post(url, keyword);
  }
};
export default TagAPI;
