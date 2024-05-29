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

//КОНВЕРТЕР=======================================================================================

const usdInput = document.querySelector('#usd');
const somInput = document.querySelector('#som');
const eurInput = document.querySelector('#eur');

const fetchConversionData = async () => {
    try {
        const response = await fetch('../data/converter.json', {
            headers: {
                'Content-type': 'application/json'
            }
        });
        return await response.json();
    } catch (error) {
        console.error(error);
    }
};

const converter = (element, targetElement, secondTargetElement) => {
    element.oninput = async () => {
        const data = await fetchConversionData();
        if (!data) return;

        const value = parseFloat(element.value);

        if (element.id === 'som') {
            targetElement.value = value ? (value / data.usd).toFixed(2) : '';
            secondTargetElement.value = value ? (value / data.eur).toFixed(2) : '';
        } else if (element.id === 'usd') {
            targetElement.value = value ? (value * data.usd).toFixed(2) : '';
            secondTargetElement.value = value ? (value * data.usd / data.eur).toFixed(2) : '';
        } else if (element.id === 'eur') {
            targetElement.value = value ? (value * data.eur).toFixed(2) : '';
            secondTargetElement.value = value ? (value * data.eur / data.usd).toFixed(2) : '';
        }

        if (element.value === '') {
            targetElement.value = '';
            secondTargetElement.value = '';
        }
    };
};

converter(somInput, usdInput, eurInput);
converter(usdInput, somInput, eurInput);
converter(eurInput, somInput, usdInput);

// DRY - don't repeat yourself
// KISS - keep it simple stupid
// SOLID

// CARD SWITCHER======================================================================================================
document.addEventListener("DOMContentLoaded", () => {
    const card = document.querySelector('.card');
    const btnNext = document.querySelector('#btn-next');
    const btnPrev = document.querySelector('#btn-prev');
    let cardId = 1;

    const loadCard = async (id) => {
        try {
            const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`);
            const data = await response.json();
            const { id: cardId, title, completed } = data;
            card.style.borderColor = completed ? 'green' : 'red';
            card.innerHTML = `
                <p>${title}</p>
                <p style="color: ${completed ? 'green' : 'red'}">${completed}</p>
                <span>${cardId}</span>
            `;
        } catch (error) {
            console.error(error);
        }
    };

    btnNext.onclick = () => {
        cardId = cardId < 200 ? cardId + 1 : 1;
        loadCard(cardId);
    };

    btnPrev.onclick = () => {
        cardId = cardId > 1 ? cardId - 1 : 200;
        loadCard(cardId);
    };
    loadCard(cardId);
});
const fetchPosts = async () => {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');
        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.error(error);
    }
};

fetchPosts();

//WEATHER==========================================================================================================

const citySearchInput = document.querySelector('.cityName')
// const btnSearch = document.querySelector('#search')
const cityName =document.querySelector('.city')
const cityTemp = document.querySelector('.temp')
// const weatherBlock = document.querySelector('.weather_block')
const iconWeather = document.querySelector('.icon_weather')
const defaultIcon ='data:image/png;base64,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'

const URL = 'http://api.openweathermap.org/data/2.5/weather'
const API_KEY ='e417df62e04d3b1b111abeab19cea714'

// http://api.openweathermap.org/data/2.5/weather
// e417df62e04d3b1b111abeab19cea714
// query params - параметры запроса

const citySearch = () => {
    citySearchInput.oninput = async (event) => {
        try {
            const response = await fetch(`${URL}?q=${event.target.value}&appid=${API_KEY}`)
            const data = await response.json()
            cityName.innerHTML = data.name || 'City is not defined';
            cityTemp.innerHTML = data.main?.temp ? Math.round(data.main?.temp -273) + '&deg;C' : 'x';
            iconWeather.src = data?.weather[0]?.icon ?`https://openweathermap.org/img/wn/${data?.weather[0]?.icon}.png` : defaultIcon;
        } catch (error) {
            console.error(error)
        }
    };
}
citySearch()

//optional chaining -  ?.

// const locationObject = {
//     // address: {
//     //     street: 'Kievsckaya 44',
//     //     city: 'Bishkek'
//     // },
//     id: '#123'
// }
// console.log(locationObject.address?.street)