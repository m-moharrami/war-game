let deckId;
const cardsContainer = document.getElementById("cards");
const newDeckButton = document.getElementById("new-deck");
const drawCardsButton = document.getElementById("draw-cards");

function handleClick() {
    fetch("https://apis.scrimba.com/deckofcards/api/deck/new/shuffle/")
        .then(res => res.json())
        .then(data => {
            console.log(data);
            deckId = data.deck_id;
        })
}

newDeckButton.addEventListener("click", handleClick);

function drawCards() {
    fetch(`https://apis.scrimba.com/deckofcards/api/deck/${deckId}/draw/?count=2`)
        .then(res => res.json())
        .then(data => {
            cardsContainer.children[0].innerHTML = `
                <img src=${data.cards[0].image} class="card" />
            `
            cardsContainer.children[1].innerHTML = `
                <img src=${data.cards[1].image} class="card" />
            `
        })
}

drawCardsButton.addEventListener("click", drawCards);