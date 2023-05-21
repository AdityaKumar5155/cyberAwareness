





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




    
    collection.find({name:req.body.name})
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

