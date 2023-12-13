let currPrawnTile;
let currPizzaTile;
let score = 0;
let gameOver = false;

document.querySelectorAll("div.image").forEach((divElement) => {
  divElement.addEventListener("click", (event) => {
    const height =
      window.innerHeight ||
      document.documentElement.clientHeight ||
      document.body.clientHeight;
    this.scrollBy(0, height);
    this.scroll({
      behavior: "smooth",
    });

  });
});

window.onload = function () {
  setGame();
};

function setGame() {
  for (let i = 0; i < 9; i++) {
    //i goes from 0 to 8, but stops at 9
    let tile = document.createElement("div");
    tile.id = i.toString();
    tile.addEventListener("click", selectTile);
    document.getElementById("board").appendChild(tile);
  }
  //sets how often a prawn or pizza appears
  setInterval(setPrawn, 1000); //this is measured in milliseconds so, it's one seconds.
  setInterval(setPizza, 1000); //one seconds.
}

/* this sets a random number and returns it as a string so we can add an ID to it*/
function getRandomTile() {
  const num = Math.floor(Math.random() * 9);
  return num.toString();
}

function setPrawn() {
  if (gameOver) {
    return;
  }
  //this gets rid of the previous prawn/shrimp before adding a new one.
  if (currPrawnTile) {
    currPrawnTile.innerHTML = "";
  }

  let prawn = document.createElement("img");
  prawn.src = "prawn.png";
  /* this sets the num to the function and adds the prawn*/
  let num = getRandomTile();
  if (currPizzaTile && currPrawnTile.id == num) {
    return; //it won't assign anything to the tiles for one 'round'.
  }
  currPrawnTile = document.getElementById(num);
  currPrawnTile.appendChild(prawn); //takes random tile and adds the image inside so it can put a prawn inside.
}

function setPizza() {
  if (gameOver) {
    return;
  }
  if (currPizzaTile) {
    currPizzaTile.innerHTML = "";
  }

  let pizza = document.createElement("img");
  pizza.src = "pizza-slice.png";

  let num = getRandomTile();
  currPizzaTile = document.getElementById(num);

  if (currPrawnTile && currPizzaTile && currPrawnTile.id == num) {
    return;
  }

  currPizzaTile.appendChild(pizza);
}

function selectTile() {
  if (gameOver) {
    return;
  }

  if (this == currPrawnTile) {
    score += 1;
    document.getElementById("score").innerText = score.toString(); //update score
  } else if (this == currPizzaTile) {
    document.getElementById("score").innerText =
      "Your resolution lasted " + score.toString() + " days";
    gameOver = true;
  }
}