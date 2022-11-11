const express = require("express")
const morgan= require("morgan")
const cors = require("cors")
require("dotenv").config()
const Person = require("./models/personmodel")

const app = express()

const PORT = process.env.PORT || 3001

//token
morgan.token("content", (req) => JSON.stringify(req.body))

//Middlewares
app.use(express.static("build"))
app.use(cors())
app.use(express.json())
app.use(morgan(":method :url :status :res[content-length] - :response-time ms :content"))



//Routes
app.get("/", (req, res) => {
  res.send("<h1>Hello World!</h1>")
} )

app.get("/api/persons", (req, res) => {
  Person.find({}).then( persons => {
    res.json(persons)})
} )

app.get("/info", (req, res) => {
  Person.find({}).then(persons => {res.send( `<div><p> Phonebook has info for ${persons.length} people </p> <p> ${Date()} </p>  </div>`  )} )
} )

app.get("/api/persons/:id", (req,res,next) => {
  Person.findById(req.params.id).then(pers => {res.json(pers)}).catch(err => next(err))
} )

app.delete("/api/persons/:id", (req,res,next) => {
  Person.findByIdAndDelete(req.params.id).then(() => {res.status(204).end()}).catch(err => next(err))
} )

app.post("/api/persons", (req,res,next) => {
  const body = req.body
  const newPerson = new Person(body)

  Person.find({ "name":body.name }).then(personExist => {
    if(personExist[0]){next({ name:"name is already in the PhoneBook" })}
    else{
      newPerson.save().then(() => res.json(newPerson)).catch(err => next(err))
    }
  })
}
)

app.put("/api/persons/:id",(req,res,next) => {
  const body= req.body
  const person = {
    "name":body.name,
    "number":body.number
  }
  Person.findByIdAndUpdate(req.params.id,person,{ new:true, runValidators:true, context:"query" }).then(updatePers => { res.json(updatePers)}).catch(err => next(err))
})

//Listen port
app.listen(PORT, () => {console.log(`server is runing on ${PORT}`)})

//ERRORS -------------------------------------------------------------------------------------------------------------------------------------------------------------

const unknownEndPoint = (req,res) => {
  res.status(404); res.send({ error: "unknown endpoint" })
}

const handlerErrors = (error,req,res,next) => {
  if (error.name === "CastError"){
    return res.status(400).send({ error: "malformatted id" })
  }
  if(error.name==="ValidationError"){
    return res.status(400).json({ error:error.message })
  }
  if(error.name==="name is already in the PhoneBook"){
    return res.status(403).json({ error:error.name })
  }

  next(error)
}


//midlewares for errors
app.use(unknownEndPoint)
app.use(handlerErrors)
