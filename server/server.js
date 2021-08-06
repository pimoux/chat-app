const express = require('express');
const socketio = require('socket.io');
const http = require('http');
const {v4: uuidv4} = require('uuid');

const PORT = process.env.port || 5000;
const router = require('./router');
const app = express();
const server = http.createServer(app);

corsOptions = {
    cors: true,
    origins: ['http://localhost:3000'],
};
const io = socketio(server, corsOptions);

const {addUser, removeUser, getUser, getAllUsers} = require('./users.js');

io.on('connection', (socket) => {
    socket.on('join', ({name}, callback) => {
        const {user, error} = addUser({id: socket.id, name});

        if (error) return callback(error);

        const messages = [
            `Un ${user.name} sauvage nous a rejoint!`,
            `Content de te voir, ${user.name}`,
            `Voici l'atterrissage d'un ${user.name} dans ce chat`,
            `${user.name} a rejoint le groupe`,
            `bienvenue ${user.name}, j'espère que tu nous a apporté de la pizza!`,
        ];
        const text = messages[Math.floor(Math.random() * messages.length)];
        const date = new Date().toLocaleTimeString(['fr-FR'],
            {hour: '2-digit', minute: '2-digit'});

        io.emit('users', getAllUsers());
        io.emit('message', {
            id: uuidv4(),
            user: 'God',
            text: text,
            date: date,
            private: false,
            type: 'text',
        });
    });

    socket.on('send-message', (message, callback) => {
        const user = getUser(socket.id);
        const date = new Date().toLocaleTimeString(['fr-FR'],
            {hour: '2-digit', minute: '2-digit'});
        io.emit('message', {
            id: uuidv4(),
            user: user.name,
            text: message,
            date: date,
            private: false,
            type: 'text',
        });
        callback();
    });

    socket.on('trigger-delete-message', ({id, isPrivate, recipient}) => {
        if (isPrivate) {
            const user = getUser(socket.id);
            const recipientId = getAllUsers().
                find(user => user.name === recipient).id;
            io.to(user.id).to(recipientId).emit('delete-message', id);
        } else {
            io.emit('delete-message', id);
        }
    });

    socket.on('send-image', ({url, fileInfo}) => {
        const user = getUser(socket.id);
        const date = new Date().toLocaleTimeString(['fr-FR'],
            {hour: '2-digit', minute: '2-digit'});
        io.emit('message', {
            id: uuidv4(),
            user: user.name,
            url: url,
            fileInfo: fileInfo,
            date: date,
            private: false,
            type: 'image',
        });
    });

    socket.on('send-private-message', ({content, recipient}) => {
        const user = getUser(socket.id);
        const recipientId = getAllUsers().
            find(user => user.name === recipient).id;
        const date = new Date().toLocaleTimeString(['fr-FR'],
            {hour: '2-digit', minute: '2-digit'});
        io.to(recipientId).to(user.id).emit('message', {
            id: uuidv4(),
            user: user.name,
            text: content,
            date: date,
            private: true,
            recipient: recipient,
            type: 'text',
        });
    });

    socket.on('send-private-image', ({url, fileInfo, recipient}) => {
        const user = getUser(socket.id);
        const recipientId = getAllUsers().
            find(user => user.name === recipient).id;
        const date = new Date().toLocaleTimeString(['fr-FR'],
            {hour: '2-digit', minute: '2-digit'});
        io.to(recipientId).to(user.id).emit('message', {
            id: uuidv4(),
            user: user.name,
            url: url,
            fileInfo: fileInfo,
            date: date,
            private: true,
            recipient: recipient,
            type: 'image',
        });
    });

    socket.on('disconnect', () => {
        const user = removeUser(socket.id);
        const date = new Date().toLocaleTimeString(['fr-FR'],
            {hour: '2-digit', minute: '2-digit'});
        if (user) {
            io.emit('users', getAllUsers());
            io.emit('message', {
                id: uuidv4(),
                user: 'God',
                text: `${user.name} nous a quitté :(`,
                date: date,
                private: false,
                type: 'text',
            });
        }
    });
});

app.use(router);

server.listen(PORT, () => console.log(`server started on port ${PORT}`));