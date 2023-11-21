import jwt from "jsonwebtoken";

/**
 * jwt_token_generator() is used for generating jwt_token when the user logins
 * @param {*} emp_id which is used as part of payload
 * @param {*} role which is used as a part of the payload
 * @returns jwt_token which is generated
 */
function jwt_token_generator(username) {
  // accepting emp_id as params and storing it in payload as object
  var payload = {
    username
  };

  // generates jwt token
  const jwt_Token = jwt.sign(payload, process.env.SECRET_KEY);
  return jwt_Token;
}
/**
 * jwt_token_validator() is used for generating jwt_token when the user logins
 * @param {*} req which is used as part of payload
 * @param {*} res which is used as a part of the payload
 * @returns jwt_token which is generated
 */


 
  /**
   * jwt_validator_helper is a heler function to check for roles in input list
   * @param {*} req authorization_token  from headers
   * @param {*} res
   * @param {*} next its an express midlleware
   */
  function jwt_validator_helper(req, res, next, array_of_roles) {

    let authorization_header = req.header("authorization");
    if (typeof authorization_header != 'string') {
    res.status(401).send({ err: "Authorization is required" });
    } else {
      if (authorization_header.split(' ').length != 2) {
        res.status(401).send({ err: "Token is of invalid format!" })
      } else {
        let jwt_token = authorization_header.split(" ")[1];
        if (jwt_token) {
          // verifying jwt_token and accessing payload from the jwt_token
          jwt.verify(jwt_token, process.env.SECRET_KEY, (error, payload) => {
            if (error) {
              res.status(401).send("Invalid Jwt Token " + error);
            } 
          });
        } else {
          res.status(401).send("Invalid Jwt Token");
        }
      }
    }
  }
  
export { jwt_token_generator,jwt_validator_helper };
