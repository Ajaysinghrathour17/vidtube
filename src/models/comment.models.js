

import mongoose, { Schema } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const commentSchema = new Schema(
  {
    content :{
        type: String,
        required:true
    },
  video: {
    type: Schema.Types.ObjectId,
    ref: "Video",
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
 
},
{timestamps:true}
);

commentSchema.plugin(mongooseAggregatePaginate);
export const Comment = mongoose.model("Comment", commentSchema);

//   it's standard practice to write in "User". and in database mongodb converts in small and plular cases "users"
