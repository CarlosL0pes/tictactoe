const squares = document.querySelectorAll(".square");
const resetBtn = document.querySelector(".reset");

let playerX = "X";
let playerO = "O";
let currentPlayer = playerX;
let gameOver = false;

// Fonction qui change le joueur en cours
function changePlayer() {
  currentPlayer = currentPlayer === playerX ? playerO : playerX;
}

// Fonction qui vérifie si un joueur a gagné
function checkWin() {
  const winCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  for (let i = 0; i < winCombos.length; i++) {
    const [a, b, c] = winCombos[i];
    if (
      squares[a].textContent === currentPlayer &&
      squares[b].textContent === currentPlayer &&
      squares[c].textContent === currentPlayer
    ) {
        // Le joueur a gagné ! On ajoute une classe "winning-row" aux cases de la ligne gagnante
        squares[a].classList.add("winning-row");
        squares[b].classList.add("winning-row");
        squares[c].classList.add("winning-row");
  
        return true;
      }
    }
  
    return false;
  }

// Fonction qui gère le clic sur une case
function handleSquareClick(e) {
  const clickedSquare = e.target;
  
  // Si la case est déjà jouée ou que la partie est terminée, on ne fait rien
  if (clickedSquare.textContent !== "" || gameOver) {
    return;
  }

  // On joue le symbole du joueur en cours et on change de joueur
  clickedSquare.textContent = currentPlayer;
  changePlayer();

  // On vérifie si le joueur a gagné
  if (checkWin()) {
    alert(`Le joueur ${currentPlayer} a gagné !`);
    gameOver = true;
  }
}

// Fonction qui gère le clic sur le bouton Reset
function handleResetClick() {
  // On réinitialise toutes les cases
  squares.forEach(square => square.textContent = "");

  // On réinitialise les variables de jeu
  currentPlayer = playerX;
  gameOver = false;
}

// On écoute les clics sur chaque case
squares.forEach(square => square.addEventListener("click", handleSquareClick));

// On écoute le clic sur le bouton Reset
resetBtn.addEventListener("click", handleResetClick);