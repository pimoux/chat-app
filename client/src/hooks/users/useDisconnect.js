import resize from '../../utils/resizeEvent';

const useDisconnect = () => {
    const logout = () => {
        document.title = 'Celestial Chat App';
        window.removeEventListener('resize', resize, true);
    }
    return [logout];
}

export default useDisconnect;