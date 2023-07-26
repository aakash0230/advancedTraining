const express = require("express")
const router = new express.Router()
const controller = require("../controller/controller")
const multer = require("multer")
const validateAuth = require("../middleware/middleware")

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'metaData/')
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + '_' + file.originalname)
    }
  })


  const upload = multer({ storage : storage })

router.post("/", upload.single('myFile'), controller.postExcelData)
router.post("/auth/signin", validateAuth, controller.singIn)
router.post("/auth/signup", validateAuth, controller.singUp)

module.exports = router;