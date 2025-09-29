const mongoose = require("mongoose");
const dotenv = require("dotenv");
const model = require("./model")
dotenv.config();

const database = async() =>{
    try{
        await mongoose.connect(process.env.MONGO_URI)
        console.log("Mongo DB connected");
        
    }
    catch(error){
        console.log("error in mongoDb connection");
        process.exit(1);
    }
}
module.exports = database;