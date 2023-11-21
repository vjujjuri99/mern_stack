import { ObjectId } from "mongodb";
import { UserModel } from "../../db/schema.js";
/**
 * This function is used to update  the user email address.
 * If the user exists then checks for user email address
 * @param {*} request username,new_email from body
 * @param {*} response sends statuscode and status_message
 */
function update_alldetails_handler(request, response) {
  if(!ObjectId.isValid(request.params.id)){
    return response.status(400).send(`No record with given id : ${request.params.id}`);
  }
  var emp = {
    firstname:request.body.firstname,
    lastname:request.body.lastname,
    project:request.body.project,
    department:request.body.department,
    email:request.body.email,
    phone_number:request.body.phone_number
  };
  UserModel.findByIdAndUpdate(request.params.id, {$set:emp}, { new : true}, (err, dataobj)=> {
    if (!err){
      response.status(200).send({dataobj,status : 200})
    }
    else {
      console.log("Error in Employee Update")
    }
  })
}



export { update_alldetails_handler };