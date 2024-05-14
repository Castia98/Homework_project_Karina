//Modal
const modal = document.querySelector('.modal')
const modalTrigger = document.querySelector('#btn-get')
const modalCloseBtn = document.querySelector('.modal_close')

const openModal = ()=> {
    modal.style.display = 'block'
    document.body.style.overflow = 'hidden'
}

const closeModal = () => {
    modal.style.display = 'none'
    document.body.style.overflow = ''
}

modalTrigger.onclick = openModal
modalCloseBtn.onclick = closeModal

modal.onclick = (event) => {
    event.target === modal && closeModal();
};

let isModalShown = false;

const showModalOnScrollEnd = () => {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight && !isModalShown) {
        openModal();
        window.removeEventListener('scroll', showModalOnScrollEnd);
    }
};

const showModalAfterDelay = () => {
    setTimeout(() => {
        if (!isModalShown && !document.hidden) {
            openModal();
            window.removeEventListener('scroll', showModalOnScrollEnd);
        }
    }, 10000);
};

window.addEventListener('scroll', showModalOnScrollEnd);
showModalAfterDelay();