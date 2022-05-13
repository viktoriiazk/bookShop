const navMenu = ['Books', 'AudioBooks', 'New']
const socials = [
    {
        img: 'assets/icons/facebook.png',
        name: 'Facebook',
        link: 'https://www.facebook.com/'
    },
    {
        img: 'assets/icons/linkedin.png',
        name: 'Linkedin',
        link: 'https://www.linkedin.com/'
    },
    {
        img: 'assets/icons/instagram.png',
        name: 'Instagram',
        link: 'https://www.instagram.com/'
    }
]
document.addEventListener('DOMContentLoaded', runStructure)
const app = document.querySelector('.app');

function runStructure() {
    makeHeader();
    makeMain();
    makeFooter();
}

function makeHeader() {
    const header = new DocumentFragment();
    const headerTag = document.createElement('header');
    const nav = document.createElement('nav');
    const navUl = document.createElement('ul');
    const logo = document.createElement('h1');
    logo.innerText = 'BookShop';
    navMenu.forEach(function (menuItem) {
        let li = document.createElement('li');
        li.textContent = menuItem;
        navUl.appendChild(li);
    });
    nav.appendChild(navUl);
    headerTag.append(logo, nav);
    header.append(headerTag);
    app.append(header);
    return app;
};

function makeMain() {
    const main = new DocumentFragment();
    const mainTag = document.createElement('main');
    const booksList = document.createElement('div');
    const booksOrderList = document.createElement('div');
    booksList.classList.add('books-list');
    booksOrderList.classList.add('books-order-list');
    booksOrderList.insertAdjacentHTML("beforeend", `<p></p>`);
    fetch('assets/script/books.json') //path to the file with json data
        .then(response => {
            return response.json();
        })
        .then(data => {
            data.forEach(function (book) {
                let bookItem = document.createElement('div');
                booksList.appendChild(bookItem);
                bookItem.classList.add('book-item');

                bookItem.insertAdjacentHTML("beforeend", `<img src="${book.imageLink}">`);
                bookItem.insertAdjacentHTML("beforeend", `<p class="book-item__title">${book.title}</p>`);
                bookItem.insertAdjacentHTML("beforeend", `<p class="book-item__author">${book.author}</p>`);
                bookItem.insertAdjacentHTML("beforeend", `<p class="book-item__price">&euro; ${book.price} </p>`);
                bookItem.insertAdjacentHTML("beforeend", `<a  href="" class="btn">Show more</a>`);
                bookItem.insertAdjacentHTML("beforeend", `<a  href="" class="btn"><img class="icon" src="assets/icons/cart.svg">Add to bag</a>`);

            });
        });
    mainTag.append(booksList, booksOrderList);
    main.append(mainTag);
    app.append(main);
}

function makeFooter() {
    const footer = new DocumentFragment();
    const footerTag = document.createElement('footer');
    const socialsWrap = document.createElement('ul');

    socials.forEach(function (socialItem) {
        let li = document.createElement('li');
        socialsWrap.appendChild(li);
        li.insertAdjacentHTML("beforeend", `<a href="#"><img src="${socialItem.img}" alt="${socialItem.name}"></a>`)
    });

    footer.append(footerTag)
    footerTag.append(socialsWrap);
    app.append(footer)
}



