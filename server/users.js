const users = [];

/**
 * Add user in the list when he joined the chat
 * @param {string} id - id of the user generated by socket
 * @param {string} name - name of the user
 * @param {string} room - name of the room
 * @returns {{error: string}|{user: {acceptMessagesBy: *[], name: string, room: string, id}}}
 */
const addUser = ({id, name, room}) => {
    name = name.trim().toLowerCase();
    const existingUser = users.filter(user => user.room === room)
    .find(user => user.name === name);
    if (existingUser) {
        return {error: 'This username has already been chosen. You will be redirected to the home page.'};
    }

    const acceptMessagesBy = getAllUsers()
    .filter(user => user.room === room)
    .map(user => user.name)
    .concat([name]);
    addAcceptedUser(name, room);

    const user = {id, name, room, acceptMessagesBy};
    users.push(user);

    return {user};
};

/**
 * remove user in the list when he disconnect
 * @param {string} id - id of the user generated by socket
 * @returns {*}
 */
const removeUser = (id) => {
    const [user, index] = [
        users.find(user => user.id === id),
        users.findIndex((user) => user.id === id),
    ];

    if (index !== -1) {
        user.name ? removeAcceptedUser(user.name, user.room) : null;
        return users.splice(index, 1)[0];
    }
};

/**
 * get user with his id
 * @param {string} id - id of the user generated by socket
 * @returns {*}
 */
const getUser = (id) => {
    return users.find(user => user.id === id);
};

/**
 * get the user list
 * @returns {*[]}
 */
const getAllUsers = () => {
    return users;
};

/**
 * get all users in room
 * @param {string} room - room name
 * @returns {*[]}
 */
const getAllUsersInRoom = (room) => {
    return getAllUsers().filter(user => user.room === room);
}

/**
 * add the new user in every acceptMessagesBy list of all users to allow each
 * user to see the new user's messages.
 * @param {string} username - user name
 * @param {string} room - user room
 */
const addAcceptedUser = (username, room) => {
    getAllUsers().filter(user => user.room === room).forEach(user => {
        user.acceptMessagesBy = user.acceptMessagesBy.concat([username]);
    });
};

/**
 * remove the disconnected user in every acceptMessagesBy list of all users
 * @param {string} username - user name
 * @param room
 */
const removeAcceptedUser = (username, room) => {
    getAllUsers().filter(user => user.room === room).forEach(user => {
        let index = user.acceptMessagesBy.findIndex(user => user === username);
        if (index !== -1) {
            user.acceptMessagesBy = user.acceptMessagesBy
            .filter((u, i) => i !== index);
        }
    });
};

/**
 * block a user (remove the username in the recipient's list)
 * @param {string} username - username to remove
 * @param {string} recipient - recipient name where username will be removed
 */
const blockUser = (username, recipient) => {
    getAllUsers().find(user => user.name === recipient).acceptMessagesBy =
        getAllUsers()
        .find(user => user.name === recipient)
        .acceptMessagesBy
        .filter(name => name !== username);
};

/**
 * unblock a user (add the username removed in the recipient's list)
 * @param {string} username - username to add
 * @param {string} recipient - recipient name where username will be added
 */
const unblockUser = (username, recipient) => {
    getAllUsers()
    .find(user => user.name === recipient).acceptMessagesBy.push(username);
};

/**
 * get all the rooms
 * @returns {string|*}
 */
const getRooms = () => {
    return getAllUsers()
    .map(user => user.room)
    .reduce((acc, curr) => acc.includes(curr) ? acc : [...acc, curr], []);
};

module.exports = {
    addUser,
    removeUser,
    getUser,
    getAllUsers,
    getAllUsersInRoom,
    blockUser,
    unblockUser,
    getRooms
};