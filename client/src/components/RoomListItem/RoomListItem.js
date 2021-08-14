import React, {useContext} from 'react';
import './RoomListItem.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faArrowLeft} from '@fortawesome/free-solid-svg-icons';
import {closeRoomList} from '../../utils/sidebars';
import ChatContext from '../../context/ChatContext';

const RoomListItem = () => {
    const { rooms } = useContext(ChatContext);
    return (
        <div className="room-list-item">
            <div className="arrow-left-container mobile">
                <FontAwesomeIcon icon={faArrowLeft} className="big-font"
                                 onClick={() => closeRoomList()}/>
                <p className="room-title">Rooms</p>
            </div>
            <div className="desktop">
                <p className="room-title">Rooms</p>
            </div>
            {rooms.map((room, index) => {
                return (<p key={index}>{room}</p>)
            })}
        </div>
    );
};

export default RoomListItem;