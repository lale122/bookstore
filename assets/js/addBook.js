import db from './firebase.mjs';
import { ref, onValue, set, get, push } from 'https://www.gstatic.com/firebasejs/10.8.1/firebase-database.js'

const bookName = document.querySelector('#book_name')
const authorName = document.querySelector('#Author_name')
const imgUrl = document.querySelector('#url')
const description = document.querySelector('#description')
const bookType = document.querySelector('#book_type')
const newBook = document.querySelector('#checkbox')
const besteller=document.querySelector('#checkbox2')
const input_book = document.querySelector('.input_book')
const bookTypeP=document.querySelector('.bookTypeP')
const date=document.querySelector('#date')
const section4=document.querySelector('.section4')
document.addEventListener("DOMContentLoaded", function () {
    getBooks();
});
const last_search = document.querySelector('.last_search')
document.querySelector('#addBookBtn').addEventListener('click', function (e) {
    e.preventDefault()
    if (bookName.value.trim() === '') {
        alert('enter book name')
        return
    } else if (authorName.value.trim() === '') {
        alert('enter author name')
        return
    } else if (imgUrl.value.trim() === '') {
        alert('enter img url')
        return
    } else if (description.value.trim() === '') {
        alert('enter description')
        return
    }
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
    addInfoToDatabasa().then()
    input_book.value = ''
    last_search.innerHTML = ''
})

async function addInfoToDatabasa() {
    const booksRef = ref(db, 'books');
    const newBookRef = push(booksRef);

    await get(booksRef).then(snapshot => {
        const books = snapshot.val();
        let count = books ? Object.keys(books).length : 0;
        const newBookData = {
            bookName: bookName.value,
            authorName: authorName.value,
            imgUrl: imgUrl.value,
            description: description.value,
            bookType: bookType.value,
            newBook: newBook.checked,
            besteller:besteller.checked,
            date:date.value,
            id: count + 1
        };

        set(newBookRef, newBookData)
            .then(() => {
                updateTable();
                getBooks()
                bookName.value = '';
                authorName.value = '';
                imgUrl.value = '';
                description.value = '';
                newBook.checked = false;
                besteller.checked=false;
                date.value=''
            })
            .catch(error => {
                console.error("Error adding document: ", error);
            });
    });
    
}
function updateTable(snapshot) {
    const table = document.querySelector('.books_table');
    const book = snapshot?.val();
    table.innerHTML = '';
    for (let i in book) {
        const tr = document.createElement('tr');
        const th_id = document.createElement('th');
        const td_title = document.createElement('td');
        const td_description = document.createElement('td');
        const td_category = document.createElement('td');
        const td_author = document.createElement('td');
        th_id.textContent = book[i].id;
        td_title.textContent = book[i].bookName;

        if (book[i].description === 'undefined' || book[i].description.length < 151) {
            td_description.textContent = book[i].description
        } else {
            td_description.textContent = book[i].description.slice(0, 100) + '...';
            td_description.addEventListener('mouseover', function () {
                td_description.textContent = book[i].description
            });
            td_description.addEventListener('mouseout', function () {
                td_description.textContent = book[i].description.slice(0, 150) + '...';
            });
        }
        td_category.textContent = book[i].bookType;
        td_author.textContent = book[i].authorName;
        tr.maxHeight='10px'
        td_description.style.overflowY='auto'
        tr.append(th_id, td_title, td_description, td_category, td_author);
        table.append(tr);
    }
}


function getBooks() {
    get(ref(db, 'books')).then(snapshot => {
        updateTable(snapshot);
    });
}
const addOption=document.querySelector('.addOption')
const addOptionBtn=document.querySelector('.addOptionBtn')
const exitOption=document.querySelector('.exitOption')
const newOptionInp=document.querySelector('#newOptionInp')

bookTypeP.addEventListener('click',function(e){
    e.preventDefault()
    bookTypeP.style.display='none'
    addOption.style.display='flex'
})

let option=[];
get(ref(db, 'option')).then(snapshot => {
    option = (snapshot.val()).type; 
});


addOptionBtn.addEventListener('click',async function(e){
    e.preventDefault()
    if(newOptionInp.value.trim()===''){
        alert('enter option')
        return
    }
    bookTypeP.style.display='block'
    addOption.style.display='none'
    let a=true
    for(let i of option){
        console.log((newOptionInp.value).toLowerCase())
        console.log(i.toLowerCase())
        if ((newOptionInp.value).toLowerCase()===i.toLowerCase()) {
            a=false
        }
    }
    if(a){
        bookType.innerHTML=''

            option.push(newOptionInp.value)
            let option2={
                type:option
            }
            await set(ref(db,`option`),option2)
            again()
    }
             
})
exitOption.addEventListener('click',function(e){
    e.preventDefault()
    bookTypeP.style.display='block'
    addOption.style.display='none'
})
function again(){
    bookType.innerHTML=''
    get(ref(db,'option')).then(snapshot=>{
        const e=(snapshot.val()).type
        for(let i of e){
            var newOption = document.createElement('option');
            newOption.textContent = i;
            bookType.append(newOption);
        }
    })
}
again()
// let option1={
//     type:option
// }
// const select=document.querySelector('#book_type')
// const snapshot=push(ref(db,'option'))
// for(let i of select){
//     option.push(i.value)
//     console.log(i.value)
// }
// await set(ref(db,`option`),option1)
