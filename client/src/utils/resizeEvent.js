import {closeRoomList, closeUserList} from './sidebars';

let cooldown;

/**
 * manage responsive across resize event listener
 * @param e - window event
 */
const resize = (e) => {
    clearTimeout(cooldown);
    cooldown = setTimeout(() => {
        if (e.currentTarget.innerWidth >= 640) {
            document.querySelector('.room-list-item').style.width = '12.5vw';
            document.querySelector('.user-list-item').style.width = '12.5vw';
        } else if (e.currentTarget.innerWidth < 640 &&
            ((document.querySelector('.room-list-item').style.width ===
                '12.5vw') ||
                document.querySelector('.user-list-item').style.width ===
                '12.5vw')) {
            closeUserList();
            closeRoomList();
        }
    }, 200);
};

export default resize;