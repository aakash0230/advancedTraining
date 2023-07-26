const connection = require("../connection/connection")
const reader = require('xlsx')
const bcrypt = require('bcrypt');
const { fetchData, addData } = require("../repository/repository")
const env = require("dotenv")
const jwt = require("jsonwebtoken")

env.config()
console.log(process.env.JWT_SECRET)

class dataController {
    async postExcelData (req, res){
        try{
            console.log("inside get data")
            // let excelData = (req.file) ? req.file.filename : null
            const file = reader.readFile(req.file.path)
            let data = []
            const sheets = file.SheetNames
            sheets.map(async (sheet,index)=>{
                const temp = reader.utils.sheet_to_json(
                    file.Sheets[sheet])
                
                    const protemp= temp.map(async (data)=>{
                        const [row]=await connection.query(`select * from ${sheet} where id = ?`,[data.id]);
                        if(row.length > 0){
                            
                          let keys = Object.keys(data);
                          keys.splice(0,1);
                          let str=``;
                        let arr= Object.values(data)
                         const [id] = arr.splice(0,1);
                         arr.push(id);
                          keys.forEach((item)=>{
                            str+=`${item} = ?,`
                          })
                          
                          const sql= `update ${sheet} set ${str.slice(0,-1)} where id = ? `;
                          console.log(sql);
                          await connection.query(sql,arr);
                        }else{
                           let keys = Object.keys(data); 
                           const place = Array(keys.length).fill("?").join(", ");
                           keys=keys.join(' , '); 
                           console.log(keys,place);
                           await connection.query(`insert into ${sheet} (${keys}) values  (${place})`,Object.values(data));
                        }
                    })
                    await Promise.all(protemp);

            }
            )
            res.send("Bhai upload ho gaya")
        }
        catch(err){
            console.log(err)
            res.json(err)
        }
    }

    async singIn (req, res){
        try{
            const { email, employeePassword } = req.body
            const row = await fetchData(email)
            console.log(row)
            if(row.length > 0){
                const matchPassword = bcrypt.compareSync(employeePassword, row[0].employeePassword);
                if(matchPassword){
                    res.status(200).json({
                        success : true,
                        message : "Logged in Succesfully"
                    })
                }
                else{
                    res.status(404).json({
                        success : false,
                        message : "Wrong username or password"
                    })
                }
            }
            else{
                res.status(404).json({
                    success : false,
                    message : "Wrong username or password"
                })
            }
        }
        catch(err){
            console.log(err)
            res.send(err)
        }
    }

    async singUp (req, res){
        try{
            const { employeeName, email, employeePassword, employeeRole } = req.body;
            const hash_password = bcrypt.hashSync(employeePassword, 10);
            const token = jwt.sign({email : email}, process.env.JWT_SECRET, {expiresIn : '1h'});
            const row = await addData(employeeName, email, hash_password, employeeRole)
            res.status(200).json({
                success : true,
                token : token,
                data : row
            })
        }
        catch(err){
            console.log(err)
            res.send(err)
        }
    }

}
module.exports = new dataController();