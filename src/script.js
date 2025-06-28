let currentRow = 0;
let currentCol = 0;

function resetGame()
{
  for (let row = 0; row <= 6; row++)
  {
    for (let col = 0; col < 5; col++)
    {
      const box = document.getElementById(`box${row}${col}`);
      if (box)
        box.textContent = '';
    }
  }
  currentRow = 0;
  currentCol = 0;
  solution = get_word();
  console.log("Wordsoluce :", solution);
}

function drawGrid(container)
{
  const grid = document.createElement('div');
  grid.className = 'grid';

  for (let i = 0; i < 6; i++)
  {
    for (let j = 0; j < 5; j++)
    {
      const box = document.createElement('div');
      box.className = 'box';
      box.id = `box${i}${j}`;
      grid.appendChild(box);
    }
  }

  container.appendChild(grid);
}

document.addEventListener('keydown', (event) => {
  const key = event.key;

  if (currentRow >= 6)
  {
    alert("FIN DU JEU");
    resetGame();
  }

  if (/^[a-zA-Z]$/.test(key))
    letter(key)
  else if (key === 'Backspace')
    backspace()
  else if (key === 'Enter')
    enter()
});
