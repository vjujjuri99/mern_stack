import {
    _firstname_helper,
    _lastname_helper,
    _email_helper,
    _phone_number_helper,
    _department_helper,
    _project_helper
  } from '../utils/helper_functions.js'
  
  /**
   * This is a helper middleware function to help with validation of employee details
   * parameters.
   * @param {}  req   HTTP req object as recieved by Express backend
   * @param {*} res   HTTP response object to be populated by Express backend
   * @param {*} next  next() is a function to be called if the validation is success
   * @returns
   */
  const employee_data_validator = (request, response, next) => {
    const { firstname, lastname, email, phone_number, department, project} =
      request.body;
    const error_object = {};
    error_object.firstname = _firstname_helper(firstname).firstname;
    error_object.lastname = _lastname_helper(lastname).lastname;
    error_object.email = _email_helper(email).email;
    error_object.phone_number = _phone_number_helper(phone_number).phone_number;
    error_object.department = _department_helper(department).department;
    error_object.project = _project_helper(project).project;
    for (const [key, value] of Object.entries(error_object)) {
      if (value) {
        return response.status(406).send(error_object);
      }
    }
  
    next();
  };
  
  export { employee_data_validator };
  