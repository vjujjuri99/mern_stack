import { UserModel } from "../../db/schema.js";
/**
 * This register_handler function will save the register details
 * @param {*} request request object of Express
 * @param {*} response response object of Express
 * @returns response or error containing message
 */
function register_handler(request, response) {
  const {
    firstname,
    lastname,
    project,
    department,
    email,
    phone_number
  } = request.body;
  const user_data = {
    firstname,
    lastname,
    project,
    department,
    email,
    phone_number
  };
  //declaring a variable of userdata
  const UserData = new UserModel(user_data);

  UserData.save()
    .then(() => {
      console.log("data saved");
      response.send({ msg: "User register successfully", status:200 , firstname: firstname});
    })
    .catch((err) => {
      console.log(err);
      response.send({err_msg: "unable to add data"})
    });
}

export { register_handler };
