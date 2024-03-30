import db from './firebase.mjs';
import { ref, onValue, set, get, push } from 'https://www.gstatic.com/firebasejs/10.8.1/firebase-database.js'
const tableContact = document.querySelector('.tContact')
onValue(ref(db, 'contact'), snapshot => {
    const contact = snapshot.val()
    tableContact.innerHTML = ''
    for (let i in contact) {
        const tr = document.createElement('tr')
        const th_id = document.createElement('th')
        const td_name = document.createElement('td')
        const td_adress = document.createElement('td')
        const td_email = document.createElement('td')
        const td_phone = document.createElement('td')
        th_id.textContent = contact[i].id
        td_name.textContent = contact[i].fullname
        td_adress.textContent = contact[i].adress
        td_email.textContent = contact[i].email
        td_phone.textContent = contact[i].phone
        tr.append(th_id, td_name, td_adress, td_email, td_phone)
        tableContact.append(tr)
    }
})