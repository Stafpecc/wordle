let currentRow = 0
let currentCol = 0
let isPaused = false;

function animateVictoryText() {
  const el = document.getElementById('victoryText');
  if (!el) return;

  let posX = Math.random() * (window.innerWidth - el.offsetWidth);
  let posY = Math.random() * (window.innerHeight - el.offsetHeight);
  let velX = 0;  // vitesse horizontale
  let velY = 30;  // vitesse verticale

  el.style.position = 'fixed';

  function step() {
    posX += velX;
    posY += velY;

    if (posX + el.offsetWidth >= window.innerWidth || posX <= 0) velX = -velX;
    if (posY + el.offsetHeight >= window.innerHeight || posY <= 0) velY = -velY;

    el.style.left = posX + 'px';
    el.style.top = posY + 'px';

    requestAnimationFrame(step);
  }

  step();
}


function showVictory() {
  const el = document.getElementById('victoryText');
  el.style.display = 'block';
  animateVictoryText();
}

function launchConfetti()
{
	const duration = 5 * 1000
	const animationEnd = Date.now() + duration
	const defaults = { startVelocity: 30, spread: 360, ticks: 600, zIndex: 1000 }
  
	const interval = setInterval(function ()
  {
	  const timeLeft = animationEnd - Date.now()
  
	  if (timeLeft <= 0)
    {
		clearInterval(interval)
		return
	  }
  
	  const x1 = Math.random()
	  const x2 = Math.random()
	  confetti(Object.assign({}, defaults, { particleCount: 30, origin: { x: x1, y: Math.random() * 0.5 } }))
	  confetti(Object.assign({}, defaults, { particleCount: 30, origin: { x: x2, y: Math.random() * 0.5 } }))
	}, 200)
}

let fireworks;

function launchFireworks() {
  const container = document.getElementById('fireworks-container');

  if (!fireworks) {
    fireworks = new Fireworks.default(container, {
      rocketsPoint: { min: 0, max: 100 },
      hue: { min: 0, max: 360 },
      delay: { min: 15, max: 30 },
      speed: 2,
      intensity: 33.07,
      acceleration: 1.05,
      friction: 2.98,
      gravity: 1,
      particles: 50,
      trace: 3,
      explosion: 5,
    });
  }

  fireworks.start();

  setTimeout(() => {
    fireworks.stop();
  }, 6000);
}


function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function resetGame() {
  if (fireworks) {
    fireworks.stop();
  }
  document.getElementById("crack1").style.opacity = 0
  document.getElementById("crack3").style.opacity = 0
  document.getElementById("crack4").style.opacity = 0

  const victoryText = document.getElementById('victoryText');
  if (victoryText) {
    victoryText.style.display = 'none';
  }

  await sleep(100);

  for (let row = 0; row <= 6; row++) {
    for (let col = 0; col < 5; col++) {
      const box = document.getElementById(`box${row}${col}`);
      if (box) {
        box.textContent = '';
        box.classList.remove('correct', 'present', 'absent');
      }
    }
  }
  currentRow = 0;
  currentCol = 0;
  solution = getWordOfTheDay();
  console.log("Wordsoluce :", solution);
}


function drawGrid(container)
{
  const grid = document.createElement('div')
  grid.className = 'grid'

  for (let i = 0 ; i < 6 ; i++)
  {
    for (let j = 0 ; j < 5 ; j++)
    {
      const box = document.createElement('div')
      box.className = 'box'
      box.id = `box${i}${j}`
      grid.appendChild(box)
    }
  }

  container.appendChild(grid)
}

document.addEventListener('keydown', (event) => {
  if (isPaused) return;

  const key = event.key;

  if (currentRow >= 6) {
    showMessage("FIN DU JEU");
    const crack = document.getElementById('crack');
    const redOverlay = document.getElementById('redOverlay');
    const game = document.getElementById('game');

    game.classList.add('shake');

    isPaused = true;
    setTimeout(() => {
      game.classList.remove('shake');
      isPaused = false;
      resetGame();
    }, 4000);

    return;
  }

  if (/^[a-zA-Z]$/.test(key)) {
    letter(key);
    showMessage("");
  } else if (key === 'Backspace') {
    backspace();
    showMessage("");
  } else if (key === 'Enter') {
    let guess = '';
    for (let i = 0; i < 5; i++) {
      const box = document.getElementById(`box${currentRow}${i}`);
      guess += box.textContent.toLowerCase();
    }

    if (!wordList.includes(guess)) {
      showMessage("Mot non reconnu dans la liste !");
    } else {
      enter(guess);
    }
  }
});

