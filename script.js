
const accordion = function (id) {
    let element = document.querySelectorAll('#' + id);

    if (element.length > 1 || element.length == 0) return;
    element = element[0];

    const titles = element.querySelectorAll('h3');

    if (titles.length == 0) return;

    const show = function (event) {
        const parent = event.target.closest('div');

        if (!parent) return;

        const list = element.children;

        for (let i = 0; i < list.length; i++) {
            if (!parent.classList.contains('active')) list[i].classList.remove('active');
        }

        parent.classList.toggle('active');
    };

    titles.forEach(title => {
        title.addEventListener('click', show);
    });
}

accordion('ac1');



const tabs = function (id) {
    let element = document.querySelectorAll('#' + id);

    if (element.length > 1 || element.length == 0) return;
    element = element[0];

    const tabs = element.querySelectorAll('.tab');
    const contents = element.querySelectorAll('.tab__content');

    if (tabs.length == 0 ||
        contents.length == 0 ||
        tabs.length != contents.length
    ) return;

    const show = function (event, index) {
        tabs.forEach((tab, index) => {
            tab.classList.remove('active');
            contents[index].classList.remove('active');
        });

        event.target.classList.add('active');
        contents[index].classList.add('active');
    };

    tabs.forEach((tab, index) => {
        tab.addEventListener('click', event => {
            show(event, index);
        });
    });

    tabs[0].click();
}

tabs('tabs1');


/*
    data-popup="<id>"
    data-popup="zoom"
*/

const popup = function () {
    /*
    - image
    - content
    */

    const elems = document.querySelectorAll('[data-popup]');
    if (elems.length == 0) return;

    const close = function () {
        let popup = document.querySelector('.popup');

        if (!popup) return;

        popup.remove();
    }

    const show = function (event) {
        event.preventDefault();

        let name = event.target.dataset.popup;

        if (name == undefined && event.target.tagName == 'IMG') {
            const aImg = event.target.closest('a');

            if (!aImg) return;

            name = aImg.dataset.popup;
        }

        if (!name) return;

        let content = null;

        if (name == 'zoom') {
            const aImg = event.target.closest('a');
            const aHref = aImg.href;

            if (aHref.length == 0) return;

            content = `<img src="${aHref}" />`;
        } else {
            let idCont = document.querySelectorAll('#' + name);

            if (idCont.length > 1 || idCont.length == 0) return;
            idCont = idCont[0];

            content = idCont.innerHTML;
        }

        if (!content) return;

        let popupContent = document.querySelector('.popup__content');

        if (!popupContent) {
            const popup = document.createElement('div');
            popup.classList.add('popup');

            const popupClose = document.createElement('button');
            popupClose.classList.add('popup__close');
            popupClose.innerHTML = 'X';

            popupContent = document.createElement('div');
            popupContent.classList.add('popup__content');

            popup.append(popupClose, popupContent);

            document.body.append(popup);

            popupClose.addEventListener('click', close);
        }

        popupContent.innerHTML = content;
    }

    elems.forEach(elem => {
        elem.addEventListener('click', show);
    });
};

popup();