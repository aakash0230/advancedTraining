const express = require("express")
const router = new express.Router()
const controller = require("../controller/controller")
const multer = require("multer")

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'metaData/')
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + '_' + file.originalname)
    }
  })


  const upload = multer({ storage : storage })

router.post("/", upload.single('myFile'), controller.getData)

module.exports = router;