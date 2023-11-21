import { UserModel } from "../../db/schema.js";
import { ObjectId } from "mongodb";
/**
 * This is a  function to soft delete the user_details
 * @param request express request object
 * @param response express response object
 * @returns An object containing result or error messages.
 */
function delete_handler(request, response) {
  const { email } = request.body;
  UserModel.findOne({ email }, (err, dataObj) => {
    if (err) {
      response.status(500).send("Database error");
    } else {
      if (dataObj == null) {
        response.send({msg:"Email not exists"});
      } else {
        dataObj.delete((err) => {
          if (err) {
            response.send({err_msg:"unable to delete data",status:401});
          } else {
            response.send({msg:"Deleted successfully",status:200,  name : dataObj.firstname + ' ' +  dataObj.lastname});
          }
        });
      }
    }
  });
}

/**
 * 
 */
function delete_handler_byID(request,response){
  if(!ObjectId.isValid(request.params.id)){
    return response.status(400).send(`No record with given id : ${request.params.id}`);
  }
  UserModel.findByIdAndDelete((request.params.id), (err, dataObj) =>{
    if(!err){
      response.send({msg:"deleted Successfully", status:200})
    }
    else{
      response.send("Unable to delete")
    }
  })

}
export { delete_handler, delete_handler_byID };
