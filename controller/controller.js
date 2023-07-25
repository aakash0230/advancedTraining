const connection = require("../connection/connection")
const reader = require('xlsx')

class dataController {
    async getData (req, res){
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
            // console.log(data)
            res.send("Bhai upload ho gaya")
        }
        catch(err){
            console.log(err)
            res.json(err)
        }
    }
}

module.exports = new dataController();