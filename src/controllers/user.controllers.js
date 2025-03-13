
import { log } from "console";
import { User } from "../models/user.models.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import {asyncHandler} from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";


const registerUser = asyncHandler(async (req, res, next) => {

    const {fullname,email, username, password} = req.body;


    // validation
    if (
        [fullname, email, password].some((field) => field?.trim() === "" )
    ){
        throw new ApiError(400, "All field is required");
    }

    const existedUser = await User.findOne({
        $or: [{email}, {username}]

    })
    if (existedUser){
        throw new ApiError(409, "username or email already existed");
    }

    console.warn(req.files);
    
    const avatarLocalPath = req.files?.avatar?.[0]?.path;
    const coverLocalPath = req.files?.coverImage?.[0]?.path;

    if(!avatarLocalPath){
        throw new ApiError(400, "avatar is required");
    }

    // const avatar = await uploadOnCloudinary(avatarLocalPath)
    // let coverImage ="";
    // if(coverLocalPath){
    //     coverImage = await uploadOnCloudinary(coverLocalPath)
    // }

    let avatar;
    try {
       avatar = await uploadOnCloudinary(avatarLocalPath)
        console.log("avatar uloaded",avatar);
        
    } catch (error) {
        console.log("Error uploading avatar", error);
        throw new ApiError(500, "error uploading avatar");
    }

    
    let coverImage;
    try {
        coverImage = await uploadOnCloudinary(coverLocalPath)
        console.log("coverimage uploaded", coverImage);
        
    } catch (error) {
        console.log("Error uploading cover image", error);
        throw new ApiError(500, "error uploading avatar");
    }

    const user = await User.create({
        fullname,
        email,
        username: username.toLowerCase(),
        password,
        avatar: avatar?.url,
        coverImage: coverImage?.url,
    })

    const createdUser = await User.findById(user._id).select("-password -refreshToken");

    if (!createdUser) {
        throw new ApiError(500, "error creating user");
        
    }
    console.log(createdUser);

    
    return res.
    status(201)
    .json(
        new ApiResponse(201, "user created successfully"));

    

});


export { registerUser };