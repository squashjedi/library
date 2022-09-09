let myLibrary = []

const books = document.querySelector('.books')
const modal = document.querySelector('.modal')
const btnOpenModal = document.querySelector('#open-modal')
const btnCloseModal = document.querySelector('#close-modal')
const btnSubmit = document.querySelector('#submit')
const title = document.querySelector('#title')
const author = document.querySelector('#author')
const pages = document.querySelector('#pages')
const isRead = document.querySelector('#isRead')
const bookForm = document.querySelector(".book-form")

bookForm.addEventListener("submit", e => {
  e.preventDefault()

  addBookToLibrary(new Book(
    title.value,
    author.value,
    pages.value,
    isRead.checked
  ))
  closeModal()
})

class Book {
  constructor(title, author, pages, isRead) {
    this.title = title
    this.author = author
    this.pages = pages
    this.isRead = isRead
    this.toggle = (e) => {
      this.isRead = !this.isRead
      const bookNode = Array.from(books.childNodes).filter(book => {
        return book.dataset.id === e.target.dataset.id
      })
      bookNode[0].querySelector(".isRead").textContent = this.isRead ? 'Read' : 'Not read'
    }
  }
}



// function submitForm() {
//   addBookToLibrary(new Book(
//     title.value,
//     author.value,
//     pages.value,
//     isRead.checked
//   ))
//   closeModal()
// }

function closeModal() {
  modal.style.display = "none"
  title.value = ""
  author.value = ""
  pages.value = ""
  isRead.checked = false
}

function openModal() {
  modal.style.display = "block"
}

// btnSubmit.onclick = submitForm

btnOpenModal.onclick = function () {
  modal.style.display = "block"
}
btnCloseModal.onclick = function () {
  closeModal()
}
window.onclick = function (event) {
  if (event.target == modal) {
    closeModal()
  }
}

function removeBook(index) {
  myLibrary.splice(index, 1)
  const bookNodes = document.querySelectorAll('.book')
  bookNodes.forEach(bookNode => {
    if (index === bookNode.dataset.id) {
      bookNode.remove()
    }
  })
}

function addBookToLibrary(book) {
  myLibrary.push(book)
  const index = books.lastElementChild === null ? 0 : books.lastElementChild.dataset.id
  const bookNode = document.createElement('li')
  bookNode.classList.add('book')
  bookNode.dataset.id = Number(index) + 1
  const divRemove = document.createElement('div')
  divRemove.classList.add('remove')
  divRemove.textContent = "x"
  divRemove.dataset.id = Number(index) + 1
  const divTitle = document.createElement('div')
  divTitle.classList.add('title')
  divTitle.textContent = book.title
  const divAuthor = document.createElement('div')
  divAuthor.classList.add('author')
  divAuthor.textContent = `by ${book.author}`
  const divPages = document.createElement('div')
  divPages.classList.add('pages')
  divPages.textContent = `${Number(book.pages)} pages`
  const divIsRead = document.createElement('div')
  divIsRead.classList.add('isRead')
  divIsRead.textContent = `${book.isRead ? 'Read' : 'Not read'}`
  const toggleBtn = document.createElement('button')
  toggleBtn.classList.add('toggle')
  toggleBtn.dataset.id = Number(index) + 1
  toggleBtn.textContent = "Toggle read"
  toggleBtn.addEventListener('click', (e) => {
    book.toggle(e)
  })

  bookNode.appendChild(divRemove)
  bookNode.appendChild(divTitle)
  bookNode.appendChild(divAuthor)
  bookNode.appendChild(divPages)
  bookNode.appendChild(divIsRead)
  bookNode.appendChild(toggleBtn)
  books.appendChild(bookNode)
  const removeBtns = document.querySelectorAll('.remove')
  divRemove.addEventListener('click', (e) => {
    removeBook(e.target.dataset.id)
  })
}

function initialise() {
  LordOfTheRings = new Book('Fellowship of the Rings', 'J.R.R Tolkien', 423, true)
  Dune = new Book('Dune', 'Frank Herbert', 412, false)

  addBookToLibrary(LordOfTheRings)
  addBookToLibrary(Dune)
}

initialise()