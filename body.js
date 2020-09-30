'use strict';

const generateId = header => header.split(' ')[0] + Date.now();


const construct = id => ({
    id: id,
    header: header.value,
    text: textArea.innerHTML,
    date: formatter.format(Date.now()),  
});


const showAll = () => {
    let i = 0;
    header.value = '';
    textArea.innerHTML = '';
    for (const id in localStorage) {
        const item = document.createElement('div');
        const content = JSON.parse(localStorage.getItem(id));

        item.innerHTML = `${content.header} <br><br> ${content.date}`;
        item.className = 'passive';
        item.style.gridRowStart = +(localStorage.length - i - 1);
        item.style.gridRowEnd = +(localStorage.length - i);
        item.addEventListener('click', makeActive(id));
        item.id = content.id;
        sidebar.prepend(item);
        ++i;
    }
}


const makeActive = id => {
    const content = JSON.parse(localStorage.getItem(id));
    const tag = document.getElementById(id);

    header.value = content.header;
    textArea.innerHTML = content.text;
    const actives = document.getElementsByClassName('active');
    if (actives.length != 0) {
        actives[0].className = 'passive';
    }
    tag.className = "active";
    location.hash = content.id;
}

const refresh = () => {
    for (const child in sidebar.children) {
        sidebar.removeChild(child);
    }
    showAll();
}

const save = () => {
    if (getHash() != '') {
        localStorage.removeItem(getHash());
    }
    const item = construct(generateId(header.value));
    localStorage.setItem(item.id, JSON.stringify(item));
    refresh();
}

const delet = () => {
    localStorage.removeItem(getHash());
    refresh();
}
