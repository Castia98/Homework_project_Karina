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