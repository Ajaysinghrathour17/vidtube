/* 
 id string pk
  videofile string
  thumbnail string
  owner string
  title string
  description string
  duration string
  views number
  isPublished boolean
  updateAt Date
  teams Date
  */

import mongoose, { Schema } from "mongoose";

const videoSchema = new Schema(
  {
    videofile: {
      type: String, //cloudinary URL
      required: true,
    },
    thumbnail: {
      type: String, //cloudinary URL
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String, 
      required: true,
    },
    views: {
      type: Number,
      default: 0,    
    },
    duration: {
        type: Number,
        required: true,    
      },
      isPublished:{
        type: Boolean,
        default: true
      },
      owner:{
        type:Schema.Types.ObjectId,
        ref :"User"
      }
    
  },
  { timestamps: true }
);

export const Video = mongoose.model("User", videoSchema);
//   it's standard practice to write in "User". and in database mongodb converts in small and plular cases "users"
