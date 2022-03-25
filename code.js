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

function determineWinner(card1, card2) {
    const cardValues = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "JACK", "QUEEN", "KING", "ACE"];
    const card1ValueIndex = cardValues.indexOf(card1.value);
    const card2ValueIndex = cardValues.indexOf(card2.value);

    console.log("card 1: " + card1ValueIndex);
    console.log("card 2: " + card2ValueIndex);

    if (card1ValueIndex > card2ValueIndex) {
        console.log("card 1 wins!");
    } else if (card1ValueIndex < card2ValueIndex) {
        console.log("card 2 wins!");
    } else {
        console.log("it's a tie!");
    }
}

const card1Obj = {
    value: "2"
};
const card2Obj = {
    value: "ACE"
};

determineWinner(card1Obj, card2Obj);