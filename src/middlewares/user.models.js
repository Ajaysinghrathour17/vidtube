/* 
  id string pk
  watchHistory ObjectId[] videos
  username string
  email string
  fullName string
  avatar string
  CoverImage string
  password string
  refreshToken string
  createdAt Date
  updateAt Date
  teams Date 
  */

import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    index: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  fullName: {
    type: String,
    required: true,
    trim: true,
    index: true,
  },
  avatar: {
    type: String, //cloudinary URL
    required: true,
  },
  CoverImage: {
    type: String, //cloudinary URL
  },
  watchHistory: {
    type: Schema.Types.ObjectId,
    ref: "Video",
  },
  password: {
    type: String,
    required: [true, "password is required"],
  },
  refreshToken: {
    type: String,
  }
},
{timestamps:true}
);

export const User = mongoose.model("User", userSchema);
//   it's standard practice to write in "User". and in database mongodb converts in small and plular cases "users"
