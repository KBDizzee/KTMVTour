import api from './index'

export const getAllCommentsAPI = async(postId:string,pageParam:number)=>{
  try{
    const response = await api.get(`/social/allComments/${postId}?currentPage=${pageParam}`)
    return response.data
  }catch(err:any){
    return err.response.data
  }
}
