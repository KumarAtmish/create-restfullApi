const mongoose = require("mongoose");
const URL= "mongodb://localhost:27017/students"

const connectToMongo = () =>{
    mongoose.connect(URL, () => {
        console.log("connection successfull...");
    })
}

module.exports = connectToMongo;
