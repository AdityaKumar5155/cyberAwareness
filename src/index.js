const express = require("express")
const app = express()
const path = require("path")
const bodyParser  = require('body-parser')
const collection = require("./mongodb")



const hbs = require("hbs")
app.use(express.json())
app.set("view engine", "hbs")




app.listen(3000, () =>{
    console.log("port connected")
})


app.get("/", (req,res)=>{
    res.render("signup")
})



var jsonParser = bodyParser.json()
 

var urlencodedParser = bodyParser.urlencoded({ extended: false })


app.post("/signup", urlencodedParser, async(req,res) =>{
    const data = {
        name:req.body.name,
        password:req.body.password
    }
    console.log(data);

    await(collection.insertMany([data]))

    res.render("home")
} )

app.get("/signup", (req,res)=>{
    res.render("home")
})

