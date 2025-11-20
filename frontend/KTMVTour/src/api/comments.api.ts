import { ICommentData } from '@/components/community/PostComment'
import api from './index'

export const getAllCommentsAPI = async(postId:string,pageParam:number)=>{
  try{
    const response = await api.get(`/social/allComments/${postId}?currentPage=${pageParam}`)
    return response.data
  }catch(err:any){
    return err.response.data
  }
}


export const postCommentsAPI = async(postId:string,data:ICommentData)=>{
  console.log(`post comment api function hit`)
  try{
    const response = await api.post(`/social/comment/${postId}`,data)
    return response.data
  }catch(err:any){
    return err.response.data
  }
}
