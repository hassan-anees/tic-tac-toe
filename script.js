// starting again

// player factory will create the players themselves
const playerFactory = (name) => {
    // this is the games won
    let score = 0;
    const getName = () => name;
    const getPlayerNumber = () => playerNumber;
    const sayHello = () => console.log("hello " + name);
    return { getName, getPlayerNumber, sayHello };
};

// This will handle the logic of the gameboard and updating it
// here have eventListeners to update the game itself
// this will handle the state of the game, ie updating score of each player
// updating the clicks from "-" to "X" based on player
// determines who wins
// every time a click is done, we want to check the state of the game, to determine if it is finished
const gameBoardModule = (() => {
    const docBoard = document.getElementsByClassName("board-container");
    const player1 = playerFactory("Jojo");
    const player2 = playerFactory("Dio");
    let winCond = false;

    let player1Turn = true;

    const board = [
        ["-", "-", "-"],
        ["-", "-", "-"],
        ["-", "-", "-"],
    ];

    const boardObject = () => board;

    const printHello = () => {
        console.log("print hello");
    };

    const checkIfThreeSame = (array) => {
        // hmm.. Can;t you do a spread operator here instead?
        let a = array[0];
        let b = array[1];
        let c = array[2];
        console.log(`this is the array (${array})`);
        console.log(`${a} vs ${b} vs ${c}`);
        if (a == b && b == c && a == c && a != "-" && b != "-" && a != "-") {
            return true;
        }
        return false;
    };

    const checkGameState = (x, y) => {
        // for all rows
        for (let i = 0; i < 3; i++) {
            console.log(board[i]);
            // covers all rows
            winCond = checkIfThreeSame(board[i]);
            if (winCond) break;

            // check columns
            winCond = checkIfThreeSame([board[0][i], board[1][i], board[2][i]]);
            if (winCond) break;

            // check diagonals
            winCond = checkIfThreeSame([board[0][0], board[1][1], board[2][2]]);
            if (winCond) break;

            winCond = checkIfThreeSame([board[0][2], board[1][1], board[2][0]]);
            if (winCond) break;
        }

        // checking draw
        let sum = 0;
        board.forEach((row) => {
            row.forEach((el) => {
                if (el != "-") {
                    sum += 1;
                }
            });
        });

        if (winCond) {
            alert("you won");
            displayBoard.resetBoard();
        }
        if (sum == 9) alert("draw");
    };

    const inputElement = (event) => {
        // here we want to be able to toggle between characters in inner html
        let currentBtn = event.target;

        //need to change inner html based on a few factors
        // Who's turn it is!
        // Check if it is already already full, i.e not '-'
        // check if having this determines if the game is won!
        console.log(currentBtn.innerHTML);
        // getting the index from the id
        let i = currentBtn.id.split(",")[0];
        let j = currentBtn.id.split(",")[1];
        console.log(`[${i},${j}]`);
        // if the spot isn't taken
        if (currentBtn.innerHTML != "O" || currentBtn.innerHTML != "X") {
            if (currentBtn.innerHTML == "-") {
                if (player1Turn) {
                    board[i][j] = "X";
                    currentBtn.innerHTML = "X";
                    // console.log("random text");
                    // console.log(player1.getName());
                    player1Turn = false;
                    console.log(board);
                } else {
                    board[i][j] = "O";
                    currentBtn.innerHTML = "O";
                    // console.log("random text2");
                    // console.log(player2.getName());
                    player1Turn = true;
                    console.log(board);
                }
                // we want to check state of game every time there is an input
                checkGameState(i, j);
            }
        }
    };

    document.addEventListener("DOMContentLoaded", () => {
        // Here there should be some event listeners to see if button is clicked
        // ORRR listener on the div ORRR do a querry selector all, and make an array ??
        let btnEl = document.querySelector("button");
        // btnEl.addEventListener("click", printHello);

        // gets all the button elements
        document.querySelectorAll("button").forEach((elemet) => {
            // elemet.addEventListener("click", printHello);
            elemet.addEventListener("click", inputElement);
        });
    });

    return {
        boardObject,
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
        gameBoardModule.boardObject().forEach((array, i) => {
            // want to create each div
            console.log(array);
            // creating the div for each array
            let divEl = document.createElement("div");
            divEl.className = "board-row";
            gameBoardDivEl.appendChild(divEl);
            array.forEach((element, j) => {
                // want to create each button
                let index = `${i},${j}`;
                let btnEl = document.createElement("button");
                btnEl.className = "tic-button";
                btnEl.innerHTML = element;
                btnEl.id = index;
                divEl.appendChild(btnEl);
            });
        });
    };

    const resetBoard = () => {
        gameBoardModule.boardObject().forEach((array, i) => {
            console.log("RESET");
            let divEl = document.querySelector("#board-row");
            array.forEach((element, j) => {
                // want to create each button
                let btnEl = document.getElementById(`${i},${j}`);
                btnEl.innerHTML = "-";
                gameBoardModule.boardObject()[i][j] = "-";
            });
        });
        console.log(gameBoardModule.boardObject());
    };

    return {
        consoleBoardValues,
        iterate,
        resetBoard,
    };
})();

// displayBoard.consoleBoardValues();
displayBoard.iterate();
