const mongoose = require("mongoose")


mongoose.connect("mongodb+srv://cyberKids:adisatpriya@cluster0.jeolobf.mongodb.net/quiz?retryWrites=true&w=majority")
.then(()=>{
    console.log("Connected to Database")
})
.catch(()=>{
    console.log("Oopsie!")
})

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

const user = new mongoose.model("users", SignUpSchema)
module.exports= user

