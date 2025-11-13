import { IPostData } from '../types/post.types'
import api from './index'

export const postsAPI = async(data:IPostData | FormData)=>{
  try{
    console.log('hit postsAPI')
    const response = await api.post('/social/postPics',data,{
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    console.log(response)
    return response.data
  }catch(err:any){
    return err.response.data
  }
}