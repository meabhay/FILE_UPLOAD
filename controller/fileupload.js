const File = require("../model/file.js");
const cloudinary = require("cloudinary").v2;
require("dotenv").config();



//localFileUpload Handler
exports.localFileUpload = async (req, res) => {
    try {
        
        //fetch file from request
        const image1 = req.files.file1;    //express-fileupload middleware is used here
        console.log("WHOLE FILES OBJECT", req.files);
        console.log("FILE AA GYI => ", image1);

        //create path where file need to be stored on server
        const path = __dirname + "/files/" + Date.now() + `.${image1.name.split('.')[3]}`;   //go to current directory , find folder with name "files" make file with name date.now() and add extension from the uploaded file
        console.log("This is the path", path);

        //add path to the move function
        image1.mv(path, (err) => {
            console.log(err);
        });

        //create a successfull response
        res.json({
            success: true,
            message: "Local File uploaded successfully!"
        })

    } catch (error) {
        res.status(401).json({
            success: false,
            message: "Local file upload unsuccessfull"
        })
    }
}




//function for checking wether the particular file type is matching from the given array file types
function isFileTypeSupported(type, supportedTypes){
    return supportedTypes.includes(type);
}

// function for uploading to cloudinary
async function uploadFileToCloudinary(file, folder, quality = 80){
    const options = {
        folder,
      use_filename: true, // Use the original filename
      unique_filename: false, // Prevent Cloudinary from adding random characters
      overwrite: true, // Overwrite if the filename already exists
      resource_type: "auto",  // necessary for detecting file type (image, video or anything else)
      quality: quality,
    };
    
    return await cloudinary.uploader.upload(file.tempFilePath, options)
}

//imageUpload Handler
exports.imageUpload = async (req, res) => {
    try {
        //data fetch
        const {name, tags, email} = req.body;
        console.log(name, tags, email);

        const file = req.files.imageFile;     //req.files.KEYname
        console.log(file);

        //Validation
        const supportedTypes = ["jpg", "jpeg", "png"];
        const fileType = file.name.split('.')[3].toLowerCase();

        if(!isFileTypeSupported(fileType,supportedTypes)){
            return res.status(400).json({
                success: false,
                message: "File not supported"
            })
        }

    //file format supported

        console.log("Uploading to uploadedContent");
        //uploading to cloudinary
        const response = await uploadFileToCloudinary(file, "uploadedContent");
        console.log(response);

    //db entry creation
        const fileData = await File.create({
            name,
            tags,
            email,
            imageUrl: response.secure_url,
        });

        res.json({
            success: true,
            imageUrl: response.secure_url,
            message: "Image successfully uploaded"
        })

    } catch (error) {
        console.log(error);

        res.status(404).json({
            success: false,
            message: "something went wrong"
        })
    }

}



//videoUpload Handler
exports.videoUpload = async (req, res) => {
    try {
        //data fetch
        const {name, tags, email} = req.body;
        console.log(name, tags, email);

        const file = req.files.videoFile;     //req.files.KEYname
        console.log(file);

        //Validation
        const supportedTypes = ["mp4", "mov"];
        const fileType = file.name.split('.')[3].toLowerCase();

        if(!isFileTypeSupported(fileType,supportedTypes)){
            return res.status(400).json({
                success: false,
                message: "File not supported"
            })
        }

    //file format supported

        console.log("Uploading to uploadedContent");
        //uploading to cloudinary
        const response = await uploadFileToCloudinary(file, "uploadedContent");
        console.log(response);

    //db entry creation
        const fileData = await File.create({
            name,
            tags,
            email,
            imageUrl: response.secure_url,
        });

        res.json({
            success: true,
            imageUrl: response.secure_url,
            message: "Video successfully uploaded"
        })

    } catch (error) {
        console.log(error);

        res.status(404).json({
            success: false,
            message: "something went wrong"
        })
    }

}


//imageReduceUpload Handler
exports.imageReduceUpload = async (req, res) => {
    try {
        //data fetch
        const {name, tags, email} = req.body;
        console.log(name, tags, email);

        const file = req.files.imageFile;     //req.files.KEYname
        console.log(file);
        

        //Validation
        const supportedTypes = ["jpg", "jpeg", "png"];
        const fileType = file.name.split('.')[3].toLowerCase();

        if(!isFileTypeSupported(fileType,supportedTypes)){
            return res.status(400).json({
                success: false,
                message: "File not supported"
            })
        }

    //file format supported

        console.log("Uploading to uploadedContent");
        //uploading to cloudinary
        const response = await uploadFileToCloudinary(file, "uploadedContent",60);
        console.log(response);

    //db entry creation
        const fileData = await File.create({
            name,
            tags,
            email,
            imageUrl: response.secure_url,
        });

        res.json({
            success: true,
            imageUrl: response.secure_url,
            message: "Image successfully uploaded"
        })

    } catch (error) {
        console.log(error);

        res.status(404).json({
            success: false,
            message: "something went wrong"
        })
    }

}