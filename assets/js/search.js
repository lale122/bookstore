import db from './firebase.mjs';
import { ref, get, push, set } from 'https://www.gstatic.com/firebasejs/10.8.1/firebase-database.js';

const searchInp = document.querySelector('.searchInput');
const carousel = document.querySelector('.carousel-inner');
const btnPrev = document.querySelector('.carousel-control-prev');
const btnNext = document.querySelector('.carousel-control-next');
const book = localStorage.getItem('book')
const carusel = document.querySelector('.carousel')
const section4 = document.querySelector('.section4')
const spinner = document.querySelector('.spinner')
const button = document.querySelector('.buton')
spinner.style.display = 'block'
carousel.style.display = 'none'
section4.style.display = 'none'
button.style.display = 'none'
setTimeout(function () {
    spinner.style.display = 'none'
    carousel.style.display = 'block'
    button.style.display = 'block'
}, 1000)
bookSearch(book)
let a = true
document.querySelector('#searchBtn').addEventListener('click', async function (e) {
    e.preventDefault();
    if (searchInp.value.trim() !== '') {
        spinner.style.display = 'block'
        carousel.style.display = 'none'
        button.style.display = 'none'
        section4.style.display = 'none'

        setTimeout(function () {
            spinner.style.display = 'none'
            carousel.style.display = 'block'
            button.style.display = 'block'
        }, 2000)
        localStorage.setItem('book', searchInp.value)

        bookSearch(searchInp.value)

        searchInp.value = ''

    } else {
        alert('enter book name')
    }
});
async function bookSearch(text) {
    carousel.innerHTML = '';
    let count = 0;

    const searchText = text.toLowerCase();
    const booksRef = ref(db, 'books');

    const snapshot = await get(booksRef);
    const books = snapshot.val();
    const matchingBooks = [];
    let say = books ? Object.keys(books).length : 0;
    for (const key in books) {

        const book = books[key];
        const newBook = book.newBook

        say--
        console.log(say)
        if (book.bookName.toLowerCase().includes(searchText)) {
            carusel.style.display = 'block'
            section4.style.display = 'none'
            // button.style.display='block'
            count++;
            const div = document.createElement('div');
            const divMain = document.createElement('div');
            const div2 = document.createElement('div');
            const img = document.createElement('img');
            const hr = document.createElement('hr')
            const h3Name = document.createElement('h3');
            const pAuthor = document.createElement('p');
            const pDescrip = document.createElement('p');
            if (newBook) {
                const divImg = document.createElement('div')
                divImg.textContent = 'New'
                divImg.classList.add('divImg')
                divMain.append(divImg)
            }
            img.src = book.imgUrl;
            h3Name.textContent = book.bookName;
            pAuthor.textContent = book.authorName;
            if (book.description === 'undefined' || book.description.length < 151) {
                pDescrip.textContent = book.description
            } else {
                pDescrip.textContent = book.description.slice(0, 150) + '...';
                pDescrip.addEventListener('mouseover', function () {
                    pDescrip.textContent = book.description
                });

                pDescrip.addEventListener('mouseout', function () {
                    pDescrip.textContent = book.description.slice(0, 150) + '...';
                });
            }

            divMain.classList.add('carousel-item');
            if (count === 1) {
                divMain.classList.add('active');
            }
            divMain.classList.remove('.carousel-item.active')
            img.classList.add('d-flex');
            img.classList.add('w-100');
            div2.classList.add('divInfo');
            divMain.classList.add('divMain')
            div2.append(h3Name, pAuthor, hr, pDescrip);
            div2.style.overflowY = 'auto'
            divMain.append(img, div2);
            div.append(divMain);
            carousel.append(div);
            carousel.classList.add('shadow')
            carousel.classList.add('carousel_inner')
            matchingBooks.push(book);
            continue
        } else {
            if (say == 0 && count == 0) {
                // setTimeout(function(){
                section4.style.display = 'block'
                // },250)
                carusel.style.display = 'none'
                button.style.display = 'none'
                spinner.style.display = 'none'
            }


        }
    }

    if (count > 1) {
        btnNext.style.display = 'block';
        btnPrev.style.display = 'block';
    } else {
        btnNext.style.display = 'none';
        btnPrev.style.display = 'none';
    }

}


const section5 = document.querySelector('.section5')
const ext = document.querySelector('.ext')
const body = document.querySelector('body')
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
document.querySelector('.ext').addEventListener('click', function (e) {
    section5.style.display = 'none'
    ext.style.display = 'none'
    body.style.overflow = 'auto'
})