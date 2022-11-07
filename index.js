const express = require("express")
const morgan= require("morgan")
const cors = require("cors")

const app = express()
const PORT = process.env.PORT || 3001
let persons = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

//token
morgan.token("content", (req) => JSON.stringify(req.body))


//Middlewares
app.use(express.static('build'))
app.use(cors())
app.use(express.json())
app.use(morgan(":method :url :status :res[content-length] - :response-time ms :content"))



//handles
app.get("/", (req, res) =>{  
    res.send('<h1>Hello World!</h1>')
} )

app.get("/api/persons", (req, res) =>{  
    res.json(persons)
} )

app.get("/info", (req, res) =>{  
    res.send( `<div><p> Phonebook has info for ${persons.length} people </p> <p> ${Date()} </p>    </div>`  )
} )

app.get("/api/persons/:id", (req, res) =>{ 
    const id = Number(req.params.id)
    const person = persons.find(el=> el.id === id)
    if(!person){
        return res.status(404).end()
    }
    res.json(person)
} )


app.delete("/api/persons/:id", (req,res) =>{
  const id = Number(req.params.id)
  persons = persons.filter(el=> el.id !== id)
  res.status(204).end()
} )

app.post("/api/persons", (req,res) => {
  const newPerson = req.body

  if(!newPerson.name || !newPerson.number){
    return res.status(400).send({ error: 'The name or number is missing' })
  }
  if(persons.find((el) => el.name===newPerson.name)){
      return res.status(400).send({ error: 'name must be unique' })
  }


  newPerson.id= Math.floor(Math.random() * 400) 
  persons = persons.concat(newPerson)

  res.end()


}
)

app.listen(PORT, () => {console.log(`server is runing on ${PORT}`)})



