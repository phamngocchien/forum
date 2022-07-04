import { axiosClient } from "apis";

const SearchAllAPI = {
  searchAll(key: any) {
    const url: string = `/search`;
    return axiosClient.post(url, key);
  }
};
export default SearchAllAPI;
