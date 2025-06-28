let currentRow = 0;
let currentCol = 0;

function drawGrid(container) \
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

  if (/^[a-zA-Z]$/.test(key))
  {
    if (currentCol < 5)
    {
      const box = document.getElementById(`box${currentRow}${currentCol}`);
      box.textContent = key.toUpperCase();
      currentCol++;
    }
  }
  else if (key === 'Backspace')
  {
    if (currentCol > 0)
    {
      currentCol--;
      const box = document.getElementById(`box${currentRow}${currentCol}`);
      box.textContent = '';
    }
  }
  else if (key === 'Enter')
  {
    if (currentCol === 5)
      console.log('Valider mot');
  }
});

function startup()
{
  const game = document.getElementById('game');
  drawGrid(game);
}

startup();
