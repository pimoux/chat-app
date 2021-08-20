const express = require('express');
const socketio = require('socket.io');
const http = require('http');
const cors = require('cors');
const {v4: uuidv4} = require('uuid');

const PORT = process.env.PORT || 5000;
const router = require('./router');
const app = express();
const server = http.createServer(app);

corsOptions = {
    cors: true,
    origins: ['http://localhost:3000'],
};
const io = socketio(server, corsOptions);

app.use(router);
app.use(cors());

const {
    addUser,
    removeUser,
    getUser,
    getAllUsers,
    getAllUsersInRoom,
    blockUser,
    unblockUser,
    getRooms,
} = require('./users.js');
const {
    addMessageToHistory,
    removeMessageFromHistory,
    messagesHistory
} = require('./messages.js');

io.on('connection', (socket) => {

    socket.on('join', ({name, room}, callback) => {
        const {user, error} = addUser({id: socket.id, name, room});

        if (error) return callback(error);

        socket.join(user.room);
        socket.emit('history',
            messagesHistory
            .filter(message => message.room === room)
            .filter(message => {
                    let condition = true;
                    if (message.private) {
                        condition = condition &&
                            (message.recipient === name || message.user === name)
                    }
                    return condition;
            })
        );

        const welcomedSentences = [
            `A wild ${user.name} joined us!`,
            `Happy to see you here, ${user.name}`,
            `Here is the landing of a ${user.name} in this room!`,
            `${user.name} joined the room`,
            `Hi ${user.name}, I hope you brought us hamburgers and fries !`,
        ];
        const text = welcomedSentences[Math.floor(
            Math.random() * welcomedSentences.length)];
        const date = new Date().toLocaleTimeString(['en-EN'],
            {hour: '2-digit', minute: '2-digit'});
        const welcomedMessage = {
            id: uuidv4(),
            user: 'God',
            room: room,
            text: text,
            date: date,
            private: false,
            type: 'text',
        }
        io.emit('room-list', getRooms());
        io.to(user.room)
        .emit('users', getAllUsersInRoom(user.room));
        io.to(user.room).emit('message', welcomedMessage);
    });

    socket.on('send-message', (message, callback) => {
        const user = getUser(socket.id);
        const date = new Date().toLocaleTimeString(['en-EN'],
            {hour: '2-digit', minute: '2-digit'});
        const messageSent = {
            id: uuidv4(),
            user: user.name,
            room: user.room,
            text: message,
            date: date,
            private: false,
            type: 'text',
        };
        addMessageToHistory(messageSent);
        user.acceptMessagesBy.forEach(username => {
            let id = getAllUsers().find(user => user.name === username).id;
            io.to(id).emit('message', messageSent);
        });
        callback();
    });

    socket.on('send-private-message', ({content, recipient}) => {
        const user = getUser(socket.id);
        const senderIndex = user.acceptMessagesBy.findIndex(
            name => name === recipient
        );
        const recipientId = getAllUsers()
        .find(user => user.name === recipient).id;
        const date = new Date().toLocaleTimeString(
            ['en-EN'], {hour: '2-digit', minute: '2-digit'},
        );
        const privateMessage = {
            id: uuidv4(),
            user: user.name,
            room: user.room,
            text: senderIndex !== -1 ?
                content :
                `${content} (this user has blocked you, he will not see your message)`,
            date: date,
            private: true,
            recipient: recipient,
            type: 'text',
        }
        addMessageToHistory(privateMessage);
        senderIndex !== -1 ?
            io.to(recipientId).to(user.id).emit('message', privateMessage) :
            io.to(user.id).emit('message', privateMessage);
    });

    socket.on('send-image', ({url, fileInfo}) => {
        const user = getUser(socket.id);
        const date = new Date().toLocaleTimeString(['en-EN'],
            {hour: '2-digit', minute: '2-digit'});
        const image = {
            id: uuidv4(),
            user: user.name,
            room: user.room,
            url: url,
            fileInfo: fileInfo,
            date: date,
            private: false,
            type: 'image',
        };
        addMessageToHistory(image);
        user.acceptMessagesBy.forEach(username => {
            let id = getAllUsers().find(user => user.name === username).id;
            io.to(id).emit('message', image);
        });
    });

    socket.on('send-private-image', ({url, fileInfo, recipient}) => {
        const user = getUser(socket.id);
        const senderIndex = user.acceptMessagesBy.findIndex(
            name => name === recipient);
        const recipientId = getAllUsers().
            find(user => user.name === recipient).id;
        const date = new Date().toLocaleTimeString(
            ['en-EN'], {hour: '2-digit', minute: '2-digit'},
        );
        const privateImage = {
            id: uuidv4(),
            user: user.name,
            room: user.room,
            url: url,
            fileInfo: fileInfo,
            date: date,
            private: true,
            recipient: recipient,
            type: 'image',
        }
        addMessageToHistory(privateImage);
        senderIndex !== -1 ?
            io.to(recipientId).to(user.id).emit('message', privateImage) :
            io.to(user.id).emit('message', privateImage);
    });

    socket.on('trigger-delete-message', (id) => {
        const user = getUser(socket.id);
        io.to(user.room).emit('delete-message', id);
        removeMessageFromHistory(id);
    });

    socket.on('trigger-block', ({name, room, recipient}) => {
        blockUser(name, recipient);
        io.to(room).emit('handleBlock', getAllUsersInRoom(room));
    });

    socket.on('trigger-accept', ({name, room, recipient}) => {
        unblockUser(name, recipient);
        io.to(room).emit('handleBlock', getAllUsersInRoom(room));
    });

    socket.on('disconnect', () => {
        const user = removeUser(socket.id);
        const date = new Date().toLocaleTimeString(['en-EN'],
            {hour: '2-digit', minute: '2-digit'});
        if (user) {
            const message = {
                id: uuidv4(),
                user: 'God',
                room: user.room,
                text: `${user.name} left the room :(`,
                date: date,
                private: false,
                type: 'text',
            }
            io.emit('handle-disconnect', user.name);
            io.to(user.room)
            .emit('users', getAllUsersInRoom(user.room));
            io.emit('room-list', getRooms());
            io.to(user.room).emit('message', message);
        }
    });
});

server.listen(process.env.PORT, () => console.log(`server started on port ${PORT}`));