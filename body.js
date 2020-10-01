'use strict';

const generateId = header => header.split(' ')[0] + Date.now();


const construct = id => ({
    id: id,
    header: header.value,
    text: textArea.value,
    date: formatter.format(Date.now()),  
});



const makeActive = id => {

    console.log('seredina');

    if (localStorage.getItem(id) == null) {
        return;
    }
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


const showAll = () => {
    let i = 0;
    header.value = '';
    textArea.innerHTML = '';
    for (const id in localStorage) {
        const item = document.createElement('div');
        console.log(id);
        console.log(localStorage.getItem(id));
        const content = JSON.parse(localStorage.getItem(id));
        if (content == null) {
            break;
        }
        item.innerHTML = `${content.header} <br><br> ${content.date}`;
        item.className = 'passive';
        item.style.gridRowStart = +(localStorage.length - i - 1);
        item.style.gridRowEnd = +(localStorage.length - i);
        item.id = content.id;
        sidebar.prepend(item);
        console.log('proverka');
        item.addEventListener('click', makeActive(id));
        console.log('konets');
        ++i;
    }
}

const refresh = () => {
    sidebar.textContent = '';
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

const create = () => {
    const actives = document.getElementsByClassName('active');
    if (actives.length != 0) {
        actives[0].className = 'passive';
    }
    location.hash = '';
    header.value = '';
    textArea.value = '';
}
