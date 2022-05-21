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
let addToBagBtn, iconBag, dragToBtn, showMoreBtn, bookDescription, closeBtn, removeBtn;

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
    const col1 = document.createElement('div');
    const col2 = document.createElement('div');
    col1.classList.add('column-1');
    col2.classList.add('column-2');
    const booksList = document.createElement('div');
    const booksListTitle = document.createElement('h2');
    booksListTitle.classList.add('title');
    booksListTitle.textContent = 'Books list';
    let sum;

    const booksListOrderTitle = document.createElement('h2');
    booksListOrderTitle.classList.add('title');
    booksListOrderTitle.textContent = 'Books list to buy';

    col1.append(booksListTitle,booksList);
    const totalSum = document.createElement('div');
    totalSum.classList.add('totalSum');
    const totalPrice = document.createElement('span');
    totalSum.insertAdjacentHTML('beforeend',`<p>Total sum:</p>` )
    totalSum.append(totalPrice);


    const popup = document.createElement('div');
    popup.classList.add('popup');
    closeBtn = document.createElement('button');
    closeBtn.classList.add('btn-close');
    closeBtn.innerText = "x";
    popup.appendChild(closeBtn);

    popup.appendChild(closeBtn);
    const booksOrderList = document.createElement('div');
    col2.append(booksListOrderTitle,booksOrderList, totalSum);

    booksList.classList.add('books-list');
    booksOrderList.classList.add('books-order-list');
    //booksOrderList.insertAdjacentHTML("beforeend", `<p>Backet</p>`);
    btnShowMoreArray = document.getElementsByClassName("btn-show-more");


    fetch('assets/script/books.json') //path to the file with json data
        .then(response => {
            return response.json();
        })
        .then(data => {
            data.forEach(function (book) {
                bookItem = document.createElement('div');
                addToBagBtn = document.createElement('a');
                addToBagBtn.insertAdjacentHTML("beforeend", 'Add to bag');
                addToBagBtn.classList.add('btn', 'btn-add-to-bag');
                addToBagBtn.setAttribute('href', "");
                iconBag = document.createElement('img');
                iconBag.src = "assets/icons/cart.svg";
                iconBag.classList.add('icon');
                addToBagBtn.prepend(iconBag);

                showMoreBtn = document.createElement('a');
                showMoreBtn.insertAdjacentHTML("beforeend", 'Show more');
                showMoreBtn.classList.add('btn', 'btn-show-more');
                showMoreBtn.setAttribute('href', "");
                bookDescription = document.createElement('p');
                bookItem.classList.add('book-item');
                bookItem.setAttribute('draggable', 'true');
                bookItem.insertAdjacentHTML("beforeend", `<img src="${book.imageLink}">`);
                bookItem.insertAdjacentHTML("beforeend", `<p class="book-item__title">${book.title}</p>`);
                bookItem.insertAdjacentHTML("beforeend", `<p class="book-item__author">${book.author}</p>`);
                bookItem.insertAdjacentHTML("beforeend", `<p class="book-item__price">&euro; ${book.price} </p>`);
                //bookItem.insertAdjacentHTML("beforeend", `<a  href="" class="btn">Show more</a>`);
                bookItem.appendChild(showMoreBtn);
                bookItem.appendChild(addToBagBtn);
                booksList.appendChild(bookItem);

                bookItem.addEventListener('dragstart', dragStart);

                function dragStart(e) {
                    e.dataTransfer.setData('text/html', e.target.id);
                    setTimeout(() => {
                        dragToBtn = e.target.cloneNode(true);
                        bookToBuy = document.createElement('div');
                        bookToBuy.classList.add('book-item');
                        removeBtn = document.createElement('a');
                        removeBtn.classList.add('btn-remove');
                        removeBtn.innerText = "x";
                        let titleBook = e.target.querySelector('.book-item__title').textContent;
                        let titleBook_ordered = document.createElement('p');
                        titleBook_ordered.textContent = titleBook;
                        titleBook_ordered.classList.add('book-item__title');

                        let authorBook = e.target.querySelector('.book-item__author').textContent;
                        let authorBook_ordered = document.createElement('p');
                        authorBook_ordered.textContent = authorBook;
                        authorBook_ordered.classList.add('book-item__author');

                        let priceBook = e.target.querySelector('.book-item__price').textContent;
                        let priceBook_ordered = document.createElement('p');
                        priceBook_ordered.textContent = priceBook;
                        priceBook_ordered.classList.add('book-item__price');
                        bookToBuy.append(titleBook_ordered, authorBook_ordered, priceBook_ordered, removeBtn);


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

                    booksToBuy.push(bookToBuy);

                    booksOrderList.append(bookToBuy);
                    total();
                    removeBtn.addEventListener('click', function (e) {
                        this.style.backgroundColor = "red";
                        e.preventDefault();

                        let elToRemove = e.target.parentElement;
                        booksToBuy.pop(elToRemove);
                        booksOrderList.removeChild(elToRemove);
                        total();
                    })
                }

                addToBagBtn.addEventListener('click', function (e) {
                    e.preventDefault();
                    removeBtn = document.createElement('a');
                    removeBtn.classList.add('btn-remove');
                    removeBtn.innerText = "x";
                    let titleBook = e.target.parentElement.querySelector('.book-item__title').textContent;
                    let titleBook_ordered = document.createElement('p');
                    titleBook_ordered.textContent = titleBook;
                    titleBook_ordered.classList.add('book-item__title');

                    let authorBook = e.target.parentElement.querySelector('.book-item__author').textContent;
                    let authorBook_ordered = document.createElement('p');
                    authorBook_ordered.textContent = authorBook;
                    authorBook_ordered.classList.add('book-item__author');

                    let priceBook = e.target.parentElement.querySelector('.book-item__price').textContent;
                    let priceBook_ordered = document.createElement('p');
                    priceBook_ordered.textContent = priceBook;
                    priceBook_ordered.classList.add('book-item__price');

                    let elToAdd = e.target.parentElement;
                    bookToBuy = document.createElement('div');
                    bookToBuy.classList.add('book-item');
                    bookToBuy.append(titleBook_ordered, authorBook_ordered, priceBook_ordered, removeBtn);


                    booksToBuy.push(bookToBuy);

                    booksOrderList.append(bookToBuy);

                    removeBtn.addEventListener('click', function (e) {
                        this.style.backgroundColor = "red";
                        e.preventDefault();

                        let elToRemove = e.target.parentElement;
                        booksToBuy.pop(elToRemove);
                        booksOrderList.removeChild(elToRemove);
                        total();

                    })

                    total();


                });

                showMoreBtn.addEventListener('click', function (e) {
                    e.preventDefault();
                    if (popup.classList === 'visible') {
                        popup.removeChild(bookDescription);
                        bookDescription.innerText = `${book.description}`;
                    } else {
                        popup.classList.add('visible');
                        bookDescription.innerText = `${book.description}`;
                        popup.appendChild(bookDescription)
                    }

                    closeBtn.addEventListener('click', function (e) {
                        e.preventDefault();
                        popup.classList.remove('visible');

                        popup.removeChild(bookDescription)
                    })

                });


            });

        });

    const  total = () => {
        let priceArr = [];
        booksToBuy.forEach((el)=> {

            let priceEl = el.querySelector('.book-item__price').textContent;
            let price = parseFloat(priceEl.substring(1));
            priceArr.push(price);


        })
         sum = priceArr.reduce(add, 0);
        function add(accumulator, a) {
            return accumulator + a;
        }

        totalPrice.textContent = `€ ${sum }`;
       return sum;


    }
    mainTag.append(col1, col2, popup);
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


