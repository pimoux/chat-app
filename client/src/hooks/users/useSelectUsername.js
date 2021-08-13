import {useCallback, useEffect} from 'react';

const useSelectUsername = (
    selectedUsername,
    setSelectedUsername,
    disconnectedUsername
) => {

    const memoizedResetUsername = useCallback(() => {
        setSelectedUsername('');
    }, [setSelectedUsername]);

    useEffect(() => {
        selectedUsername === disconnectedUsername && memoizedResetUsername();
    }, [disconnectedUsername, selectedUsername, memoizedResetUsername]);

    const onSelectUsername = e => {
        e
            ? setSelectedUsername(e.target.textContent)
            : setSelectedUsername('');
    };

    return [onSelectUsername];
};

export default useSelectUsername;