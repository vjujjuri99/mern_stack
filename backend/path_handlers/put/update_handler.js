import { UserModel } from "../../db/schema.js";
/**
 * This function is used to update  the user email address.
 * If the user exists then checks for user email address
 * @param {*} request username,new_email from body
 * @param {*} response sends statuscode and status_message
 */
function update_details_handler(request, response) {
  const { email, new_phone_number } = request.body;

  UserModel.findOne({ email }, (err, dataObj) => {
    if (err) {
      response.status(500).send("db error", err);
    } else {
      if (dataObj === null) {
      response.status(309).send({msg:"Email not exists"});
      } else {
        dataObj.updateOne({ $set: { phone_number: new_phone_number } }, (err) => {
          if (err) {
            response.send("unable to update email");
          } else {
            response.status(200).send({msg :"mobile_number updated successfully success", status:200, old_number:dataObj.phone_number, new_phone_number: new_phone_number});
          }
        });
      }
    }
  });
}



export { update_details_handler };
