const navMenu = ['Books', 'AudioBooks', 'New']
const socials = [
    {
        img: '../../assets/icons/facebook.png',
        name: 'Facebook',
        link: 'https://www.facebook.com/'
    },
    {
        img: '../../assets/icons/linkedin.png',
        name: 'Linkedin',
        link: 'https://www.linkedin.com/'
    },
    {
        img: '../../assets/icons/instagram.png',
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

}

function makeFooter() {
    const footer = new DocumentFragment();
    const footerTag = document.createElement('footer');
    const socialsWrap = document.createElement('ul');

    socials.forEach(function (socialItem) {
        let li = document.createElement('li');
        console.log(socialItem)
        socialsWrap.appendChild(li);
        li.insertAdjacentHTML("beforeend", `<a href="#"><img src="${socialItem.img}" alt="${socialItem.name}"></a>`)
    });

    footer.append(footerTag)
    footerTag.append(socialsWrap);
    app.append(footer)
}


fetch('../assets/script/books.json') //path to the file with json data
    .then(response => {
        return response.json();
    })
    .then(data => {
        console.log(data);
    });
