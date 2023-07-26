const express = require("express");
const router = require("./routes/routes");
const env = require("dotenv")


env.config();
const app = express()
// app.use(bodyParser.json())
app.use(express.json())

app.use(router);

console.log("Aakash Pandey")
console.log(process.env.JWT_SECRET)

// let data = []

// const file = reader.readFile('./metaData/Metadata.xlsx')
// // console.log(file)
// const sheets = file.SheetNames
// // console.log(sheets)
// for(let i = 0; i < sheets.length; i++){
//     const temp = reader.utils.sheet_to_json(
//         file.Sheets[file.SheetNames[i]])
//     // console.log(sheets[i])
//     // console.log(temp)
//     temp.forEach((res) => {
//         data.push(res)
//     })
// }

// console.log(data)

app.listen(3000, () => {
    console.log("Server is running on port 3000")
})