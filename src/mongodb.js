const mongoose = require("mongoose")
mongoose.connect("mongodb://127.0.0.1:27017/usersdb")
.then(()=>{
    console.log("mongodb connected")
})

.catch(()=>{
    console.log("Failed to connect")
})


const logInSchema = new mongoose.Schema({
    name:{
        type:String,
        required:false
    },

    password:{
        type:String,
        required:false
    },
})

const  collection = new mongoose.model("Collection1", logInSchema)
module.exports= collection


