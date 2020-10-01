'use strict';
const sidebar = document.getElementById('cont');
const textArea = document.getElementById('texts');
const header = document.getElementById('heading');
const saveButton = document.getElementById('save');
const deleteButton = document.getElementById('delete');
const createButton = document.getElementById('create');
const form = document.getElementById('forma');
const formatter = Intl.DateTimeFormat('ru', {
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    year: 'numeric',
    month: 'numeric',
    day: 'numeric'
});
