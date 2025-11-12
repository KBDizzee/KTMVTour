import { IPostData } from '../types/post.types'
import api from './index'

export const postsAPI = async(data:IPostData)=>{
  try{
    const response = await api.post('/social/postPics',data)
    return response.data
  }catch(err:any){
    return err.response.data
  }
}