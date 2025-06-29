function colorizeGuess(guess, solution) {
  const solutionLetters = solution.split('');
  const guessLetters = guess.split('');
  const rowBoxes = [];

  for (let i = 0; i < 5; i++)
    rowBoxes.push(document.getElementById(`box${currentRow}${i}`))

  for (let i = 0; i < 5; i++)
    {
    if (guessLetters[i] === solutionLetters[i])
    {
      rowBoxes[i].classList.add('correct')
      solutionLetters[i] = null
      guessLetters[i] = null
    }
  }

  for (let i = 0; i < 5; i++)
  {
    if (guessLetters[i] !== null)
    {
      const index = solutionLetters.indexOf(guessLetters[i])
      if (index !== -1)
      {
        rowBoxes[i].classList.add('present')
        solutionLetters[index] = null
      }
      else
        rowBoxes[i].classList.add('absent')
    }
  }
}

function showMessage(text)
{
  const messageDiv = document.getElementById('message')
  messageDiv.textContent = text;
}

function enter(guess) {
  colorizeGuess(guess, solution);

  if (!is_valid(solution, guess)) {
    document.body.classList.add("shake");
    setTimeout(() => {
      document.body.classList.remove("shake");
    }, 400);
    if (currentRow === 2)
      document.getElementById("crack1").style.opacity = 1
    else if (currentRow === 3)
      document.getElementById("crack3").style.opacity = 1
    else if (currentRow === 5)
      document.getElementById("crack4").style.opacity = 1

    currentCol = 0;
    currentRow++;
    return;
  }
  isPaused = true;
  for (let i = 0; i < 5; i++) {
    const box = document.getElementById(`box${currentRow}${i}`);
  }

  launchConfetti();
  document.getElementById("crack1").style.opacity = 0
  document.getElementById("crack3").style.opacity = 0
  document.getElementById("crack4").style.opacity = 0
  launchFireworks();
  showVictory();

  setTimeout(() => {
    isPaused = false;
    resetGame();
  }, 7000);
}


function letter(key)
{
  if (currentCol < 5)
  {
    const box = document.getElementById(`box${currentRow}${currentCol}`)
    box.textContent = key.toUpperCase()
    box.classList.add('filled')
    setTimeout(() => box.classList.remove('filled'), 200)

    currentCol++
  }
}

function backspace()
{
  if (currentCol > 0)
  {
    currentCol--
    const box = document.getElementById(`box${currentRow}${currentCol}`)
    box.textContent = ''
  }
}