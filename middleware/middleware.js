const Employee = require('../dto/Employeedto.js')

const validateAuth = (req, res, next) => {
    const path = req.path
    console.log(path)
    if(path == "/auth/signup"){
        console.log("inside signup validator")
        const { employeeName, email, employeePassword } = req.body;
        const dtoValidation = new Employee(employeeName, email, employeePassword);
        if (!dtoValidation.validateSignUp().isValid) {
            return res.status(400).json({ error: dtoValidation.validateSignUp().error });
        } else {
            next()
        }
    }
    else{
        console.log("inside signin validator")
        const { email, employeePassword } = req.body;
        const dtoValidation = new Employee('', email, employeePassword);
        if (!dtoValidation.validateSignIn().isValid) {
            return res.status(400).json({ error: dtoValidation.validateSignIn().error });
        } else {
            next()
        }
    }
};

module.exports = validateAuth