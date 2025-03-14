
import mongoose, { Schema } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new Schema(
  {
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
    fullname: {
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
  { timestamps: true }
);


// userSchema.pre("save", async function (next){
//   if(this.isModified("password")){
//     this.password = await bcrypt.hash(this.password, 10);
//   }
//     next()
// });


userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = bcrypt.hash(this.password, 10);

  next()
});

userSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};


// json token
userSchema.methods.generateAccessToken = function () {

  return jwt.sign({
    _id : this._id,
    email : this.email,
    username : this.username,
    fullname : this.fullname 
  },
 process.env.ACCES_TOKEN_SECRET,
{expiresIn : process.env.ACCES_TOKEN_EXPIRY})
}

userSchema.methods.generateRefreshToken = function () {

  return jwt.sign({
    _id : this._id,

  },
 process.env.REFRESH_TOKEN_SECRET,
{expiresIn : process.env.REFRESH_TOKEN_EXPIRY})
}



export const User = mongoose.model("User", userSchema);
//   it's standard practice to write in "User". and in database mongodb converts in small and plular cases "users"
