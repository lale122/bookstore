import db from './firebase.mjs';
import { ref, get, push, set, onValue } from 'https://www.gstatic.com/firebasejs/10.8.1/firebase-database.js';
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
const section4 = document.querySelector('.section4')
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
const links = document.querySelector('.links')
onValue(ref(db, 'option'), snapshot => {
    links.innerHTML = ''
    const data = snapshot.val().type
    for (let i of data) {
        const a = document.createElement('a')
        a.textContent = i
        a.classList.add('a_type')
        a.classList.add('typeBook')
        a.href = '#'
        links.append(a)
    }
    document.querySelectorAll('.typeBook').forEach(item => {
        item.addEventListener('click', function (e) {
            e.preventDefault();
            spinner.style.display = 'block';
            container.style.display = 'none';
            spinner2.style.display = 'block'
            spinner3.style.display = 'block'
            setTimeout(function () {
                container.style.display = 'block';
                spinner.style.display = 'none';
                spinner2.style.display = 'none'
                spinner3.style.display = 'none'
            }, 1000);
            show(this.textContent)
        });
    });
})
let btn = ''
const swiper_wrapper = document.querySelector('.swiper-wrapper')
const sviper = document.querySelector('.swiper')
const besteller_wrapper = document.querySelector('.besteller_wrapper')
const new_wrapper = document.querySelector('.new_wrapper')
function show(e) {
    get(ref(db, 'books')).then(snapshot => {
        swiper_wrapper.innerHTML = ''
        const data = snapshot.val()
        let count = 0
        besteller_wrapper.innerHTML = ''
        new_wrapper.innerHTML = ''
        for (let i in data) {
            if (e == data[i].bookType || e === 'All') {
                count++
                const divSlide = document.createElement('div')
                const img = document.createElement('img')
                const div = document.createElement('div')
                const h4 = document.createElement('h4')
                const p = document.createElement('p')
                const button = document.createElement('button')
                button.addEventListener("click", function () {
                    let buttonId = this.id;
                    exportButtonId(buttonId)
                    function exportButtonId(buttonId) {
                        btn = buttonId
                        bashla()
                        goster();
                    }
                });
                if (count > 5) {
                    swiper_wrapper.classList.remove('all_center')
                } else {
                    swiper_wrapper.classList.add('all_center')
                }
                if (data[i].newBook === true) {
                    const divImg = document.createElement('div')
                    divImg.textContent = 'New'
                    divImg.classList.add('divImg')
                    div.append(divImg)
                }
                img.src = data[i].imgUrl
                h4.textContent = data[i].bookName.slice(0, 25)
                p.textContent = data[i].authorName.slice(0, 20)
                button.textContent = 'Read More'
                button.id = i

                divSlide.classList.add('swiper-slide')
                div.classList.add('divCatalog')
                img.classList.add('imgCatalog')
                h4.classList.add('authorCatalog')
                button.classList.add('btnCatalog')
                div.append(img, h4, p, button)
                divSlide.append(div)
                swiper_wrapper.append(divSlide)
            }
            if (data[i].besteller) {
                const divSlideBest = document.createElement('div')
                const imgBest = document.createElement('img')
                const divBest = document.createElement('div')
                const h4Best = document.createElement('h4')
                const pBest = document.createElement('p')
                const buttonBest = document.createElement('button')
                if (data[i].newBook === true) {
                    const divImgBest = document.createElement('div')
                    divImgBest.textContent = 'New'
                    divImgBest.classList.add('divImg')
                    divBest.append(imgBest)
                }
                buttonBest.addEventListener("click", function () {
                    let buttonId = this.id;
                    exportButtonId(buttonId)
                    function exportButtonId(buttonId) {
                        btn = buttonId
                        bashla()
                        goster();
                    }

                });
                imgBest.src = data[i].imgUrl
                h4Best.textContent = data[i].bookName.slice(0, 25)
                pBest.textContent = data[i].authorName.slice(0, 20)
                buttonBest.textContent = 'Read More'
                buttonBest.id = i
                divSlideBest.classList.add('swiper-slide')
                divSlideBest.classList.add('bestSlide')
                divBest.classList.add('divCatalog')
                imgBest.classList.add('imgCatalog')
                h4Best.classList.add('authorCatalog')
                buttonBest.classList.add('btnCatalog')
                divBest.append(imgBest, h4Best, pBest, buttonBest)
                divSlideBest.append(divBest)
                besteller_wrapper.append(divSlideBest)
            }
            if (data[i].newBook) {
                const divSlideNew = document.createElement('div')
                const imgNew = document.createElement('img')
                const divNew = document.createElement('div')
                const h4New = document.createElement('h4')
                const pNew = document.createElement('p')
                const buttonNew = document.createElement('button')
                const divImgNew = document.createElement('div')

                buttonNew.addEventListener("click", function () {
                    let buttonId = this.id;
                    exportButtonId(buttonId)
                    function exportButtonId(buttonId) {
                        btn = buttonId
                        bashla()
                        goster();
                    }

                });
                divImgNew.textContent = 'New'
                divImgNew.classList.add('divImg')
                divSlideNew.append(divImgNew)
                imgNew.src = data[i].imgUrl
                h4New.textContent = data[i].bookName.slice(0, 25)
                pNew.textContent = data[i].authorName.slice(0, 20)
                buttonNew.textContent = 'Read More'
                buttonNew.id = i
                divSlideNew.classList.add('swiper-slide')
                divSlideNew.classList.add('bestSlide')
                divNew.classList.add('divCatalog')
                imgNew.classList.add('imgCatalog')
                h4New.classList.add('authorCatalog')
                buttonNew.classList.add('btnCatalog')

                divNew.append(imgNew, h4New, pNew, buttonNew)
                divSlideNew.append(divNew)

                new_wrapper.append(divSlideNew)
            }

        }

        if (count < 5) {
            sviper.style.display = 'flex';
            sviper.style.width = '100%';
            swiper_wrapper.style.gap = '50px'
            swiper_wrapper.style.transform = 'translate3d(0px, 0px, 0px)';
            besteller_wrapper.style.gap = '50px'
            new_wrapper.style.gap = '50px'
        } else {
            swiper_wrapper.style.transform = 'translate3d(76px, 0px, 0px)';
            sviper.style.flexGrow = '0';
            // swiper_wrapper.style.gap='0px'
            swiper_wrapper.style.gap = '10px'
            // new_wrapper.style.gap = '0px'
        }
    })
}
const spinner = document.querySelector('.spinner');
const spinner2 = document.querySelector('.spinner2');
const container = document.querySelector('.divSlider');
const spinner3 = document.querySelector('.spinner3');
spinner.style.display = 'block';
container.style.display = 'none';

setTimeout(function () {
    container.style.display = 'block';
    spinner.style.display = 'none';
    spinner2.style.display = 'none'
    spinner3.style.display = 'none'
}, 1500);

show('All');

const catalogDiv = document.querySelector('.catalog')
const bookPage = document.querySelector('.bookPag')
const year = document.querySelector('.year')
const bookName = document.querySelector('.bookName')
const author = document.querySelector('.author')
const title = document.querySelector('.title')
const boolPageImg = document.querySelector('.bookPageImg')
function bashla() {
    console.log(btn)
    catalogDiv.style.display = 'none'
    bookPage.style.display = 'block'
    get(ref(db, 'books')).then(snapshot => {
        const data = snapshot.val()
        console.log(data)
        for (let i in data) {
            if (btn === i) {
                year.textContent = data[i].date
                bookName.textContent = data[i].bookName
                author.textContent = data[i].authorName
                title.textContent = data[i].description
                boolPageImg.src = data[i].imgUrl
            }
        }
    })
}


const commentText = document.querySelector('.commentText')

document.addEventListener('DOMContentLoaded', function () {
    var sendButton = document.getElementById('sendBtn');

    sendButton.addEventListener('click', function () {
        var inputComment = document.querySelector('.inputCommet');
        var commentText = inputComment.value;
        if (commentText.trim() !== '') {
            const snapshot = push(ref(db, 'commit'))
            var now = new Date();
            var time = now.getHours() + ':' + now.getMinutes();
            const commit = {
                date: time,
                text: commentText
            }
            set(ref(db, `books/${btn}/commit/${snapshot.key}`), commit)
            inputComment.value = '';
            goster()

        }
    });
});

function goster() {
    get(ref(db, `books/${btn}/commit`)).then(snapshot => {
        updateCommit(snapshot)
    })
}

function updateCommit(e) {
    const data = e.val()
    commentText.innerHTML = ''
    if (typeof (data) === 'object') {
        commentText.style.display = 'block'
    }
    for (let i in data) {

       var newCommentDiv = document.createElement('div');
            newCommentDiv.classList.add('commentText2');
  
            var newTopDiv = document.createElement('div');
            newTopDiv.classList.add('textTop');
  
            var newUserNameDiv = document.createElement('div');
            newUserNameDiv.classList.add('userName');
            newUserNameDiv.textContent = 'Anonim';
  
            var newDateDiv = document.createElement('div');
            newDateDiv.classList.add('dateUser');
            var now = new Date();
            var time = now.getHours() + ':' + now.getMinutes();
            newDateDiv.textContent = data[i].date;
  
            newTopDiv.appendChild(newUserNameDiv);
            newTopDiv.appendChild(newDateDiv);
  
            var newTextDiv = document.createElement('div');
            newTextDiv.classList.add('textArea');
            newTextDiv.textContent = data[i].text;
  
            newCommentDiv.appendChild(newTopDiv);
            newCommentDiv.appendChild(newTextDiv);
  
            commentText.appendChild(newCommentDiv);
            newCommentDiv.classList.add('text2');

    }
}

var backButton = document.querySelector('.backButton')
backButton.addEventListener('click', function (e) {
    e.preventDefault()
    console.log('a')
   window.location.href='./catalog.html'
})
