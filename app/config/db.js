const mongoose = require('mongoose');


const connectDB = async () => {
    const con = await mongoose.connect(process.env.MONGO_URL);
    if (con) {
        console.log("MongoDB Connected");
    } else {
        console.log("MongoDB Connection Failed");
    }
};


module.exports = connectDB;