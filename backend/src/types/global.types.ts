import mongoose, { Schema } from "mongoose"


export interface JWTPayload{
  _id: Schema.Types.ObjectId,
  email:string,
  username:string,
  profilePicture?:{
    path:string,
    public_id:string,
  } | null
}

export interface JWTDecodedPayload extends JWTPayload{
  readonly exp:number,
  iat:number
}