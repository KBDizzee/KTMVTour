import { IPostData } from '../types/post.types'
import api from './index'

export const postsAPI = async(data:IPostData | FormData)=>{
  try{
    const response = await api.post('/social/postPics',data,{
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    return response.data
  }catch(err:any){
    return err.response.data
  }
}