const express = require("express");
const router = express.Router();

const { localFileUpload, imageUpload, videoUpload, imageReduceUpload} = require("../controller/fileupload.js");

//api route
router.post("/localFileUpload",localFileUpload);
router.post("/imageUpload", imageUpload)
router.post("/videoUpload", videoUpload)
router.post("/imageReduceUpload", imageReduceUpload);

module.exports = router