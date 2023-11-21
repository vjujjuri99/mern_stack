import { UserModel } from "../../db/schema.js";
/**
 * This is a  function to get the details of the user profile
 * @param request request object of Express
 * @param response response object of Express
 * @returns dataObj or error containing message
 */
function get_details(request, response) {
  const { email } = request.body;
  UserModel.findOne(
    { email },
    "firstname lastname email department project phone_number image -_id",
    (err, dataObj) => {
      if (err) {
        response.status(500).send("databse err", err);
      } else {
        if (dataObj === null) {
          response.send({msg:"Email not exists"});
        } else {
          response.status(200).send(JSON.stringify({obj :dataObj , status_code: 200}));
        }
      }
    }
  );
}
 
/**
 * This function is used to retrive the employee details.
 * @param {*} request is used to get the employeedetails based on the id
 * @param {*} response sends statuscode 200 if the data is retrieved successfully
 * else we get the error message
 */
 const get_details_byId=async(request,response)=>{
  try {
      const data=await UserModel.findById(request.params.id);
          response.status(209).json(data);
  } catch (error) {
      response.status(404).json({message:error.message})     
  }
}


/**
 * This function is used to retrive the employee details.
 * @param {*} request is used to get the employeedetails from the server
 * @param {*} response sends statuscode 200 if the data is retrieved successfully
 * else we get the error message
 */
 const get_employee_details_handler = async (request, response) => { 
  try {
      const data = await UserModel.find({},"firstname lastname email department project phone_number _id");       
      response.status(200).json(data);
  } catch (error) {
      response.status(404).json({ message: error.message });
  }
}

export { get_details,get_employee_details_handler, get_details_byId};
