import api from './index'

export const getAllCommentsAPI = async(postId:string)=>{
  try{
    const response = await api.get(`/social/allComments/${postId}`)
    return response.data
  }catch(err:any){
    return err.response.data
  }
}
