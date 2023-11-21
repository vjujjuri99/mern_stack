//importing internal dependencies
// importing Employee_Data model

import { UserModel } from "../db/schema.js";

/**
 * register_db_handler() is used for unique email, emp_id, username, mobile_no
 * @param {*} req email, emp_id, aadhar_no as body params and checks for uniqueness
 * @param {*} res if the params allready exists in database sends error status_code and status_message
 * @param {*} next it is middleware if all cteria of this function is met it will allows to go for next function
 */

function register_db_validator(req, res, next) {
  const { email, phone_number } = req.body;

  UserModel.find(
    {
      $or: [{ email }, { phone_number }],
    },
    (err, dataArray) => {
      if (err) {
        res.status(500).send("Database err " + err);
      } else {
        if (dataArray.length != 0) {
          dataArray.forEach((user_found) => {
            if (user_found.email == email) {
              if (user_found.phone_number == phone_number) {
                res
                  .send({
                    err_msg:
                      phone_number +
                      " " +
                      email +
                      " email and Mobile Number already exists",
                  });
              } else {
                res.send({ err_msg: email + "Email already exits" });
              }
            }
          });
          return;
        } else {
          // there are no matches, we are good to go
          next();
        }
      }
    }
  );
}

//exporting function
export { register_db_validator };
