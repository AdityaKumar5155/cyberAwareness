const mongoose = require('mongoose');
let db;
let users;
async function connectToDB() {
    db = await mongoose.connect('mongodb://127.0.0.1:27017/quiz')
    console.log('connected to database')
    const Schema = new mongoose.Schema({
        name: String,
        class: String,
        section: String,
        roll: Number,
        school: String
      });
    users = await mongoose.model('users', Schema)
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
app.set('socketio', io);
let cookieParser = require('cookie-parser');
app.use(cookieParser());

let login = 0;



app.get('/', (req,res) => {
    if (login == 0){
        res.redirect('/login');
    }
    else{
        res.send("YOU ARE LOGGED IN!");
    }
})
app.get('/login', (req, res) => {
    res.render('login.ejs')
})
// let res;
app.post('/submitted', (req, res) => {
    // res = res;
    let io = req.app.get('socketio');
    io.emit('hi!');
    res.render('response.ejs')
    // console.log(' redirect to /submitted')
    // console.log( {name : res.body.name})
})

// let socket = io.app.get('socket');
// console.log(socket);

io.on('connection', (socket) => {
    console.log('connection successful');
    socket.on('submitted', (data) => {
        console.log(data);
        async function createUser(data){
            await users.create(data);
            console.log('Entry created successfully');
        }
        createUser(data);
    })
})

server.listen(4444)