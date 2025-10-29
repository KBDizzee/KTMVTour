import cloudinary from "../config/cloudinary.config";
import CustomError from "../middlewares/error-handler.middleware";
import fs from 'fs'


export const uploadFile = async(path:string,dir='/')=>{
  try{
    const {public_id,secure_url} = await cloudinary.uploader.upload(path,{
      unique_filename: true,
      folder:'KTMVTour' + dir,
    })

    //delete image from uploads
    if(fs.existsSync(path)){
      fs.unlinkSync(path)
    }

    return{
      public_id,
      path:secure_url
    }
  }catch(err){
    throw new CustomError(`Error uploading file to cloud`,500)
  }
}

export const deleteFiles = async(public_id:string[])=>{
  try{
    const promiseRes = public_id.map(async(pub_id)=>{
      return await cloudinary.uploader.destroy(pub_id)
    })

    const res = await Promise.all(promiseRes)
    return true
  }catch(err){
    throw new CustomError(`Error deleting file from cloud`,500)
  }
}