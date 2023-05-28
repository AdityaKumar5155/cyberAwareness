





const express = require("express")
const app = express()
const path = require("path")
const bodyParser  = require('body-parser')
const collection = require("./mongodb")

app.use(express.static('public'))

const hbs = require("ejs")
app.use(express.json())
app.set("view engine", "ejs")






app.listen(5050, () =>{
    console.log("Server Connected")
    console.log("Waiting for input.")
})


app.get("/", (req,res)=>{
    res.render("registration")
})



//var jsonParser = bodyParser.json() 

let urlencodedParser = bodyParser.urlencoded({ extended: false })


app.post("/registration", urlencodedParser, async(req,res) =>{
    const data = {
        name:req.body.name,
        class:req.body.class,
        section:req.body.section,
        roll:req.body.roll,
        school:req.body.school
    }
    console.log(data);




    
    collection.find({name:req.body.name, class:req.body.class,section:req.body.section,roll:req.body.roll,school:req.body.school})
    .then(async function(document) {
        console.log("I'm here")
       if(document.length==1){
        res.render("user_already");
       }

       else{

       await(collection.create(data))

        res.render("home")}

       
      // Do something with the found documents
    })
    .catch(error => {
      console.error(error);
      // Handle the error
    });



})
// console.log(isRegistered)
   
    
    
//     if(isRegistered==1){
//         res.render("user_already",{given:req.body.name})
//     }

//     else{


       
    






   
// } )

app.get("/signup", (req,res)=>{
    res.render("home")
})









