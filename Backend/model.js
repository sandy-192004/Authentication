const mongoose = require("mongoose")
const {Schema} = mongoose;

const schema = new Schema({
  name :{
    type:String,
    required:true
  },
  email:{
    type:String,
    unique:true,
    required:true
  },
  password:{
    type:String,
    required:true
  },
  role:{
    type:String,
    enum:["admin","user"],
    default:"user"

  }

})
const model = mongoose.model("user",schema)
module.exports = model;