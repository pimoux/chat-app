import React, {useState, useEffect} from 'react';

const useFiles = (selectedUsername, socket) => {
    const [uploadedFile, setUploadedFile] = useState('');
    const [privateUploadedFile, setPrivateUploadedFile] = useState('');

    useEffect(() => {
        if (uploadedFile) {
            socket.emit('send-image',
                {url: uploadedFile.url, fileInfo: uploadedFile.fileInfo});
            setUploadedFile('');
        }
    }, [uploadedFile]);

    useEffect(() => {
        if (privateUploadedFile && selectedUsername) {
            socket.emit('send-private-image', {
                url: privateUploadedFile.url,
                fileInfo: privateUploadedFile.fileInfo,
                recipient: selectedUsername,
            });
            setPrivateUploadedFile('');
        }
    }, [privateUploadedFile, selectedUsername]);

    const onUploadFile = e => {
        if (e.target.files[0]) {
            setUploadedFile({
                url: URL.createObjectURL(e.target.files[0]),
                fileInfo: {
                    size: e.target.files[0].size,
                    name: e.target.files[0].name,
                },
            });
        }
    };

    const onPrivateUploadFile = e => {
        if (e.target.files[0]) {
            setPrivateUploadedFile({
                url: URL.createObjectURL(e.target.files[0]),
                fileInfo: {
                    size: e.target.files[0].size,
                    name: e.target.files[0].name,
                },
            });
        }
    };

    return [onUploadFile, onPrivateUploadFile]
}

export default useFiles;