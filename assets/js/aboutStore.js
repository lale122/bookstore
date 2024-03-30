import db from './firebase.mjs';
import { ref, set, push, remove } from 'https://www.gstatic.com/firebasejs/10.8.1/firebase-database.js';

const title = document.querySelector('#title');
const url = document.querySelector('#imageUrl');
const description = document.querySelector('#descriptionStore');

document.querySelector('#add2').addEventListener('click', async function(e) {
    e.preventDefault();
    await remove(ref(db, 'aboutStore'));

    if (title.value.trim() === '') {
        alert('enter title');
        return;
    } else if (url.value.trim() === '') {
        alert('enter url');
        return;
    } else if (description.value.trim() === '') {
        alert('enter description');
        return;
    }
    const snapshot = push(ref(db, 'aboutStore'));
    const about = {
        title: title.value,
        url: url.value,
        description: description.value
    };

    await set(ref(db, `aboutStore/${snapshot.key}`), about);
    section4.classList.add('rightAnimation')
    section4.style.display = 'flex'
    setTimeout(function () {
        section4.classList.add('leftAnimation');
        setTimeout(function() {
            section4.classList.remove('rightAnimation');
            section4.classList.remove('leftAnimation');
            section4.style.display = 'none'
        }, 750);
    }, 1000);
    title.value = '';
    url.value = '';
    description.value = '';
});
