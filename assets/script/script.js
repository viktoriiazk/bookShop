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
];
let booksToBuy = [];
document.addEventListener('DOMContentLoaded', runStructure)
const app = document.querySelector('.app');
let bookItem;
let btnShowMoreArray;
let bookToBuy;
let addToBagBtn, iconBag, dragToBtn;
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
    //booksOrderList.insertAdjacentHTML("beforeend", `<p>Backet</p>`);
    btnShowMoreArray =  document.getElementsByClassName("btn-show-more");


    fetch('assets/script/books.json') //path to the file with json data
        .then(response => {
            return response.json();
        })
        .then(data => {
            data.forEach(function (book) {
                bookItem = document.createElement('div');
                addToBagBtn  = document.createElement('a');
                addToBagBtn.insertAdjacentHTML("beforeend", 'Add to bag');
                addToBagBtn.classList.add('btn', 'btn-show-more');
                addToBagBtn.setAttribute('href', "");
                iconBag = document.createElement('img');
                iconBag.src = "assets/icons/cart.svg";
                iconBag.classList.add('icon');
                addToBagBtn.prepend(iconBag);
                bookItem.classList.add('book-item');
                bookItem.setAttribute('draggable', 'true');

                bookItem.insertAdjacentHTML("beforeend", `<img src="${book.imageLink}">`);
                bookItem.insertAdjacentHTML("beforeend", `<p class="book-item__title">${book.title}</p>`);
                bookItem.insertAdjacentHTML("beforeend", `<p class="book-item__author">${book.author}</p>`);
                bookItem.insertAdjacentHTML("beforeend", `<p class="book-item__price">&euro; ${book.price} </p>`);
                bookItem.insertAdjacentHTML("beforeend", `<a  href="" class="btn">Show more</a>`);

                bookItem.appendChild(addToBagBtn);
                booksList.appendChild(bookItem);


                bookItem.addEventListener('dragstart', dragStart);
                function dragStart(e) {

                    e.dataTransfer.setData('text/html', e.target.id);
                    setTimeout(() => {
                        dragToBtn =  e.target.cloneNode(true);
                    }, 0);

                }
                  bookItem.addEventListener('dragenter', dragEnter);
                 bookItem.addEventListener('dragover', dragOver);
                 bookItem.addEventListener('dragleave', dragLeave);
                 bookItem.addEventListener('drop', drop);

                function dragEnter(e) {
                    e.preventDefault();
                }

                function dragOver(e) {
                    e.preventDefault();

                    booksOrderList.classList.add('drag-over');


                }

                function dragLeave(e) {
                    e.preventDefault();
                    booksOrderList.classList.remove('drag-over');

                }

                function drop(e) {
                    e.preventDefault();
                    booksOrderList.classList.remove('drag-over');
                    booksOrderList.append(dragToBtn);
                }
                addToBagBtn.addEventListener('click', function (e){
                    e.preventDefault();
                    let elToAdd= e.target.parentElement;

                    booksToBuy.push(elToAdd);
                    console.log(booksToBuy);
                    booksOrderList.append( elToAdd.cloneNode(true));

                })
            });

            // console.log(booksList)
            //
            // Array.from(btnShowMoreArray).forEach((btn) => {
            //
            //        btn.addEventListener('click', function (e){
            //            e.preventDefault();
            //
            //            bookToBuy = bookItem.cloneNode(true);
            //            booksToBuy.unshift(bookToBuy);
            //            booksToBuy.forEach(book => {
            //                booksOrderList.append(book);
            //                console.log('this is book ', book)
            //            })
            //            console.log(bookToBuy, 'book to buy new');
            //            console.log(bookItem,'book Item old');
            //        })
            //     })
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


