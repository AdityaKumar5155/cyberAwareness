const express = require("express")
const app = express()
const bodyParser  = require('body-parser')
const user = require("./mongodb")
const socketIO = require('socket.io')
const http = require('http')

let server = http.createServer(app)
let io = socketIO(server)

app.set("view engine", "ejs")
app.use(express.static('public'))
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
    }).catch((err)=>{
        console.log("oohooW!");
    });
})


server.listen(4444, () =>{
    console.log("App listening on port 4444")
})