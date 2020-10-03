'use strict';

const generateId = header => header.split(' ')[0] + Date.now();

const construct = id => ({
    id: id,
    header: header.value,
    text: textArea.value,
    date: Date.now(),  
});

const loadLocal = () => {
    let buffer = [];
    for (const id in localStorage) {
        if (localStorage.getItem(id) == null) continue;
        const elem = JSON.parse(localStorage.getItem(id));
        buffer.push(elem);
    }
    buffer.sort((x, y) => x.date >= y.date ? 1 : -1);
    return buffer;
}

const makeActive = id => () => {

    if (localStorage.getItem(id) == null) {
        return;
    }

    const content = JSON.parse(localStorage.getItem(id));
    const tag = document.getElementById(id);

    header.value = content.header;
    textArea.value = content.text;
    const actives = document.getElementsByClassName('active');
    if (actives.length != 0) {
        actives[0].className = 'passive';
    }
    tag.className = "active";
    location.hash = content.id;
}


const showAll = () => {
    let i = 0;
    header.value = '';
    textArea.value = '';

    const stor = loadLocal();

    for (const content of stor) {
        const item = document.createElement('div');
        if (content == null) {
            break;
        }
        const formDate = formatter.format(content.date);
        item.innerHTML = `${content.header} <br><br> ${formDate}`;
        item.className = 'passive';
        item.style.gridRowStart = +(localStorage.length - i);
        item.style.gridRowEnd = +(localStorage.length - i + 1);
        item.id = content.id;
        sidebar.prepend(item);
        item.addEventListener('click', makeActive(content.id));
        ++i;
    }
}

const refresh = () => {
    sidebar.textContent = '';
    location.hash = '';
    showAll();
}

const save = () => {
    if (getHash() !== '') {
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

const create = () => {
    const actives = document.getElementsByClassName('active');
    if (actives.length != 0) {
        actives[0].className = 'passive';
    }
    location.hash = '';
    header.value = '';
    textArea.value = '';
}
