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

//Telegram BOT===========================================================

const form = document.querySelector('form')
const token ='6427056237:AAHfLngWI9tCCI90kQRJIIW65rhqAch_DyE'
const chatId = '@casa_artista'
const URL_API = `https://api.telegram.org/bot${token}/sendMessage`

form.onsubmit = async (event) => {
    event.preventDefault()
    const {name, phone} = Object.fromEntries(new FormData(form).entries())
    const text = `Name: ${name}\nPhone: ${phone}`

    await fetch(URL_API, {
        method: 'POST',
        headers:{'Content-type' : 'application/json'},
        body: JSON.stringify({chat_id: chatId, text})
    })
}
// const formData =new FormData(form)
// console.log(formData)
// const object = {
//     name: "Castian",
//     number:'123'
// }
