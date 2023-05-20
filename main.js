const mongoose = require('mongoose');
let db;
let users;
async function connectToDB() {
    db = await mongoose.connect('mongodb+srv://cyberKids:adisatpriya@cluster0.jeolobf.mongodb.net/quiz?retryWrites=true&w=majority');
    console.log('connected to database')
    const Schema = new mongoose.Schema({
        name: String,
        class: String,
        section: String,
        roll: Number,
        school: String
      });
    users = await mongoose.model('users', Schema);
    console.log('models connected')
}
connectToDB();

const express = require('express')
const socketIO = require('socket.io')
const http = require('http')
let app = express()
let server = http.createServer(app)
let io = socketIO(server)
app.use(express.static('public'))
app.set('view-engine', 'ejs')
app.get('/', (req,res) => {
    res.render('index.ejs')
})
io.on('connection', (socket) => {
    console.log('connection successful');
    socket.on('submitted', (data) => {
        console.log(data);
        users.create(data);
        console.log('   Entry created successfully');
    })
})
app.post('/submitted', (req, res) => {
    console.log("Submitted successfully")
    res.render('response.ejs')
    console.log(' redirect to /submitted')
    // console.log( {name : res.body.name})
})
app.get('/submitted', (req, res) => {
    res.send("HELLO")
})

server.listen(4444)