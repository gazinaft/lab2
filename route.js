'use strict';

const getHash = () => location.hash.split('#')[1];

const checkURL = () => {
    const url = getHash();
    if (url === '') {
        textArea.value = '';
        header.value = '';
    }
    for (const id in localStorage) {
        if (id === url) {
            makeActive(id)();
        }
    }
}
window.onhashchange = checkURL;
