const express = require("express")
const app = express()
const session = require("express-session")
const MongoDBSession = require("connect-mongodb-session")(session)
const {user,questions} = require("./mongodb")
const store = new MongoDBSession({
    uri: "mongodb://127.0.0.1:27017/quiz",
    collection: "sessions"
})

app.use(session({
    secret: "AdiSatPriya",
    resave: false,
    saveUninitialized: false,
    store: store
}))

app.set("view engine", "ejs")
app.use(express.static('public'))
const isAuth = (req,res,next) => {
    if (req.session.isAuth==true) {
        next()
    }
    else{
        res.redirect('/login');
    }
}


app.get("/", async (req,res)=>{
    res.render("landing.ejs")
})
 
app.get("/dashboard", isAuth ,async(req,res)=>{
    let question = await questions.findOne({quesId:"1001"})
    let quesId = question['quesId']
    let ques = question['ques']
    let optionA = question['optionA']
    let optionB = question['optionB']
    let optionC = question['optionC']
    let optionD = question['optionD']
    res.render("dashboard.ejs", {quesId: quesId, ques:ques, optionA:optionA,optionB:optionB,optionC:optionC,optionD:optionD})
})
app.use(express.urlencoded({extended: true}))

app.get('/signup',(req,res)=>{
    res.render("signup.ejs")
})
let loginName;
let loginPass;
app.post("/signup", async(req,res) =>{
    const data = {
        userId:req.body.name,
        class:req.body.class,
        section:req.body.section,
        roll:req.body.roll,
        school:req.body.school,
        password:req.body.name
    }
    loginName = req.body.name;
    loginPass = req.body.roll;
    await user.create(data).then((response)=>{
        console.log("Woohoo!");
        res.redirect('/credential')
    }).catch((err)=>{
        console.log("oohooW!");
        res.redirect('/signup')
    });

})

app.get("/credential", async(req,res) =>{
    res.render("credential.ejs", {loginName:loginName, loginPass:loginPass})
})

app.get("/login",(req,res)=>{
    res.render('login.ejs')
})
app.post("/login", async(req,res)=>{
    const isUser = await user.findOne({userId:req.body.name, password:req.body.name})
    if (!isUser)
        res.redirect('/signup')
    else{
        req.session.isAuth = true
        res.redirect('/dashboard')
    }
        
})
app.get("/logout",(req,res)=>{
    req.session.destroy()
    res.redirect('/login')
})

app.post("/check", async(req,res)=>{
    let answer = req.body.option
    let quesId = req.body.quesId
    let question = await questions.findOne({quesId:quesId})
    console.log(question['optionA'])
    let correctAnswer = question['answer']
    console.log(answer,correctAnswer)
    if (answer==correctAnswer) {
        console.log("YOU DID IT!")
    }
    else{
        console.log("YOU CAN DO BETTER")
    }
    res.redirect('/dashboard')
})

app.listen(443, () =>{
    console.log("App listening on port 443")
})