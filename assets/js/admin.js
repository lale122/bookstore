const img2 = document.querySelector('.div_img2')
const navbar = document.querySelector('.navbar')
const exit = document.querySelector('.exit')
const main = document.querySelector('main')
const extra = document.querySelector('.extra')
const login=sessionStorage.getItem('login')
if(login!=='succesfull'){
    window.location.href='./admin.html'
}
document.querySelector('#hamburger').addEventListener('click', function (e) {
    e.preventDefault()
    navbar.style.display = 'block'
    img2.style.display = 'none'
    exit.style.display = 'block'
    extra.style.display = 'block'
    main.style.display = 'none'
})
document.querySelector('#exitBtn').addEventListener('click', function (e) {
    e.preventDefault()
    navbar.style.display = 'none'
    img2.style.display = 'block'
    exit.style.display = 'none'
    extra.style.display = 'none'
    main.style.display = 'block'
})
document.querySelector('#logout').addEventListener('click', function (e) {
    e.preventDefault()
    window.location.href = 'admin.html'
    sessionStorage.removeItem('login')
})
const section4 = document.querySelector('.section4')
function link(){
    navbar.style.display = 'none'
    img2.style.display = 'block'
    exit.style.display = 'none'
    extra.style.display = 'none'
    main.style.display = 'block'
}
