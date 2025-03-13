const mainContainer = document.querySelector('.main__library-container')

const add = document.querySelector('.main__add-book')
const addX = document.querySelector('.add__container-x')
const addContainer = document.querySelector('.main__add-container')

const inputTitle = document.querySelector('#title')
const inputAuthor = document.querySelector('#author')
const inputPages = document.querySelector('#pages')
const selectRead = document.querySelector('#read')
const buttonAdd = document.querySelector('.form__button')


let clickCount = 0;

function resetAddButton() {
    addContainer.classList.remove('active')
    add.classList.remove('addActive')
    clickCount = 0
}

add.addEventListener('click', () => {
    clickCount++;
    if (clickCount % 2 === 1) {
        addContainer.classList.toggle('active')
        add.classList.toggle('addActive')

        inputTitle.value = "";
        inputAuthor.value = "";
        inputPages.value = "";
        selectRead.value = "option1";
    } else {
        resetAddButton()
    }
});

addX.addEventListener('click', () => {
    resetAddButton()
});


const myLibrary = []

function Book(title, author, pages, read) {
    this.title = `Title: ${title}`
    this.author = `Author: ${author}`
    this.pages = `Pages: ${pages}`
    this.read = `Read? ${read}`
}

const addBookToLibrary = () => buttonAdd.addEventListener('click', handleAddButtonClick)


function handleAddButtonClick() {
    if (!inputTitle.value || !inputAuthor.value || !inputPages.value) {
    alert("Пожалуйста, заполните все поля.");
    return;}

    const newBoock = new Book(inputTitle.value, inputAuthor.value, inputPages.value, selectRead.value === 'option1' ? 'Yes📖' : 'No📘')
    myLibrary.push(newBoock)

    resetAddButton()
    renderBooks();
}

function renderBooks() {
    mainContainer.innerHTML = "";

    myLibrary.forEach((book, index) => {
        const bookСontainer = document.createElement('div');
        bookСontainer.classList.add('main__book-container');

        const title = document.createElement('h2');
        title.classList.add('book-container__name');
        title.textContent = book.title;

        const author = document.createElement('h3');
        author.classList.add('book-container__author');
        author.textContent = book.author;

        const pages = document.createElement('h3');
        pages.classList.add('book-container__pages');
        pages.textContent = book.pages;

        const read = document.createElement('h3');
        read.classList.add('book-container__read');
        read.textContent = book.read;

        const update = document.createElement('button');
        update.classList.add('book-container__update');
        update.textContent = 'Update🖊️';

        const deleted = document.createElement('button');
        deleted.classList.add('book-container__delete');
        deleted.textContent = 'Delete🗑️';


        update.addEventListener('click', () => {
            if (myLibrary[index].read === 'Read? Yes📖') {
                myLibrary[index].read = 'Read? No📘';
            } else {
                myLibrary[index].read = 'Read? Yes📖';
            }
            read.textContent = myLibrary[index].read;
        });

        deleted.addEventListener('click', () => {
            myLibrary.splice(index, 1);
            renderBooks();
        });

        bookСontainer.appendChild(title);
        bookСontainer.appendChild(author);
        bookСontainer.appendChild(pages);
        bookСontainer.appendChild(read);
        bookСontainer.appendChild(update);
        bookСontainer.appendChild(deleted);

        mainContainer.appendChild(bookСontainer);
    });
}


addBookToLibrary()