const connection = require("../connection/connection")

const fetchData = async (email) => {
    const [result] = await connection.query(`SELECT * FROM employee where email = '${email}'`)
    return result;
}

const addData = async (employeeName, email, hash_password, employeeRole) => {
    const [result] = await connection.query(`INSERT INTO employee (employeeName,email,employeePassword,employeeRole) values('${employeeName}', '${email}', '${hash_password}', '${employeeRole}')`)
    return result;
}

module.exports = {
    fetchData,
    addData
}