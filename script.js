// player factory will create the players themselves
const playerFactory = (name) => {
    // this is the games won
    let score = 0;
    const getName = () => name;
    const getScore = () => score;
    const getPlayerNumber = () => playerNumber;
    const sayHello = () => console.log("hello " + name);
    const updateScore = () => {
        score += 1;
    };

    const getPlayerInfo = () => {
        return `name: ${name}\nscore: ${score}`;
    };
    return { getName, getPlayerNumber, sayHello, updateScore, getPlayerInfo, getScore };
};

// This will handle the logic of the gameboard and updating it
// here have eventListeners to update the game itself
// this will handle the state of the game, ie updating score of each player
const gameBoardModule = (() => {
    const docBoard = document.getElementsByClassName("board-container");
    const player1 = playerFactory("John Doe");
    const player2 = playerFactory("Jane Doe");
    let p1Name = document.querySelector(".player1-info .name");
    let p1Score = document.querySelector(".player1-info .score");
    let p2Name = document.querySelector(".player2-info .name");
    let p2Score = document.querySelector(".player2-info .score");
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
        // hmm can also do the spread operator
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

        // Win condition
        if (winCond) {
            console.log(player1Turn);
            let gameStatusEl = document.querySelector(".game-status");
            // alert("you won");
            console.log("You won!!!!");
            // displayBoard.resetBoard();
            if (player1Turn) {
                gameStatusEl.innerHTML = "Player 1 WON";
                player1.updateScore();
                p1Score.innerHTML = `Score: ${player1.getScore()}`;
                console.log(player1.getScore());
                displayBoard.disableBoard(true);
            } else {
                gameStatusEl.innerHTML = "Player 2 WON";
                player2.updateScore();
                // gets all the button elements
                p2Score.innerHTML = `Score: ${player2.getScore()}`;
                console.log(player2.getScore());
                displayBoard.disableBoard(true);
            }
        }
        // Draw Condition
        if (sum == 9 && !winCond) {
            let gameStatusEl = document.querySelector(".game-status");
            gameStatusEl.innerHTML = "Draw";
        }
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
                    checkGameState(i, j);
                    player1Turn = false;
                    console.log(board);
                } else {
                    board[i][j] = "O";
                    currentBtn.innerHTML = "O";
                    checkGameState(i, j);
                    player1Turn = true;
                    console.log(board);
                }
                // we want to check state of game every time there is an input
            }
        }
    };

    document.addEventListener("DOMContentLoaded", () => {
        //// displaying player info
        p1Name.innerHTML = `Name: ${player1.getName()}`;
        p1Score.innerHTML = `Score: ${player1.getScore()}`;
        p2Name.innerHTML = `Name: ${player2.getName()}`;
        p2Score.innerHTML = `Score: ${player2.getScore()}`;

        // gets all the button elements
        document.querySelectorAll("button").forEach((elemet) => {
            // elemet.addEventListener("click", printHello);
            elemet.addEventListener("click", inputElement);
        });

        let restartBtnEl = document.querySelector(".restart-btn");
        restartBtnEl.addEventListener("click", displayBoard.resetBoard);
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

    const disableBoard = (isDisabled) => {
        document.querySelectorAll(".board-container button").forEach((elemet) => {
            console.log("IN DISABLE" + isDisabled);
            // elemet.addEventListener("click", printHello);
            if (isDisabled) {
                elemet.disabled = true;
            } else {
                elemet.disabled = false;
            }
        });
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
        disableBoard(false);
        console.log(gameBoardModule.boardObject());
    };

    return {
        consoleBoardValues,
        iterate,
        resetBoard,
        disableBoard,
    };
})();

displayBoard.iterate();
