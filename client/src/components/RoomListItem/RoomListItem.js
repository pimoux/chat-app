import React, {useContext} from 'react';
import './RoomListItem.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faArrowLeft} from '@fortawesome/free-solid-svg-icons';
import {closeRoomList} from '../../utils/sidebars';
import ChatContext from '../../context/ChatContext';

const RoomListItem = () => {
    const {rooms, room} = useContext(ChatContext);
    return (
        <div className="room-list-item">
            <div className="arrow-left-container mobile">
                <FontAwesomeIcon icon={faArrowLeft} className="big-font"
                                 onClick={() => closeRoomList()}/>
                <p className="room-title underline">Room list</p>
            </div>
            <div className="desktop">
                <p className="room-title underline">Room list</p>
            </div>
            {rooms.map((roomName, index) => {
                return roomName === room ?
                    (<p className="underline" key={index}>{roomName}</p>) :
                    (<p key={index} onClick={() => {
                    }}>{roomName}</p>);
            })}
        </div>
    );
};

export default RoomListItem;