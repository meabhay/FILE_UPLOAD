const express = require("express");

const app = express();
const PORT = process.env.PORT || 4000;
require("dotenv").config();

//adding middlewares
app.use(express.json());
const fileupload = require("express-fileupload");
app.use(fileupload({
    useTempFiles : true,
    tempFileDir : '/tmp/'
}
));             //This middleware is used for interacting with files

//connecting to database
const dbConnect = require("./config/database.js");
dbConnect();

//connecting to cloud
const {cloudinaryConnect} = require("./config/cloudinary.js");
cloudinaryConnect();

//api route mounting
const Upload = require("./routes/fileUpload.js");
app.use("/api/v1/upload", Upload)

//Start Server at port
app.listen(PORT, (req, res) => {
    console.log("Server started at port ", PORT);
});