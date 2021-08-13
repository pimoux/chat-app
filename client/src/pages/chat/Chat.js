import RoomListItem from '../../components/RoomListItem/RoomListItem';
import UserListItem from '../../components/UserListItem/UserListItem';
import ChatZone from '../../components/ChatZone/ChatZone';
import './Chat.css';
import ChatContext from '../../context/ChatContext';
import useCreatedChatContext from '../../hooks/createdContext/useCreatedChatContext';

const Chat = ({location}) => {

    const [contextValue] = useCreatedChatContext(location);

    return (
        <ChatContext.Provider value={contextValue}>
            <div className="chat">
                <RoomListItem/>
                <ChatZone/>
                <UserListItem/>
            </div>
        </ChatContext.Provider>
    );
};

export default Chat;