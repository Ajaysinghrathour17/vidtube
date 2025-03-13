import mongoose, { Schema } from "mongoose";

const subscriptionSchema = new Schema(
  {
  
  subscriber:{
    type: Schema.Types.ObjectId,//one who is SUBSCRIBING
    ref: "User"
  },
  channel: {
    type: Schema.Types.ObjectId, //one to whom suvscriber is SUBSCRIBING
    ref: "User",
  },
 
},
{timestamps:true}
);

export const subscription = mongoose.model("Like", subscriptionSchema);

//   it's standard practice to write in "User". and in database mongodb converts in small and plular cases "users"
