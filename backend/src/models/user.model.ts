import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
  email:{
    type:String,
    required:[true,`Email required.`],
    unique:[true,`Email already registered. Log In instead.`]
  },

  password:{
    type:String,
    required:[true,`Password required.`],
    min:[8,`Password must be greater than 8 characters.`],
    select:false
  },

  username:{
    type:String,
    required:[true,`Username required.`],
    min:[3,`Username must be greater than 3 characters.`],
    max:[16,`Username cannot be greater than 16 characters`],
    unique:[true,`That Username already exists. Please choose a different one.`]
  },

  profilePicture:{
    path:{
      type: String,
      // required:true
    },
    public_id:{
      type:String,
      // required:true
    },
  }
  
}, {timestamps:true})

const User = mongoose.model('User',userSchema)
export default User