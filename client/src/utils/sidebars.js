/**
 * open the room list sidebar
 */
function openRoomList() {
    document.querySelector(".room-list-item").style.width = "30vw";
}

/**
 * close the room list sidebar
 */
function closeRoomList() {
    document.querySelector(".room-list-item").style.width = "0";
}

/**
 * open the user list sidebar
 */
function openUserList() {
    document.querySelector(".user-list-item").style.width = "30vw";
}

/**
 * close the user list sidebar
 */
function closeUserList() {
    document.querySelector(".user-list-item").style.width = "0";
}

module.exports = {openRoomList, closeRoomList, openUserList, closeUserList};