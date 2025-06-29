let solution = '';

function getWordOfTheDay() {
  const daySeed = getDaysSinceEpoch();
  const index = seededRandom(daySeed) * wordList.length;
  return wordList[Math.floor(index)];
}

function getDaysSinceEpoch() {
  const now = new Date();
  const start = new Date(1990, 0, 5);
  const diffTime = now - start;
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
}

function seededRandom(seed) {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

function is_valid(guess, solution)
{ 
  return guess == solution
}

let wordList = [];

async function loadWordList() {
  try {
    const response = await fetch('words.txt');
    if (!response.ok) throw new Error('Fail word.txt');
    const text = await response.text();
    wordList = text.split('\n').map(w => w.trim()).filter(w => w.length === 5);
    console.log(`List (${wordList.length} word)`);
  } catch (error) {
    console.error('Fail load word.txt:', error);
  }
}

async function startup() {
  const game = document.getElementById('game');
  drawGrid(game);
  await loadWordList();
  solution = getWordOfTheDay();
  console.log("Soluce :", solution);
}

startup();


