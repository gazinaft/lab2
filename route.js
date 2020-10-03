'use strict';

const getHash = () => location.hash.split('#')[1];

const checkURL = () => {
    const url = getHash();
    if (url === '') {
        textArea.value = '';
        header.value = '';
    }
    for (const cont of loadLocal()) {
        if (cont.id === url) {
            makeActive(cont.id)();
        }
    }
}
window.onhashchange = checkURL;