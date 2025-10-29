import multer from 'multer'
import fs from 'fs'
import path from 'path'
import { Request } from 'express'


export const uploader = ()=>{

  // storage function
  const storage = multer.diskStorage({
    destination: function (req,file,cb){
      const destination = 'uploads/'

      // checking if folder already exists first. If it doesn't exist, only then we create a new uploads folder:
      if (!fs.existsSync(destination)){
        fs.mkdirSync(destination,{recursive:true})
      }

      cb(null,destination)
    },
    filename: function(req,file,cb){
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random())
      cb(null,file.fieldname + '-' + uniqueSuffix)
    }
  })
  const fileSize = 5*1024*1024
  const allowedExtensions = ['jpg','jpeg','png','webp','gif','avif']

  // fileFilter function {to control which files should be uploaded}
  const fileFilter = (req:Request,file:Express.Multer.File,cb:multer.FileFilterCallback)=>{

    // checking file is one of the extensions listed above:
    const ext = path.extname(file.originalname).replace('.','')
    if (allowedExtensions.includes(ext)){
      cb(null,true)
    } else{
      cb(new Error(`Invalid File Format. Please select either jpg,jpeg,png,webp,gif or avif.`))
    }
  }


  const upload = multer({limits:{fileSize},storage,fileFilter})
  return upload
}