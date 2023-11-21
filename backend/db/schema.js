import mongoose from "mongoose";

//creating Schema
const UserSchema = mongoose.Schema({
    firstname:      { type: String, required: true },
    lastname:       { type: String, required: true },
    phone_number:   { type: String, required: true },
    email:          { type: String, required: true },
    username:       { type: String, required: true },
    password:       { type: String, required: true },
})

const UserOtpSchema =  mongoose.Schema({
    phone_number:   { type: String, required: true },
    otp:            { type: Number, required: true  },
    otpExpiration:  { type: Date },
})

//creating model
const UserModel = mongoose.model("UserModel", UserSchema)

const UserOTPModel = mongoose.model("UserOTPModel", UserOtpSchema)

export { UserModel, UserOTPModel }
