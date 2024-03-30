import db from './firebase.mjs';
import { ref, onValue, set, get, push } from 'https://www.gstatic.com/firebasejs/10.8.1/firebase-database.js'
const tableJoin = document.querySelector('.tJoinUs')
onValue(ref(db, 'JoinUs'), snapshot => {
    const join = snapshot.val()
    tableJoin.innerHTML = ''
    for (let i in join) {
        const tr = document.createElement('tr')
        const th_id = document.createElement('th')
        const td_first = document.createElement('td')
        const td_last = document.createElement('td')
        th_id.textContent = join[i].id
        td_first.textContent = join[i].first
        td_last.textContent = join[i].last
        tr.append(th_id, td_first, td_last)
        tableJoin.append(tr)
    }
})

