function colorizeGuess(guess, solution) {
  const solutionLetters = solution.split('');
  const guessLetters = guess.split('');
  const rowBoxes = [];

  for (let i = 0; i < 5; i++)
    rowBoxes.push(document.getElementById(`box${currentRow}${i}`));

  for (let i = 0; i < 5; i++)
    {
    if (guessLetters[i] === solutionLetters[i])
    {
      rowBoxes[i].classList.add('correct');
      solutionLetters[i] = null;
      guessLetters[i] = null;
    }
  }

  for (let i = 0; i < 5; i++)
  {
    if (guessLetters[i] !== null)
    {
      const index = solutionLetters.indexOf(guessLetters[i]);
      if (index !== -1)
      {
        rowBoxes[i].classList.add('present');
        solutionLetters[index] = null;
      }
      else
        rowBoxes[i].classList.add('absent');
    }
  }
}

function showMessage(text)
{
  const messageDiv = document.getElementById('message');
  messageDiv.textContent = text;
}

function enter(guess) {
  colorizeGuess(guess, solution);

  if (!is_valid(solution, guess)) {
    currentCol = 0;
    currentRow++;
  } else {
    isPaused = true;
    for (let i = 0; i < 5; i++) {
  const box = document.getElementById(`box${currentRow}${i}`);
}

    launchConfetti();
    launchFireworks();
    showVictory();

    setTimeout(() => {
      isPaused = false;
      resetGame();
    }, 7000);
  }
}

function letter(key)
{
  if (currentCol < 5)
  {
    const box = document.getElementById(`box${currentRow}${currentCol}`);
    box.textContent = key.toUpperCase();
    box.classList.add('filled');
    setTimeout(() => box.classList.remove('filled'), 200);

    currentCol++;
  }
}

function backspace()
{
  if (currentCol > 0)
  {
    currentCol--;
    const box = document.getElementById(`box${currentRow}${currentCol}`);
    box.textContent = '';
  }
}