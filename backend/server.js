//importing external dependencies
import express      from "express";
import bodyParser	from "body-parser";
import mongoose 	from "mongoose";
import cors from 'cors';
import dotenv																																from "dotenv";
dotenv.config(); // for reading from .env file
//importing internal dependencies
// handlers
import { register_handler }       from "./path_handlers/index.js";
import { get_details }            from "./path_handlers/index.js";
import { update_details_handler } from "./path_handlers/index.js";
import { delete_handler }         from "./path_handlers/index.js";
import { employee_data_validator } from "./utils/emp_validators.js";
import { get_employee_details_handler } from "./path_handlers/get/get_details.js";
import { register_db_validator } from "./utils/db_validators.js";
import { get_details_byId } from "./path_handlers/index.js";
import { update_alldetails_handler } from "./path_handlers/put/update_all.js";
import { delete_handler_byID } from "./path_handlers/delete/delete_handler.js";
import { handleGenerateOTPEndpoint } from "./path_handlers/post/otp/generate_otp.js";
import { login_handler } from "./path_handlers/post/login/login_handler.js";
import { handleValidateOTPAndDelete } from "./path_handlers/post/otp/validate_otp.js";
const app = express()
app.use(cors({origin: "*"}))
app.use(bodyParser.json());                          //Returns middleware that only parses json
app.use(bodyParser.urlencoded({ extended: true }));  //Returns middleware that only parses urlencoded bodies

/************POST CALL ***********/
app.post("/create_profile",register_db_validator,register_handler)
app.post("/get_emp_details", get_details)
app.post('/generateOtp', handleGenerateOTPEndpoint)
app.post('/auth/login', login_handler)
app.post('/validateOtp',handleValidateOTPAndDelete)

/************GET CALL************/
app.get("/get_all_emp_details", get_employee_details_handler)
app.get("/emp_details/:id", get_details_byId)

/************PUT CALL************/
app.put('/update', update_details_handler)
app.put("/update_all/:id",update_alldetails_handler)

/***********DELETE CALL**********/
app.delete('/delete_details', delete_handler)
app.delete('/deletebyId/:id', delete_handler_byID)

//listening to server
mongoose.connect(process.env.MONGO_URL)
.then(()=>{
    app.listen(process.env.BACKEND_PORT, ()=>{
        console.log(`server started and listening in port ${process.env.BACKEND_PORT}`)
    })
})
.catch((err)=>{
    console.log("unable to connect db" , err)
})
