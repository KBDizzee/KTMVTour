import api from "./index";

export const feedAPI = async () => {
  try {
    const response = await api.get("/feed/home");
    response.data.data[0].photos.forEach((photo:any) => console.log(photo.url))
    return response.data;
  } catch (err: any) {
    throw err.response.data;
  }
};
