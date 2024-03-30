import db from './firebase.mjs';
import { ref, onValue, set, get, push } from 'https://www.gstatic.com/firebasejs/10.8.1/firebase-database.js'
const section5 = document.querySelector('.section5')
const ext = document.querySelector('.ext')
const body=document.querySelector('body')
document.querySelector('.join_div').addEventListener('click', function (e) {
    e.preventDefault()
    section5.style.display = 'flex'
    ext.style.display = 'block'
    body.style.overflow = 'hidden'
})
document.querySelector('.logo_div').addEventListener('click', function (e) {
    e.preventDefault();
    window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
    });
    var currentPage = window.location.pathname;
    if (currentPage !== "/index.html") {
        window.location.href = 'index.html';
    }
})
document.querySelector('#goToCatalog').addEventListener('click', function (e) {
    e.preventDefault()
    window.location.href = './catalog.html';
})
const nameJoin = document.querySelector('#nameJoin')
const emailJoin = document.querySelector('#emailJoin')
document.querySelector('#btnJoin').addEventListener('click', async function (e) {
    e.preventDefault()
    if (nameJoin.value.trim() == '') {
        alert('enter name')
        return
    } else if (emailJoin.value.trim() == '') {
        alert('enter email')
        return
    } else if (!emailJoin.value.includes('@')) {
        alert('write the email correctly')
        return
    }
    section5.style.display = 'none'
    ext.style.display = 'none'
    const snapshot = push(ref(db, 'JoinUs'))
    await get(ref(db, 'JoinUs')).then(e => {
        const a = e.val()
        let arr = JSON.stringify(a).split(',"-')
        let count = arr.length
        if (arr[0] === 'null') {
            count--
        }
        const join = {
            first: nameJoin.value,
            last: emailJoin.value,
            id: count + 1
        }
        set(ref(db, `JoinUs/${snapshot.key}`), join)
    })
    const section4 = document.querySelector('.section4Join')
    section4.classList.add('rightAnimation')
    section4.style.display = 'flex'
    setTimeout(function () {
        section4.classList.remove('rightAnimation')
        section4.classList.add('leftAnimation')
    }, 1000)
    setTimeout(function () {
        section4.classList.remove('leftAnimation')
        section4.style.display = 'none'
    }, 1500)
    nameJoin.value = ''
    emailJoin.value = ''
})
document.querySelector('#exit').addEventListener('click', function (e) {
    section5.style.display = 'none'
    ext.style.display = 'none'
    body.style.overflow = 'auto'
})
document.querySelector('.ext').addEventListener('click',function(e){
    section5.style.display = 'none'
    ext.style.display = 'none'
    body.style.overflow = 'auto'
})
const catalogDiv=document.querySelector('.catalogDiv')
onValue(ref(db,'option'),snapshot=>{
    const data=snapshot.val().type
    catalogDiv.innerHTML=''
    for(let i of data){
        const btn=document.createElement('button')
        const a=document.createElement('a')
        a.textContent=i
        btn.append(a)
        catalogDiv.append(btn)
        btn.addEventListener('click',function(e){
            e.preventDefault()
            window.location.href = './catalog.html';
        })
    }
})
