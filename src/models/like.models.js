

import mongoose, { Schema } from "mongoose";

const likeSchema = new Schema(
  {
  video: {
    type: Schema.Types.ObjectId,
    ref: "Video",
  },
  comment: {
    type: Schema.Types.ObjectId,
    ref: "Comment",
  },
  tweet: {
    type: Schema.Types.ObjectId,
    ref: "Tweet",
  },
  likeBy:{
    type: Schema.Types.ObjectId,
    ref: "User"
  }
 
},
{timestamps:true}
);

export const Like = mongoose.model("Like", likeSchema);

//   it's standard practice to write in "User". and in database mongodb converts in small and plular cases "users"
