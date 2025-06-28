let solution = '';

function get_word() {
  const index = Math.floor(Math.random() * wordList.length);
  return wordList[index];
}

function is_valid(guess, solution) {
  return guess == solution
}

async function startup() {
  const game = document.getElementById('game');
  drawGrid(game);
  solution = get_word();
  console.log("Wordsoluce :", solution);
}

startup();
