const express = require("express")
const app = express()
const bodyParser  = require('body-parser')
const user = require("./mongodb")
const socketIO = require('socket.io')
const http = require('http')

app.set("view engine", "ejs")


app.get("/", (req,res)=>{
    res.render("login.ejs")
})
 

let urlencodedParser = bodyParser.urlencoded({ extended: false })


app.post("/signup", urlencodedParser, async(req,res) =>{
    const data = {
        userId:req.body.name,
        class:req.body.class,
        section:req.body.section,
        roll:req.body.roll,
        school:req.body.school
    }

    await user.create(data).then((response)=>{
        console.log("Woohoo!");
    }).catch((err)=>{console.log("oohooW!")});
})


app.listen(4444, () =>{
    console.log("App listening on port 4444")
})