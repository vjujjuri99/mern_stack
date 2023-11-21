import bcrypt from "bcrypt";

/**
 * This is a function which takes a password string and calls 
 * the callback function with the hashed password
 * @param {} password password to be hashed
 * @param {} callback callback function
 */
const getEncryptedPassword = (password, callback) => {
  bcrypt.hash(password, process.env.SALT, (err, res) => {
    callback(err, res);
  });
};

/**
 * This is a function which takes a password param string and password string
 * in user model and compares them using bcrypt
 * @param {} param_password password provided by user
 * @param {} usermodel_password password in the database
 * @param {} callback callback function
 */
 const comparePasswords = (param_password, usermodel_password, callback) => {
	bcrypt.compare(param_password, usermodel_password, (err, res) => {
			callback(err, res);
	})
}

export { getEncryptedPassword, comparePasswords };
