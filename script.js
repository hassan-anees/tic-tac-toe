// starting again
// This will handle the logic of the gameboard and updating it
// here have eventListeners to update the game itself
// this will handle the state of the game, ie updating score of each player
// updating the clicks from "-" to "X" based on player
// determines who wins
// every time a click is done, we want to check the state of the game, to determine if it is finished
const gameBoardModule = (() => {
    const docBoard = document.getElementsByClassName("board-container");
    const board = [
        ["x", "o", "x"],
        ["x", "o", "x"],
        ["x", "o", "x"],
    ];

    const boardObject = () => board;

    // creating the players
    const createPlayers = () => {
        const player1 = playerFactory("Jojo");
        const player2 = playerFactory("Dio");
    };

    const printHello = () => {
        console.log("print hello");
    };

    const inputElement = (event) => {
        // here we want to be able to toggle between characters in inner html
        let currentBtn = event.target;
        //need to change inner html based on a few factors
        // Who's turn it is!
        // Check if it is already already full, i.e not '-'
        // check if having this determines if the game is won!
        console.log(event.target.innerHTML);
    };

    document.addEventListener("DOMContentLoaded", () => {
        // Here there should be some event listeners to see if button is clicked
        // ORRR listener on the div ORRR do a querry selector all, and make an array ??
        let btnEl = document.querySelector("button");
        btnEl.addEventListener("click", printHello);

        // gets all the button elements
        document.querySelectorAll("button").forEach((elemet) => {
            elemet.addEventListener("click", printHello);
            elemet.addEventListener("click", inputElement);
        });

        // OR get the container and make sure whats clicked is a button
        // const wrapper = document.querySelector(".board-container");

        // wrapper.addEventListener("click", (event) => {
        //     const isButton = event.target.nodeName === "BUTTON";
        //     if (!isButton) {
        //         return;
        //     }

        //     // console.dir(event.target.id);
        //     console.log("Button!");
        // });
    });

    return {
        boardObject,
        createPlayers,
    };
})();

const displayBoard = (() => {
    // We can get the values for the array itself in here and then take that data
    const consoleBoardValues = () => {
        console.log(gameBoardModule.boardObject());
    };

    const iterate = () => {
        let gameBoardDivEl = document.querySelector(".board-container");
        // console.log("length is:" + gameBoardDivEl);
        // the styles should sort out the  displays
        gameBoardModule.boardObject().forEach((array) => {
            // want to create each div
            console.log(array);
            // creating the div for each array
            let divEl = document.createElement("div");
            divEl.className = "board-row";
            gameBoardDivEl.appendChild(divEl);
            array.forEach((element) => {
                // want to create each button
                let btnEl = document.createElement("button");
                btnEl.className = "tic-button";
                btnEl.innerHTML = element;

                // let card = document.createElement("div");
                // card.className = "card";
                // card.innerHTML = element;
                console.log(element);
                console.log("appending");
                divEl.appendChild(btnEl);
                // divEl.appendChild(card);
            });
        });
    };
    return {
        consoleBoardValues,
        iterate,
    };
})();

displayBoard.consoleBoardValues();
displayBoard.iterate();

// player factory will create the players themselves
const playerFactory = (name) => {
    // this is the games won
    let score = 0;
    const getName = () => name;
    const getPlayerNumber = () => playerNumber;
    const sayHello = () => console.log("hello " + name);
    return { getName, getPlayerNumber, sayHello };
};
