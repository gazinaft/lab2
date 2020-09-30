'use strict';

const getHash = () => location.hash.split('#')[1];

const checkURL = () => {
    const url = getHash();
    for (id in localStorage) {
        if (id === url) {
            makeActive(id);
        }
    }
}
