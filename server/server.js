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

const {
    addUser,
    removeUser,
    getUser,
    getAllUsers,
    blockUser,
    unblockUser,
    getRooms
} = require('./users.js');

io.on('connection', (socket) => {
    socket.on('join', ({name, room}, callback) => {
        const {user, error} = addUser({id: socket.id, name, room});

        if (error) return callback(error);

        socket.join(user.room);

        const welcomedSentences = [
            `Un ${user.name} sauvage nous a rejoint!`,
            `Content de te voir, ${user.name}`,
            `Voici l'atterrissage d'un ${user.name} dans ce salon`,
            `${user.name} a rejoint le salon`,
            `bienvenue ${user.name}, j'espère que tu nous a apporté des spaghettis bolognaise!`,
        ];
        const text = welcomedSentences[Math.floor(Math.random() * welcomedSentences.length)];
        const date = new Date().toLocaleTimeString(['fr-FR'],
            {hour: '2-digit', minute: '2-digit'});

        io.emit('room-list', getRooms());
        io.to(user.room).emit('users', getAllUsers().filter(u => u.room === user.room));
        io.to(user.room).emit('message', {
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
        const messageSent = {
            id: uuidv4(),
            user: user.name,
            text: message,
            date: date,
            private: false,
            type: 'text',
        };
        user.acceptMessagesBy.forEach(username => {
            let id = getAllUsers().find(user => user.name === username).id;
            io.to(id).emit('message', messageSent);
        });
        callback();
    });

    socket.on('trigger-delete-message', ({id, isPrivate, recipient}) => {
        const user = getUser(socket.id);
        if (isPrivate) {
            const recipientId = getAllUsers()
            .find(user => user.name === recipient).id;
            io.to(user.id).to(recipientId).emit('delete-message', id);
        } else {
            io.to(user.room).emit('delete-message', id);
        }
    });

    socket.on('send-image', ({url, fileInfo}) => {
        const user = getUser(socket.id);
        const date = new Date().toLocaleTimeString(['fr-FR'],
            {hour: '2-digit', minute: '2-digit'});
        const image = {
            id: uuidv4(),
            user: user.name,
            url: url,
            fileInfo: fileInfo,
            date: date,
            private: false,
            type: 'image',
        };
        user.acceptMessagesBy.forEach(username => {
            let id = getAllUsers().find(user => user.name === username).id;
            io.to(id).emit('message', image);
        });
    });

    socket.on('send-private-message', ({content, recipient}) => {
        const user = getUser(socket.id);
        const senderIndex = user.acceptMessagesBy
        .findIndex(name => name === recipient);
        const recipientId = getAllUsers()
        .find(user => user.name === recipient).id;
        const date = new Date().toLocaleTimeString(
            ['fr-FR'], {hour: '2-digit', minute: '2-digit'},
        );
        senderIndex !== -1 ? io.to(recipientId).to(user.id).emit('message', {
            id: uuidv4(),
            user: user.name,
            text: content,
            date: date,
            private: true,
            recipient: recipient,
            type: 'text',
        }) : io.to(user.id).emit('message', {
            id: uuidv4(),
            user: user.name,
            text: content +
                ' (cette personne vous a bloqué, elle ne verra pas votre message)',
            date: date,
            private: true,
            recipient: recipient,
            type: 'text',
        });
    });

    socket.on('send-private-image', ({url, fileInfo, recipient}) => {
        const user = getUser(socket.id);
        const senderIndex = user.acceptMessagesBy
        .findIndex(name => name === recipient);
        const recipientId = getAllUsers()
        .find(user => user.name === recipient).id;
        const date = new Date().toLocaleTimeString(
            ['fr-FR'], {hour: '2-digit', minute: '2-digit'}
        );
        senderIndex !== -1 ? io.to(recipientId).to(user.id).emit('message', {
            id: uuidv4(),
            user: user.name,
            url: url,
            fileInfo: fileInfo,
            date: date,
            private: true,
            recipient: recipient,
            type: 'image',
        }) : io.to(user.id).emit('message', {
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

    socket.on('trigger-block', ({name, room, recipient}) => {
        blockUser(name, recipient);
        io.to(room).emit('handleBlock',
            getAllUsers().filter(user => user.room === room)
        );
    });

    socket.on('trigger-accept', ({name, room, recipient}) => {
        unblockUser(name, recipient);
        io.to(room).emit('handleBlock',
            getAllUsers().filter(user => user.room === room)
        );
    });

    socket.on('disconnect', () => {
        const user = removeUser(socket.id);
        const date = new Date().toLocaleTimeString(['fr-FR'],
            {hour: '2-digit', minute: '2-digit'});
        if (user) {
            io.emit('handle-disconnect', user.name);
            io.to(user.room).emit('users', getAllUsers().filter(u => u.room === user.room));
            io.emit('room-list', getRooms());
            io.to(user.room).emit('message', {
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