const mongoose = require("mongoose");
require("dotenv").config();

const dbConnect = async () => {
    try {
        await mongoose.connect(process.env.DATABASE_URL);
        console.log("MongoDB connected successfully");
    } catch (error) {
        console.log("Connection unsuccessfull !");
        process.exit(1);
    }
}

module.exports = dbConnect;