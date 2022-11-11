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
        minLength: 8,
        required: true,
        validate:{
            validator: function(v){
                return /^\d{2,3}-\d+$/.test(v);},
            message: props => `${props.value} is not a valid phone number!. Try someone number that is formed of two parts that are separated by -, the first part has two or three numbers and the second part also consists of numbers`
        }
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