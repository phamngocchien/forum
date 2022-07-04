import { axiosClient } from "apis";

const DocumentTypeAPI = {
  getAllDocumentType() {
    const url: string = `/api/document-type`;
    return axiosClient.get(url);
  },
  getDocTypeById(id: string) {
    const url: string = `/api/document-type/${id}`;
    return axiosClient.get(url);
  },
  addDocType(item: {}) {
    const url: string = `/api/document-type/create`;
    return axiosClient.post(url, item);
  },
  editDocType(id: string, item: {}) {
    const url: string = `/api/document-type/${id}`;
    return axiosClient.put(url, item);
  },
  deleteDocType(id: string) {
    const url: string = `/api/document-type/${id}`;
    return axiosClient.delete(url);
  },
  searchDocType(item: {}) {
    const url: string = `/api/document-type/search`;
    return axiosClient.post(url, item);
  }
};
export default DocumentTypeAPI;
