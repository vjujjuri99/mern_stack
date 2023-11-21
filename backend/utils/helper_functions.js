/**
 * Helper function to validate firstname string
 * checks if name is string, else returns "firstname should be of string type"
 * checks if name is too short, else returns "firstname should be at least 4 characters long and max of 25"
 * checks if name is of the correct format, else returns "firstname should not have at least 1 special character and at least 1 digit"
 * @param {} firstname
 * @returns
 */
 const _firstname_helper = (firstname) => {
    const returnObject = {};
  
    if (typeof firstname != "string") {
      returnObject.firstname = "firstname should be of string type";
      return returnObject;
    }
  
    if (firstname.length < 3) {
      returnObject.firstname =
        "firstname length should be at least 4 characters long";
      return returnObject;
    }
  
    if (firstname.length > 25) {
      returnObject.firstname = "firstname length shouldn't be 25 characters long";
      return returnObject;
    }
  
    if (!firstname.match(/^[a-zA-Z ]+$/)) {
      returnObject.firstname = "firstname should be of the correct format";
      return returnObject;
    }
  
    return returnObject;
  };
  
  /**
   * Helper function to validate lastname string
   * checks if lastname is string, else returns "lastname should be of string type"
   * checks if lastname is too short, else returns "lastname should be at least 4 characters long and max of 25"
   * checks if lastname is of the correct format, else returns "lastname should not have at least 1 special character and at least 1 digit"
   * @param {} lastname
   * @returns
   */
  const _lastname_helper = (lastname) => {
    const returnObject = {};
  
    if (typeof lastname != "string") {
      returnObject.lastname = "lastname should be of string type";
      return returnObject;
    }
  
    if (lastname.length < 3) {
      returnObject.lastname =
        "lastname length should be at least 4 characters long";
      return returnObject;
    }
  
    if (lastname.length > 25) {
      returnObject.lastname = "lastname length shouldn't be 25 characters long";
      return returnObject;
    }
  
    if (!lastname.match(/^[a-zA-Z ]+$/)) {
      returnObject.lastname = "lastname should be of the correct format";
      return returnObject;
    }
  
    return returnObject;
  };
  /**
   * Helper function to validate email string
   * checks if email is string, else returns "email should be of string type"
   * checks if email is too short, else returns "email should be at least 6 characters long and max of 50"
   * checks if email is of the correct format, else returns "email should be of the correct format" 406
   * @param {} email
   * @returns
   */
  const _email_helper = (email) => {
    const returnObject = {};
    // is it a string
    if (typeof email != "string") {
      returnObject.email = "email should be of string type";
      return returnObject;
    }
    if (email.length < 6) {
      returnObject.email = "email length should be at least 6 characters long";
      return returnObject;
    }
    if (email.length > 50) {
      returnObject.email = "email length should be a max of 50";
      return returnObject;
    }
    if (!email.toLowerCase().match(/[a-z0-9]+@[a-z]+\.[a-z]{2,3}/)) {
      returnObject.email = "email is supposed to be in valid format";
      return returnObject;
    }
    return returnObject;
  };
  
  /**
   * Helper function to validate phone number
   * checks if phone no is number, else returns "phone number should be of number type"
   * checks if phone no is too short, else returns "phone number should be at least 1 characters long and max of 10"
   * checks if phone no is of the correct format, else returns "phone number should be of the correct format" 406
   * @param {} phone_number
   * @returns
   */
  const _phone_number_helper = (phone_number) => {
    const returnObject = {};
  
    if (typeof phone_number != "number") {
      returnObject.phone_number = "phone number should be of number type";
      return returnObject;
    }
  
    if (phone_number.toString().length < 10 || phone_number.toString().length > 10) {
      returnObject.phone_number =
        "phone number  should be  10 digits";
      return returnObject;
    }
    return returnObject;
  };
  
  /**
   * Helper function to validate department string
   * checks if department is string, else returns "address should be of string type"
   * @param {} Deparment
   * @returns
   */
  const _department_helper = (department) => {
    const returnObject = {};
    if (typeof department != "string") {
      returnObject.department = "department should be of string type";
      return returnObject;
    }
    return returnObject;
  };
  
  /**
   * Helper function to validate department string
   * checks if project is string, else returns "address should be of string type"
   * @param {} Project
   * @returns
   */
  const _project_helper = (project) => {
    const returnObject = {};
    if (typeof project != "string") {
      returnObject.project = "project should be of string type";
      return returnObject;
    }
    return returnObject;
  };
  
  
  const employee_keys_validator = (user_data, response, next) => {
    let body_keys_list = [];
  
    for (let item in user_data.body) {
      body_keys_list.push(item);
    }
  
    //delaring a list of keys to validate the keys
    let key_list = [
      "firstname",
  
      "lastname",
  
      "email",
  
      "phone_number",
  
      "department",
  
      "Project"
    ];
  
    for (let key of key_list) {
      if (body_keys_list.includes(key)) {
        continue;
      } else {
        let msg = key + " is Missing!";
  
        return response
          .status(409)
          .send(JSON.stringify({ status_code: 406, status_message: msg }));
      }
    }
    next();
  };
  
  export {
    _firstname_helper,
    _lastname_helper,
    _email_helper,
    _phone_number_helper,
    _department_helper,
    _project_helper,
    employee_keys_validator
  };
  
