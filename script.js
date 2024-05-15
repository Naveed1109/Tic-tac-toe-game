console.log("Welcome to Tic Tac Toe");

let audioTurn = new Audio("Touch.mp3");
let gameover = new Audio("finish.mp3");
let turn = "X";
let isgameover = false;
let player1Name = localStorage.getItem("player1") || "Player 1";
let player2Name = localStorage.getItem("player2") || "Player 2";

// Function to change the turn
const changeTurn = () => {
  return turn === "X" ? "O" : "X";
};

// Function to check for a win
const checkWin = () => {
  let boxtext = document.getElementsByClassName("boxtext");
  let wins = [
    [0, 1, 2, 5, 5, 0],
    [3, 4, 5, 5, 15, 0],
    [6, 7, 8, 5, 25, 0],
    [0, 3, 6, -5, 15, 90],
    [1, 4, 7, 5, 15, 90],
    [2, 5, 8, 15, 15, 90],
    [0, 4, 8, 5, 15, 45],
    [2, 4, 6, 5, 15, 135],
  ];
  for (let e of wins) {
    if (
      boxtext[e[0]].innerText === boxtext[e[1]].innerText &&
      boxtext[e[2]].innerText === boxtext[e[1]].innerText &&
      boxtext[e[0]].innerText !== ""
    ) {
      document.querySelector(".info").innerText = `${boxtext[e[0]].innerText === "X" ? player1Name : player2Name} Won!`;
      isgameover = true;
      document.querySelector(".imgbox").getElementsByTagName("img")[0].style.width = "200px";
      document.querySelector(".line").style.transform = `translate(${e[3]}vw, ${e[4]}vw) rotate(${e[5]}deg)`;
      document.querySelector(".line").style.width = "20vw";
      gameover.play(); // Play game over sound
      break;
    }
  }
};

// Function to check for a draw
const checkDraw = () => {
  let boxtext = document.getElementsByClassName("boxtext");
  let isDraw = Array.from(boxtext).every((box) => box.innerText !== "");
  if (isDraw && !isgameover) {
    document.querySelector(".info").innerText = "It's a Draw!";
    isgameover = true;
    gameover.play(); // Play game over sound
  }
};

// Function to start the game
const startGame = () => {
  document.querySelector(".info").innerText = `Turn for ${player1Name}`;
  document.querySelector(".player-input").style.display = "none";
  document.querySelector(".gameContainer").style.display = "flex"; // Use "flex" to allow the grid to show "X" and "O"
  music.play(); // Play background music
};

// Game Logic
let boxes = document.getElementsByClassName("box");
Array.from(boxes).forEach((element) => {
  let boxtext = element.querySelector(".boxtext");
  element.addEventListener("click", () => {
    if (boxtext.innerText === "" && !isgameover) {
      boxtext.innerText = turn;
      turn = changeTurn();
      audioTurn.play();
      checkWin();
      checkDraw();
      if (!isgameover) {
        document.querySelector(".info").innerText = `Turn for ${turn === "X" ? player1Name : player2Name}`;
      }
    }
  });
});

// Add onclick listener to reset button
reset.addEventListener("click", () => {
  let boxtexts = document.querySelectorAll(".boxtext");
  Array.from(boxtexts).forEach((element) => {
    element.innerText = "";
  });
  turn = "X";
  isgameover = false;
  document.querySelector(".line").style.width = "0vw";
  document.querySelector(".imgbox").getElementsByTagName("img")[0].style.width = "0px";
  document.querySelector(".info").innerText = `Turn for ${player1Name}`;
});

// Add onclick listener to start game button
document.getElementById("startGame").addEventListener("click", startGame);
