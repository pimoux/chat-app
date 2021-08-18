import {useState} from 'react';
import useFiles from '../messages/useFiles';
import useDeleteMessages from '../messages/useDeleteMessages';
import useHandleBlock from '../users/useHandleBlock';
import useSpeech from '../speech/useSpeech';
import useSendMessages from '../messages/useSendMessages';
import useSelectUsername from '../users/useSelectUsername';
import useSetupSockets from '../sockets/useSetupSockets';
import useDisconnect from '../users/useDisconnect';

const useCreatedChatContext = (location) => {
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');
    const [rooms, setRooms] = useState([]);
    const [selectedUsername, setSelectedUsername] = useState('');
    const [disconnectedUsername, setDisconnectedUsername] = useState('');
    const [messages, setMessages] = useState([]);
    const [users, setUsers] = useState([]);
    const [isSpeechActivated, setIsSpeechActivated] = useState(false);
    const [isPrivateSpeech, setIsPrivateSpeech] = useState(false);
    const [speechContent, setSpeechContent] = useState('');
    const [privateSpeechContent, setPrivateSpeechContent] = useState('');
    const [uploadedFile, setUploadedFile] = useState('');
    const [privateUploadedFile, setPrivateUploadedFile] = useState('');
    const [message, setMessage] = useState('');
    const [privateMessage, setPrivateMessage] = useState('');
    const [deleteMessage, setDeleteMessage] = useState('');

    const [socket] = useSetupSockets(
        location, setName, room, setRoom, setRooms, messages, setMessages, setUsers,
        setDisconnectedUsername,
    );
    const [handleBlock] = useHandleBlock(
        users, name, room, selectedUsername, socket
    );
    const [onSelectUsername] = useSelectUsername(
        selectedUsername, setSelectedUsername, disconnectedUsername,
    );
    const [logout] = useDisconnect();
    const [onSelectMessageToDelete, onDeleteMessage] = useDeleteMessages(
        deleteMessage, setDeleteMessage, socket,
    );
    const [publicToggleSpeech] = useSpeech(
        isSpeechActivated, setIsSpeechActivated, speechContent,
        setSpeechContent, setMessage, selectedUsername,
    );
    const [onUploadFile, onPrivateUploadFile] = useFiles(
        messages, setUploadedFile, setPrivateUploadedFile, uploadedFile,
        privateUploadedFile, selectedUsername, socket,
    );
    const [onSendMessage, onSendPrivateMessage] = useSendMessages(
        setSpeechContent, setPrivateSpeechContent, message, setMessage,
        privateMessage, setPrivateMessage, selectedUsername, socket,
    );

    // const onChangeRoom = (nextRoom) => {
    //     setRoom(nextRoom);
    //     setTimeout(() => {
    //         window.location.reload();
    //     }, 500);
    // }

    const contextValue = {
        name,
        setName,
        room,
        setRoom,
        rooms,
        setRooms,
        selectedUsername,
        setSelectedUsername,
        disconnectedUsername,
        setDisconnectedUsername,
        users,
        setUsers,
        message,
        setMessage,
        privateMessage,
        setPrivateMessage,
        deleteMessage,
        setDeleteMessage,
        uploadedFile,
        setUploadedFile,
        privateUploadedFile,
        setPrivateUploadedFile,
        messages,
        setMessages,
        isSpeechActivated,
        setIsSpeechActivated,
        isPrivateSpeech,
        setIsPrivateSpeech,
        speechContent,
        setSpeechContent,
        privateSpeechContent,
        setPrivateSpeechContent,
        onSelectUsername,
        onSendMessage,
        onSendPrivateMessage,
        handleBlock,
        onUploadFile,
        onPrivateUploadFile,
        onSelectMessageToDelete,
        onDeleteMessage,
        publicToggleSpeech,
        logout,
        //onChangeRoom
    };

    return [contextValue];
};

export default useCreatedChatContext;