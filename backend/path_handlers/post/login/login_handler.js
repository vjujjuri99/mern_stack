import { UserModel } from "../../../db/schema.js";
import { comparePasswords } from "../../../middlewares/hashing/bycrpt_helper.js";
import { jwt_token_generator } from "../../../middlewares/jwtToken_helper.js";

/**
 * This function is used to verify whether the user exists or not.
 * If the user exists then checks the log_in params for login purpose
 * @param {*} req email,password from body which are used for user login
 * @param {*} res sends statuscode and status_message as response for successfull login '200'
 *
 */
function login_handler(request, response) {
    
    // accessing email and pasword from body
    const { username, password } = request.body;

    // Checking whether the employee email exists or not
    UserModel.findOne({ username }, (err, dataObj) => {
        if (err) {
            response.status(406).send({ status_message: "Error in finding user by username" });
        } else {
            if (dataObj == null) {
                response.status(404).send({ status_message: "No user with this " + username + " exists." });
            } else {
                const hashed_password = dataObj.password;
                comparePasswords(password, hashed_password, (err, res) => {
                    if (err) {
                        // unable to match password, some bcrypt error
                        response.status(404).send({ err: "Unknown error " + err });
                    } else {
                        if (!res) {
                            response.status(404).send({ err: "Username and password do not match" });
                        } else { // passwords matched
                            const jwt_token = jwt_token_generator(dataObj.username)
                            response.send({ msg: "Login successful", jwt_token })
                        }
                    }
                });
            }
        }
    });
}

export { login_handler };
