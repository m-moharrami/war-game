let deckId;
let computerScore = 0;
let playerScore = 0;
const cardsContainer = document.getElementById("cards");
const newDeckButton = document.getElementById("new-deck");
const drawCardsButton = document.getElementById("draw-cards");
const gameInfo = document.getElementById("game-info");
const remainingText = document.getElementById("remaining");
const computerScoreContainer = document.getElementById("computer-score");
const playerScoreContainer = document.getElementById("player-score");

function handleClick() {
    fetch("https://apis.scrimba.com/deckofcards/api/deck/new/shuffle/")
        .then(res => res.json())
        .then(data => {
            remainingText.textContent = `Remaining Cards: ${data.remaining}`;
            console.log(data);
            deckId = data.deck_id;
        })
}

newDeckButton.addEventListener("click", handleClick);

function drawCards() {
    fetch(`https://apis.scrimba.com/deckofcards/api/deck/${deckId}/draw/?count=2`)
        .then(res => res.json())
        .then(data => {
            remainingText.textContent = `Remaining Cards: ${data.remaining}`;
            cardsContainer.children[0].innerHTML = `
                <img src=${data.cards[0].image} class="card" />
            `
            cardsContainer.children[1].innerHTML = `
                <img src=${data.cards[1].image} class="card" />
            `
            const winnerText = determineWinner(data.cards[0], data.cards[1]);
            console.log(winnerText);
            gameInfo.textContent = winnerText;

            if (data.remaining === 0) { 
                drawCardsButton.setAttribute('disabled', ''); 
                if (playerScore > computerScore) {
                    gameInfo.textContent = "You won this game!";
                } else if (computerScore > playerScore) {
                    gameInfo.textContent = "Computer won this game!";
                } else {
                    gameInfo.textContent = "There is no fucking winner!";
                }
            }
        })
}

drawCardsButton.addEventListener("click", drawCards);

function determineWinner(card1, card2) {
    const cardValues = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "JACK", "QUEEN", "KING", "ACE"];
    const card1ValueIndex = cardValues.indexOf(card1.value);
    const card2ValueIndex = cardValues.indexOf(card2.value);

    if (card1ValueIndex > card2ValueIndex) {
        computerScore++;
        computerScoreContainer.textContent = `Computer score: ${computerScore}`;
        return "Computer wins!";
    } else if (card1ValueIndex < card2ValueIndex) {
        playerScore++;
        playerScoreContainer.textContent = `My score: ${playerScore}`;
        return "You win!";
    } else { 
        return "WAR!";
    }
}