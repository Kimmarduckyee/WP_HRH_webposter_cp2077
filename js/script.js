// 효과음
const soundOpen = new Audio('./assets/open.mp3');
const soundClose = new Audio('./assets/close.mp3');


soundOpen.volume = 0.35;
soundClose.volume = 0.3;

function playCardSound(isOpen) {
  if (isOpen) {
    soundClose.pause();        
    soundOpen.currentTime = 0; 
    soundOpen.play().catch(() => {});
  } else {
    soundOpen.pause();
    soundClose.currentTime = 0;
    soundClose.play().catch(() => {});
  }
}


// 조니브이카드
const charV = document.querySelector('.standing-v');
const charJohnny = document.querySelector('.standing-johnny');
const cardV = document.getElementById('card-v');
const cardJohnny = document.getElementById('card-johnny');


charV.addEventListener('click', (e) => {
  e.stopPropagation();
  cardV.classList.toggle('active');
  playCardSound(cardV.classList.contains('active'));
});

charJohnny.addEventListener('click', (e) => {
  e.stopPropagation();
  cardJohnny.classList.toggle('active');
  playCardSound(cardJohnny.classList.contains('active'));
});


cardV.addEventListener('click', (e) => e.stopPropagation());
cardJohnny.addEventListener('click', (e) => e.stopPropagation());

document.body.addEventListener('click', () => {
  if (cardV.classList.contains('active') || cardJohnny.classList.contains('active')) {
    playCardSound(false);
  }
  cardV.classList.remove('active');
  cardJohnny.classList.remove('active');
});


// 패럴랙스
window.addEventListener('mousemove', (e) => {
  const x = (e.clientX / window.innerWidth - 0.5) * 2;
  const y = (e.clientY / window.innerHeight - 0.5) * 2;

  document.documentElement.style.setProperty('--mx', x);
  document.documentElement.style.setProperty('--my', y);
});

window.addEventListener('mouseleave', () => {
  document.documentElement.style.setProperty('--mx', 0);
  document.documentElement.style.setProperty('--my', 0);
});


// 마우스 잔상
let lastX = 0;
let lastY = 0;

const sandeTrail = [
  { src: './assets/Pointer_Blue.png', glow: '#00f0ff' },
  { src: './assets/Pointer_Red.png',  glow: '#ff003c' }
];
let trailIndex = 0;

window.addEventListener('mousemove', (e) => {
  const dist = Math.hypot(e.clientX - lastX, e.clientY - lastY);

  if (dist > 14) {
    lastX = e.clientX;
    lastY = e.clientY;

    const current = sandeTrail[trailIndex % sandeTrail.length];
    trailIndex++;

    const ghost = document.createElement('img');
    ghost.src = current.src;
    ghost.className = 'sandevistan-ghost';
    ghost.style.left = `${e.clientX}px`;
    ghost.style.top = `${e.clientY}px`;
    ghost.style.setProperty('--glow', current.glow);

    document.body.appendChild(ghost);

    setTimeout(() => {
      ghost.remove();
    }, 320);
  }
});