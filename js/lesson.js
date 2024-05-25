// //PHONE CHECKER
const phoneInput = document.querySelector("#phone_input");
const phoneButton = document.querySelector("#phone_button");
const phoneResult = document.querySelector("#phone_result");

const regExp = /^\+996 [2579]\d{2} \d{2}-\d{2}-\d{2}$/

phoneButton.onclick = () => {
    if (regExp.test(phoneInput.value)) {
        phoneResult.innerHTML = "OK"
        phoneResult.style.color = "green"
    }else {
        phoneResult.innerHTML = "NOT OK"
        phoneResult.style.color = "red"
    }
}

//TAB SLIDER ---------------------------------------------------------------------------------------------

const tabContentBlocks = document.querySelectorAll('.tab_content_block');
const tabContentItems = document.querySelectorAll('.tab_content_item');
const tabsParent = document.querySelector('.tab_content_items');
let currentIndex = 0;
let intervalId;

const hideTabContent = () => {
    tabContentBlocks.forEach(item => item.style.display = "none");
    tabContentItems.forEach(item => item.classList.remove('tab_content_item_active'));
};

const showTabContent = (index = 0) => {
    tabContentBlocks[index].style.display = 'block';
    tabContentItems[index].classList.add('tab_content_item_active');
};

const nextSlide = () => {
    currentIndex = (currentIndex + 1) % tabContentBlocks.length;
    hideTabContent();
    showTabContent(currentIndex);
};

const startSlider = () => {
    if (!intervalId) intervalId = setInterval(nextSlide, 3000);
};

const stopSlider = () => {
    clearInterval(intervalId);
    intervalId = null;
};

tabsParent.onclick = (event) => {
    const clickedIndex = [...tabContentItems].indexOf(event.target);
    if (clickedIndex !== -1) {
        currentIndex = clickedIndex;
        hideTabContent();
        showTabContent(currentIndex);
        stopSlider();
        if (!intervalId) setTimeout(startSlider, 0);
    }
};

hideTabContent();
showTabContent(currentIndex);
startSlider();

//КОНВЕРТЕР=================================================================

const usdInput = document.querySelector('#usd')
const somInput = document.querySelector('#som')
const eurInput = document.querySelector('#eur')


const converter = (element, targetElement, secondTargetElement) => {
    element. oninput = () => {
        const request = new XMLHttpRequest()
        request.open('GET','../data/converter.json')
        request.setRequestHeader('Content-type','application/json')
        request.send()

        request.onload = () => {
        const data = JSON.parse(request.response)
            if (element.id === 'som') {
                targetElement.value = (element.value /data.usd).toFixed(2)
                secondTargetElement.value = (element.value /data.eur).toFixed(2)
            }
            if (element.id === 'usd') {
                targetElement.value = (element.value * data.usd).toFixed(2)
                secondTargetElement.value = (element.value * data.usd / data.eur).toFixed (2)
            }
            if (element.id === 'eur') {
                targetElement.value = (element.value * data.eur).toFixed(2)
                secondTargetElement.value = (element.value * data.eur / data.usd).toFixed(2)

            }
            if (element.value === '') {
                targetElement.value = '';
                secondTargetElement.value = ''
            }
        //  element.value === '' ? targetElement.value = '' : ''
        //  element.value === '' && (targetElement.value = '')
        }
    }
}
converter(somInput, usdInput, eurInput)
converter(usdInput, somInput, eurInput)
converter(eurInput,somInput, usdInput)

// DRY - don't repeat yourself
// KISS - keep it simple stupid
// SOLID

// CARD SWITCHER======================================================================================================

const card = document.querySelector('.card');
const btnNext = document.querySelector('#btn-next');
const btnPrev = document.querySelector('#btn-prev');
let cardId = 1;
const loadCard = (id) => {
    fetch(`https://jsonplaceholder.typicode.com/todos/${id}`)
        .then(response => response.json())
        .then(data => {
            const { id, title, completed } = data;
            card.style.borderColor = completed ? 'green' : 'red';
            card.innerHTML = `
                <p>${title}</p>
                <p style="color: ${completed ? 'green' : 'red'}">${completed}</p>
                <span>${id}</span>
            `;
        })
};

btnNext.onclick = () => {
    cardId = cardId < 200 ? cardId +1 : 1;
    loadCard(cardId);
};

btnPrev.onclick = () => {
    cardId = cardId > 1 ? cardId -1 : 200;
    loadCard(cardId);
};

loadCard(cardId);
fetch('https://jsonplaceholder.typicode.com/posts')
    .then(response => response.json())
    .then(data => {
        console.log('Posts data:', data);
    });