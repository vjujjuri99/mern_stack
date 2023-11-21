import mongoose from "mongoose";

//creating Schema
const UserSchema = mongoose.Schema({
    firstname :        {type: String, required : true},
    lastname :         {type: String, required : true},
    phone_number :     {type : Number, required: true},
    department :       {type: String, required : true},
    email :            {type: String, required : true},
    project :          {type: String, required : true}
})

//creating model
const UserModel = mongoose.model("UserModel", UserSchema)


export {UserModel}
