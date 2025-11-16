import api from "./index";

export const feedAPI = async (currentPage:number) => {
  try {
    const response = await api.get(`/feed/home?currentPage=${currentPage}`);
    return response.data;
  } catch (err: any) {
    throw err.response.data;
  }
};
