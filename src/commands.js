
function enter()
{
  if (currentCol === 5)
  {
    let guess = '';

    for (let i = 0; i < 5; i++)
    {
      const box = document.getElementById(`box${currentRow}${i}`);
      guess += box.textContent.toLowerCase();
    }

    if (!is_valid(solution, guess))
    {
      alert("Mot invalide !");
      currentCol = 0;
      currentRow++;
    }
    else
    {
      alert("Mot valide !");
      resetGame();
    }    
  }
}

function letter(key)
{
  if (currentCol < 5)
  {
    const box = document.getElementById(`box${currentRow}${currentCol}`);
    box.textContent = key.toUpperCase();
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