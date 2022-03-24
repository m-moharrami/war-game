let deckId;

function handleClick() {
    fetch("https://apis.scrimba.com/deckofcards/api/deck/new/shuffle/")
        .then(res => res.json())
        .then(data => {
            console.log(data);
            deckId = data.deck_id;
        })
}

document.getElementById("new-deck").addEventListener("click", handleClick);

function drawCards() {
    fetch(`https://apis.scrimba.com/deckofcards/api/deck/${deckId}/draw/?count=2`)
        .then(res => res.json())
        .then(data => {
            document.getElementById("cards").children[0].innerHTML = `
                <img src=${data.cards[0].image} class="card" />
            `
            document.getElementById("cards").children[1].innerHTML = `
                <img src=${data.cards[1].image} class="card" />
            `
        })
}

document.getElementById("draw-cards").addEventListener("click", drawCards);