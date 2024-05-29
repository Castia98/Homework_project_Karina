(async () => {
    const cardContainer = document.querySelector('#card-container');
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');
        const data = await response.json();
        renderCards(data);
    } catch (error) {
        console.error(error);
    }
})();

const renderCards = (posts) => {
    const cardContainer = document.querySelector('#card-container');
    cardContainer.innerHTML = '';
    posts.forEach(post => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.innerHTML = `
            <img src="https://www.pixelempire.com/cdn/shop/products/TLOU211x14Insta_600x.jpg?v=1597502925" alt="Card Image">
            <div class="card-title">${post.title}</div>
            <div class="card-description">${post.body}</div>
        `;
        cardContainer.appendChild(card);
    });
};