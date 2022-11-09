const mongoose = require("mongoose");

const url = process.env.MONGODB_URI;

mongoose.connect(url).then(res=>{console.log("connected to BD in", url)})

const persSchema = new mongoose.Schema({
    "name":String,
    "number":String
})


persSchema.set("toJSON", {
    transform: (document, returnedObject) =>{
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model("Per",persSchema)