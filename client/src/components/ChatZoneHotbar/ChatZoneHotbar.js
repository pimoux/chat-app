import React from 'react';
import './ChatZoneHotbar.css';
import {
    faArrowLeft,
    faArrowRight,
} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {openRoomList, openUserList} from '../../utils/sidebars';

const ChatZoneHotbar = () => {

    return (
        <div className="chat-zone-hotbar">
            <div className="hotbar-arrow-right">
                <FontAwesomeIcon icon={faArrowRight}
                                 className="arrow-right mobile big-font"
                                 onClick={() => openRoomList()}/>
            </div>
            <p className="chat-zone-hotbar-title">ROOM_NAME</p>
            <div className="hotbar-arrow-left">
                <div className="hotbar-arrow-left">
                    <FontAwesomeIcon icon={faArrowLeft}
                                     className="arrow-left mobile big-font"
                                     onClick={() => openUserList()}/>
                </div>
            </div>
        </div>
    );
};

export default ChatZoneHotbar;