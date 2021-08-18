import {useCallback, useEffect} from 'react';

const useFiles = (
    messages,
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
        document.querySelector('#send-image').value = "";
    }, [socket, setUploadedFile, uploadedFile]);

    const memoizedPrivateUploadFile = useCallback(() => {
        socket.emit('send-private-image', {
            url: privateUploadedFile.url,
            fileInfo: privateUploadedFile.fileInfo,
            recipient: selectedUsername,
        });
        setPrivateUploadedFile('');
        document.querySelector('#send-private-image').value = "";
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
            let reader = new FileReader();
            reader.addEventListener('load', () => {
                setUploadedFile({
                    url: reader.result,
                    fileInfo: {
                        size: e.target.files[0].size,
                        name: e.target.files[0].name,
                    },
                });
            })
            reader.readAsDataURL(e.target.files[0]);
        }
    };

    const onPrivateUploadFile = e => {
        if (e.target.files[0]) {
            let reader = new FileReader();
            reader.addEventListener('load', () => {
                setPrivateUploadedFile({
                    url: reader.result,
                    fileInfo: {
                        size: e.target.files[0].size,
                        name: e.target.files[0].name,
                    },
                });
            })
            reader.readAsDataURL(e.target.files[0]);
        }
    };

    return [onUploadFile, onPrivateUploadFile];
};

export default useFiles;