const express = require("express")
const app = express()
const bodyParser  = require('body-parser')
const user = require("./mongodb")
const socketIO = require('socket.io')
const http = require('http')

// app.use(express.json())
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
    console.log(data);

    await user.create(data).then((response)=>{
        console.log(response);
    }).catch((err)=>{console.log(err)});


    
    // user.find({_id:req.body.name, school:req.body.school})
    // .then(async function(document) {
    //     console.log("I'm here")
    //     if(document.length===1){
    //         res.render("index.ejs");
    //     }

    //     else{
    //         await(user.create(data).catch(error => {console.log(error)}))
    //         res.render("index.ejs")
    //     }
    // })
    // .catch(error => {
    //   console.error(error);
    // });



})


app.listen(4444, () =>{
    console.log("App listening on port 4444")
})