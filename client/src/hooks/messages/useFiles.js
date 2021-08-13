import {useCallback, useEffect} from 'react';

const useFiles = (
    setUploadedFile,
    setPrivateUploadedFile,
    uploadedFile,
    privateUploadedFile,
    selectedUsername,
    socket,
) => {

    const memoizedUploadFile = useCallback(() => {
        socket.emit('send-image',
            {url: uploadedFile.url, fileInfo: uploadedFile.fileInfo});
        setUploadedFile('');
    }, [socket, setUploadedFile, uploadedFile]);

    const memoizedPrivateUploadFile = useCallback(() => {
        socket.emit('send-private-image', {
            url: privateUploadedFile.url,
            fileInfo: privateUploadedFile.fileInfo,
            recipient: selectedUsername,
        });
        setPrivateUploadedFile('');
    }, [socket, setPrivateUploadedFile, privateUploadedFile, selectedUsername]);

    useEffect(() => {
        if (uploadedFile) {
            memoizedUploadFile();
        }
    }, [uploadedFile, memoizedUploadFile]);

    useEffect(() => {
        if (privateUploadedFile && selectedUsername) {
            memoizedPrivateUploadFile();
        }
    }, [privateUploadedFile, selectedUsername, memoizedPrivateUploadFile]);

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

    return [onUploadFile, onPrivateUploadFile];
};

export default useFiles;