const express = require('express');
const router = express.Router();
const multer = require('multer')
const Controller = require("../Controller/Controller")

const imgstorage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, './img')
    },
    filename: function (req, file, callback) {
        callback(null, `img-${file.originalname}`)
    }

})
const upload = multer({
    storage: imgstorage
})
router.post('/create', upload.single("photo"), Controller.insert)
router.get('/show', Controller.showContact)
router.delete("/delete/:id", Controller.delete)
router.put('/update', upload.single("photo"), Controller.update)
module.exports = router
