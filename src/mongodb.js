const mongoose = require("mongoose")


mongoose.connect("mongodb://127.0.0.1:27017/quiz")
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
  school: String,
  password: String
});

SignUpSchema.virtual('primaryKey').get(function() {
  return this.userId;
});

const questionSchema = new mongoose.Schema({
  quesId: {
    type: String,
    required: true,
    unique: true
  },
  ques: String,
  optionA: String,
  optionB: String,
  optionC: String,
  optionD: String,
  answer: String
})

questionSchema.virtual('primaryKey').get(function() {
  return this.quesId;
});

const user = new mongoose.model("users", SignUpSchema)

const questions = new mongoose.model("questions", questionSchema)
module.exports= {user,questions}

