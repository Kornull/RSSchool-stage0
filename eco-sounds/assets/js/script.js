const logo = document.querySelector('.header__logo');
const btnPlay = document.querySelector('.btn__play--pause');
const birdList = document.querySelector('.bird__list');
const birdItem = document.querySelectorAll('.bird-item');
const mainBg = document.querySelector('.main');
const repeat = document.querySelector('.btn__repeat');
const audio = new Audio();
let isPlay = false;
let clickBird;

// Logo click
logo.addEventListener(('click'), () => {
  cleanList();

  logo.classList.toggle('active');
  if (logo.classList.contains('active')) {
    isPlay = true;
    playAudio('forest');
  } else {
    pauseAudio();
  }
})
// Run player
function playAudio(numSong) {
  uncklickBtn()
  if (numSong !== undefined) {
    mainBg.style.backgroundImage = `url('./assets/img/birdImg/${numSong}.jpg')`;
    audio.src = `./assets/audio/${numSong}.mp3`;
  } else {
    audio.src = `./assets/audio/forest.mp3`;
  }
  if (isPlay === true) {
    btnPlay.classList.add('play');
    audio.play();
  }
  else {
    audio.pause();
  }
}
function pauseAudio() {
  btnPlay.classList.remove('play');
  audio.pause();
}
// Selection of bird sounds
birdList.addEventListener('click', (ev) => {
  clickBird = ev.target.dataset.set;
  logo.classList.remove('active');
  cleanList();
  ev.target.classList.add('play');
  isPlay = true;
  playAudio(clickBird);
})


// Button start/stop
btnPlay.addEventListener('click', (ev) => {
  // class check
  for (let i of birdItem) {
    if (i.classList.contains('play')) {
      clickBird = i.dataset.set;
    }
  }
  if (logo.classList.contains('active')) { clickBird = 'forest' };

  if (isPlay === false) {
    isPlay = true;
    playAudio(clickBird);
  }
  else if (isPlay === true) {
    isPlay = false;
    pauseAudio();
  }
})



function cleanList() {
  birdItem.forEach(el => el.classList.remove('play'));
}

// Turn off btn
function uncklickBtn() {
  let interval = setInterval(() => {
    if (!btnPlay.classList.contains('play')) { return clearInterval(interval) };
    let sec = Math.floor((audio.currentTime));
    let min = Math.floor((audio.duration));
    if (repeat.classList.contains('repeat')) { if (sec === min) {playAudio(); return clearInterval(interval) }}
    if (sec === min) {
      clearInterval(interval);
      return pauseAudio();
    }
  }, 1000);

}

// btnPlay.addEventListener('click', uncklickBtn);
repeat.addEventListener('click', (ev) => {
  repeat.classList.toggle('repeat');
}
);