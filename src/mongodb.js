

const mongoose = require("mongoose")


mongoose.connect("mongodb://127.0.0.1:27017")

.then(()=>{
    console.log("Database Connected")
})

.catch(()=>{
    console.log("Failed to connect")
})


const logInSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },

    class:{
        type:Number,
        required:true
    },

    section:{
        type:String,
        required:false
    },
    roll:{
        type:Number,
        required:true
    },
    school:{
        type:String,
        required:true
    },
})

const  collection = new mongoose.model("Registration", logInSchema)
module.exports= collection






