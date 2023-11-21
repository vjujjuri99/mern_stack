import mongoose from "mongoose";

//creating Schema
const UserSchema = mongoose.Schema({
    firstname:      { type: String, required: true },
    lastname:       { type: String, required: true },
    phone_number:   { type: Number, required: true },
    email:          { type: String, required: true },
    username:       { type: String, required: true },
    password:       { type: String, required: true },
    otp:            { type: Number },
    otpExpiration:  { type: Date },
})

//creating model
const UserModel = mongoose.model("UserModel", UserSchema)


export { UserModel }
