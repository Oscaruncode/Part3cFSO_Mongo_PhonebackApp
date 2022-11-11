const mongoose = require("mongoose");
require("dotenv").config();
const url = process.env.MONGODB_URI;


mongoose.connect(url).then(res=>{console.log("connected to BD in MongoDB")})

const persSchema = new mongoose.Schema({
    "name":{
        type: String,
        minLength: 3,
        required: true
    },
    "number":{
        type: String,
        required: true
    }
})


persSchema.set("toJSON", {
    transform: (document, returnedObject) =>{
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model("Person",persSchema)