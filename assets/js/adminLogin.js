import db from './firebase.mjs';
import { ref, get } from 'https://www.gstatic.com/firebasejs/10.8.1/firebase-database.js';

const ad = document.querySelector('#ad');
const password = document.querySelector('#password');
const result = document.querySelector('#result');
const p_son=document.querySelector('.p_son')
const joinBtn=document.querySelector('#join')
joinBtn.addEventListener('click', async (e) => {
    e.preventDefault();

    if (ad.value.trim() === '') {
        alert('Please enter your admin name');
        return;
    }

    if (password.value.trim() === '') {
        alert('Please enter your admin password');
        return;
    }

    try {
        const snapshot = await get(ref(db, 'users'));
        const users = snapshot.val();
        
        if (users && users.user1 && ad.value === users.user1.name && password.value === users.user1.password) {
            joinBtn.disabled = true;
            result.style.display = 'flex';
            result.style.backgroundColor='green'
            p_son.textContent='Successful'
            setTimeout(function(e){
                window.location.href = 'adminMain.html';
            },1000)
            ad.value = '';
            password.value = '';
            sessionStorage.setItem('login','succesfull')
        } else {
            result.style.display = 'flex';
            result.style.backgroundColor='red'
            p_son.textContent='Unseccessful'
            ad.value = '';
            password.value = '';
        }
    } catch (error) {
        console.error('Error fetching data:', error);
    }
});
