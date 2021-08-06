const users = [];

const addUser = ({id, name}) => {
    name = name.trim().toLowerCase();
    const existingUser = users.find(user => user.name === name);
    if (existingUser) {
        return {error: "ce nom d'utilisateur a déjà été choisi. Vous allez être redirigé à la page d'accueil."}
    }

    const user = {id, name};
    users.push(user);

    return {user};
}

const removeUser = (id) => {
    const index = users.findIndex((user) => user.id === id);

    if (index !== -1) return users.splice(index, 1)[0];
}

const getUser = (id) => {
    return users.find(user => user.id === id)
}

const getAllUsers = () => {
    return users;
}

const getAllUsernames = () => {
    return users.map(user => user.name);
}

module.exports = {addUser, removeUser, getUser, getAllUsers, getAllUsernames}