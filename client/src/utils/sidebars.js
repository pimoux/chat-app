function openRoomList() {
    document.querySelector(".room-list-item").style.width = "30vw";
}

function closeRoomList() {
    document.querySelector(".room-list-item").style.width = "0";
}

function openUserList() {
    document.querySelector(".user-list-item").style.width = "30vw";
}

function closeUserList() {
    document.querySelector(".user-list-item").style.width = "0";
}

module.exports = {openRoomList, closeRoomList, openUserList, closeUserList};