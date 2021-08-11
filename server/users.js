const users = []

/**
 * Add user in the list when he joined the chat
 * @param {string} id - id of the user generated by socket
 * @param {string} name - name of the user
 * @returns {{error: string}|{user: {acceptMessagesBy: *[], name: string, id}}}
 */
const addUser = ({ id, name }) => {
    name = name.trim().toLowerCase()
    const existingUser = users.find(user => user.name === name)
    if (existingUser) {
        return { error: 'ce nom d\'utilisateur a déjà été choisi. Vous allez être redirigé à la page d\'accueil.' }
    }

    const acceptMessagesBy = getAllUsers().
        map(user => user.name).
        concat([name])
    addAcceptedUser(name)

    const user = { id, name, acceptMessagesBy }
    users.push(user)

    return { user }
}

/**
 * remove user in the list when he disconnect
 * @param {string} id - id of the user generated by socket
 * @returns {*}
 */
const removeUser = (id) => {
    const [user, index] = [
        users.find(user => user.id === id),
        users.findIndex((user) => user.id === id)
    ]

    if (index !== -1) {
        user.name ? removeAcceptedUser(user.name) : null
        return users.splice(index, 1)[0]
    }
}

/**
 * get user with his id
 * @param {string} id - id of the user generated by socket
 * @returns {*}
 */
const getUser = (id) => {
    return users.find(user => user.id === id)
}

/**
 * get the user list
 * @returns {*[]}
 */
const getAllUsers = () => {
    return users
}

/**
 * add the new user in every acceptMessagesBy list of all users to allow each
 * user to see the new user's messages.
 * @param {string} username - user name
 */
const addAcceptedUser = username => {
    getAllUsers().forEach(user => {
        user.acceptMessagesBy = user.acceptMessagesBy.concat([username])
    })
}

/**
 * remove the disconnected user in every acceptMessagesBy list of all users
 * @param {string} username - user name
 */
const removeAcceptedUser = username => {
    getAllUsers().forEach(user => {
        let index = user.acceptMessagesBy.findIndex(user => user === username)
        if (index !== -1) {
            user.acceptMessagesBy = user.acceptMessagesBy.filter(
                (u, i) => i !== index)
        }
    })
}

/**
 * block a user (remove the username in the recipient's list)
 * @param {string} username - username to remove
 * @param {string} recipient - recipient name where username will be removed
 */
const blockUser = (username, recipient) => {
    getAllUsers().
        find(user => user.name === recipient).acceptMessagesBy = getAllUsers().
        find(user => user.name === recipient).
        acceptMessagesBy.
        filter(name => name !== username)
}

/**
 * unblock a user (add the username removed in the recipient's list)
 * @param {string} username - username to add
 * @param {string} recipient - recipient name where username will be added
 */
const unblockUser = (username, recipient) => {
    getAllUsers().
        find(user => user.name === recipient).acceptMessagesBy.push(username)
}

module.exports = {
    addUser,
    removeUser,
    getUser,
    getAllUsers,
    blockUser,
    unblockUser,
}