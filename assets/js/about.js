import db from './firebase.mjs';
import {ref, onValue, set, get, push } from 'https://www.gstatic.com/firebasejs/10.8.1/firebase-database.js'

const title = document.querySelector("#title")
const descript = document.querySelector("#description")
const imgsrc = document.querySelector("#mainfoto")
imgsrc.src = "./assets/image/Spinner-1s-200px.gif"
imgsrc.style.borderRadius = "50%"

setTimeout(() => {
  bookdata();
}, "1000");
function bookdata() {
  onValue(ref(db,'aboutStore'),snapshot=>{
    const data = snapshot.val()
  console.log(data)
  for(let i in data){
    title.textContent = data[i].title
    descript.textContent = data[i].description
    imgsrc.style.borderRadius = "20%"
    imgsrc.src = data[i].url

    console.log(data[i].title, data[i].description, data[i].url)
}

})
}





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
// document.querySelector('#goToCatalog').addEventListener('click', function (e) {
//     e.preventDefault()
//     window.location.href = 'catolog.html';
// })
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
    body.style.overflow = 'scroll'
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
    nameJoin.value = ''
    emailJoin.value = ''
  const section4 = document.querySelector('.section4')
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
