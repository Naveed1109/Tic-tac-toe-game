document.addEventListener("DOMContentLoaded", function () {
  const playerForm = document.getElementById("playerForm");

  playerForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const player1 = document.getElementById("player1").value;
    const player2 = document.getElementById("player2").value;

    // Store player names in localStorage
    localStorage.setItem("player1", player1);
    localStorage.setItem("player2", player2);

    // Redirect to the main game page (index.html)
    window.location.href = "index.html";
  });
});
