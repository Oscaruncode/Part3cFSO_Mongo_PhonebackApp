const mongoose = require("mongoose")

const pass= process.argv[2]
const name= process.argv[3]
const num= process.argv[4]
const url= `mongodb+srv://oscar:${pass}@cluster0.gfyp2to.mongodb.net/Phonebookbd?retryWrites=true&w=majority`
const findPers =  process.argv.length<4  //if true mode for show Persons in Db / if false mode for add person to Db

mongoose.connect(url).then(() => {console.log("connect with DB")}).catch(err => {console.log("error:",err)})

const personSchema = new mongoose.Schema({
  name: String,
  num: Number
})

const Person =  mongoose.model("Person",personSchema)

const person =  new Person({
  "name":name,
  "num":num
})

if(findPers){Person.find({}).then(res => {res.forEach(el => console.log(el));mongoose.connection.close()})}
else{
  person.save().then(() => {console.log(`Added ${person["name"]} ${person["num"]}`);mongoose.connection.close()}).catch( () => {console.log("Error saving person")})
}



