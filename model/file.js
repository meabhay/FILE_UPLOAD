const mongoose = require("mongoose");
const { Schema } = mongoose;

const fileSchema = new Schema (
{
    name: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
    },
    tags: {
        type: String
    },
    email: {
        type: String
    }
},
{timestamps: true}
)

const File = mongoose.model("File", fileSchema);
module.exports = File;