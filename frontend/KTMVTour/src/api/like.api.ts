import api from "./index";

export const likeAPI = async(id:string)=>{
  try{
    console.log('like api func hit')
    const response = await api.post(`/social/${id}/like`)
    return response.data
  }catch(err:any){
    throw err.response.data
  }
}

export const unlikeAPI = async(id:string)=>{
  try{ 
    console.log(`unlike api func hit`)
    const response = await api.delete(`/social/${id}/unlike`)
    return response.data
  }catch(err:any){
    throw err.response.data
  }
}

export const checkIfLikedAPI = async(id:string)=>{
  try{
    const response = await api.get(`/social/${id}/checkLiked`)
    return response.data
  }catch(err:any){
    throw err.response.data
  }
}