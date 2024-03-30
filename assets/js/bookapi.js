const input_book = document.querySelector('.input_book')
const bookName = document.querySelector('#book_name')
const authorName = document.querySelector('#Author_name')
const imgUrl = document.querySelector('#url')
const description = document.querySelector('#description')
const bookType = document.querySelector('#book_type')
const newBook=document.querySelector('#checkbox')
const besteller=document.querySelector('#checkbox2')
const date=document.querySelector('#date')
document.querySelector('.button_book').addEventListener('click', function (e) {
    e.preventDefault()
    if (input_book.value.trim() == '') {
        alert('enter book name')
        return
    }
})
const last_search = document.querySelector('.last_search')

document.querySelector('input').addEventListener('input', async function (event) {
    last_search.innerHTML = ''
    var dəyər = event.target.value;
    try {
        const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${dəyər}`);
        const result = await response.json();
        for (let i of result.items) {
            const img = document.createElement('img')
            const div = document.createElement('div')
            const title = document.createElement('p')
            img.src = i.volumeInfo.imageLinks.smallThumbnail
            title.textContent = i.volumeInfo.title
            div.append(img, title)
            div.classList.add('searchBookDiv')
            last_search.append(div)
            div.addEventListener('click', function (e) {
            const best=i.volumeInfo.averageRating
            if(i.volumeInfo.publishedDate!==undefined){
                const data=i.volumeInfo.publishedDate.slice(0,4)
                if(parseInt(data)>=2020){
                    newBook.checked=true
                }
                date.value=data.slice(0,4)

            }
                
                // if(parseInt(best)>=4){
                //     besteller.checked=true
                // }
                bookName.value = i.volumeInfo.title
                authorName.value = i.volumeInfo.authors
                imgUrl.value = i.volumeInfo.imageLinks.smallThumbnail
                description.value = i.volumeInfo.description
                last_search.innerHTML=''
                bookType.value = i.volumeInfo.categories
            })
        }
    } catch (error) {
        // var result=err instanceof Error
        // console.log(result)
    }
});

