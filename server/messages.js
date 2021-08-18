let messagesHistory = [];
const HISTORY = 100;

/**
 * Add a message in the history
 * @param {object} message - message to add to the history
 */
const addMessageToHistory = (message) => {
    messagesHistory.push(message);
    messagesHistory.length > HISTORY && messagesHistory.shift();
}

/**
 * Remove a message in the history
 * @param {string} id - id of the message
 */
const removeMessageFromHistory = (id) => {
    messagesHistory.forEach((message, i) => {
        if (message.id === id) {
            messagesHistory.splice(i, 1);
        }
    })
}

module.exports = {
    addMessageToHistory,
    removeMessageFromHistory,
    messagesHistory
}