const localStorageSpace = () => {
    let data = '';
    for (let key in window.localStorage) {
        if (window.localStorage.hasOwnProperty(key)) {
            data += window.localStorage[key];
        }
    }
    console.log(data ? 'Total space used: ' + ((data.length * 16) / (8 * 1024)).toFixed(2) + ' KB' : 'Empty (0 KB)');
    console.log(data ? 'Approx. space remaining: ' + (5120 - ((data.length * 16) / (8 * 1024)).toFixed(2)) + ' KB' : '5 MB');
};

export default localStorageSpace;