const mongoose = require("mongoose")


mongoose.connect("mongodb://127.0.0.1:27017/quiz")
.then(()=>{
    console.log("Connected to Database")
})
.catch(()=>{
    console.log("Oopsie!")
})


// const SignUpSchema = new mongoose.Schema({
//     userId: {
//         type: String,
//         required: true,
//         unique: true, // Ensure uniqueness of the custom primary key
//       },
//     class:{
//         type:String,
//         required:true
//     },

//     section:{
//         type:String,
//         required:false,
//         defaultValue: null
//     },

//     roll:{
//         type:String,
//         required:true
//     },

//     school:{
//         type:String,
//         required:true
//     }
// })

const SignUpSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    unique: true
  },
  class: String,
  section: String,
  roll: String,
  school: String
});

SignUpSchema.virtual('primaryKey').get(function() {
  return this.userId;
});

// const User = mongoose.model('User', userSchema);


const user = new mongoose.model("users", SignUpSchema)
module.exports= user

