const express = require('express');
const socketio = require('socket.io');
const http = require('http');

const PORT = process.env.port || 5000;
const router = require('./router');
const app = express();
const server = http.createServer(app);

corsOptions = {
    cors: true,
    origins: ["http://localhost:3000"],
}
const io = socketio(server, corsOptions);

const {addUser, removeUser, getUser, getAllUsers} = require('./users.js');

io.on('connection', (socket) => {
    socket.on('join', ({name}, callback) => {
        const {user, error} = addUser({id: socket.id, name});

        if(error) return callback(error);

        const messages = [
            `Un ${user.name} sauvage nous a rejoint!`,
            `Content de te voir, ${user.name}`,
            `Voici l'atterrissage d'un ${user.name} dans ce chat`,
            `${user.name} a rejoint le groupe`,
            `bienvenue ${user.name}, j'espère que tu nous a apporté de la pizza!`
        ]
        const text = messages[Math.floor(Math.random() * messages.length)];
        const date = new Date().toLocaleTimeString(['fr-FR'], {hour: '2-digit', minute: '2-digit'});

        io.emit('users', getAllUsers());
        io.emit('message', {user: 'God', text: text, date: date})
    });

    socket.on('send-message', (message, callback) => {
        const user = getUser(socket.id);
        const date = new Date().toLocaleTimeString(['fr-FR'], {hour: '2-digit', minute: '2-digit'});
        io.emit('message', {user: user.name, text: message, date: date});
        callback();
    })

    socket.on('disconnect', () => {
        const user = removeUser(socket.id);
        const date = new Date().toLocaleTimeString(['fr-FR'], {hour: '2-digit', minute: '2-digit'});
        if (user) {
            io.emit('users', getAllUsers());
            io.emit('message', {user: 'God', text: `${user.name} nous a quitté :(`, date: date})
        }
    })
})


app.use(router);

server.listen(PORT, () => console.log(`server started on port ${PORT}`))