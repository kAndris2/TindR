const app = require('express')();
const http = require('http').createServer(app);
const fetch = require("node-fetch");
const axios = require('axios');
const PORT = 7777;
require('dotenv').config()

var io = require('socket.io')(http, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"]
}});

var USERCHANNELS = '';

async function loadUsers(){
    await axios.get(process.env.APP_IP+'/api/users')
    
    .then(res =>{
       USERCHANNELS = res.data
    })
}

var STATIC_CHANNELS = [
    {
        name: 'Global chat',
        participants: 0,
        id: 1,
        sockets: []
    }, 
    {
        name: 'Funny',
        participants: 0,
        id: 2,
        sockets: []
    }
];

//set header for cors mainly for get channels endpoint
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
})


http.listen(PORT, async () => {
    await loadUsers();
    
    for (let i = 0 ; i < USERCHANNELS.length; i++){
        USERCHANNELS[i].sockets = [];
        USERCHANNELS[i].participants = 0;
    }
    console.log(`listening on *:${PORT}`);
});

io.on('connection', (socket) => { // socket object may be used to send specific messages to the new connected client
    console.log('new client connected');
    socket.emit('connection', null);
    socket.on('channel-join', id => {
        console.log('channel join', id);
        USERCHANNELS.forEach(c => {
            if (c.id === id) {
                if (c.sockets.indexOf(socket.id) == (-1)) {
                    c.sockets.push(socket.id);
                    c.participants++;
                    io.emit('channel', c);
                }
            } else {
                let index = c.sockets.indexOf(socket.id);
                if (index != (-1)) {
                    c.sockets.splice(index, 1);
                    c.participants--;
                    io.emit('channel', c);
                }
            }
        });

        return id;
    });
    socket.on('send-message', message => {
        io.emit('message', message);
    });

    socket.on('disconnect', () => {
        USERCHANNELS.forEach(c => {
            let index = c.sockets.indexOf(socket.id);
            if (index != (-1)) {
                c.sockets.splice(index, 1);
                c.participants--;
                io.emit('channel', c);
            }
        });
    });

});



app.get('/getChannels', (req, res) => {
    res.json({
        channels: USERCHANNELS
    })
});