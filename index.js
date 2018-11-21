const express = require('express')

const bodyParser = require('body-parser')
const { User } = require('./sequelize')
const app = express()

app.use(bodyParser.json())

// API ENDPOINTS
// create a user
var server = require('http').Server(app);
var io = require('socket.io')(server)

io.on('connection', function(client) {  
    console.log('Client connected...');
});


app.post('/api/users', (req, res) => {
    User.create(req.body)
        .then(user =>{
            

           
            
            io.emit('message', user);
  
            res.json(user)})
})
// get all users
app.get('/api/users', (req, res) => {
    User.findAll().then(users => res.json(users))
})
app.get('*', function (req, res) {
    
   
    res.sendFile(__dirname + '/index.html');
  });
const port = 3000

server.listen(port, () => {
    console.log(`Running on http://localhost:${port}`)
})