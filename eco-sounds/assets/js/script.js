const logo = document.querySelector('.header__logo');
const btnPlay = document.querySelector('.btn__play--pause');
const birdList = document.querySelector('.bird__list');
const birdItem = document.querySelectorAll('.bird-item');
const mainBg = document.querySelector('.bg__img');
const repeat = document.querySelector('.btn__repeat');
const audio = new Audio();
let isPlay = false;
let clickBird;

const birdName = [
  'drozd',
  'forest',
  'javoronok',
  'slavka',
  'solovey',
  'zarynka',
  'morning',
  'kamishovka'
];

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

// Clean bird list
function cleanList() {
  birdItem.forEach(el => el.classList.remove('play'));
}

// Turn off btn
function uncklickBtn() {
  let interval = setInterval(() => {
    let sec = Math.floor((audio.currentTime));
    let min = Math.floor((audio.duration));
    if (repeat.classList.contains('repeat')) {
      if (sec === min) {
        let numbName = Math.floor(Math.random(0, birdName.length) * 10)
        playAudio(birdName[numbName]);
        return clearInterval(interval);
      }
    }
    if (!repeat.classList.contains('repeat')) {
      if (sec === min) {
        pauseAudio();
        return clearInterval(interval)
      }
    }
  }, 1000);

}
// Run player
function playAudio(numSong) {
  uncklickBtn()
  // checking a random value from uncklickBtn
  birdItem.forEach(x => {
    if (x.dataset.set === numSong) {
      console.log(x.dataset.set === numSong)
      cleanList();
      x.classList.add('play');
    }
  })

  if (numSong !== undefined) {
    mainBg.src = `./assets/img/birdImg/${numSong}.jpg`;
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

// btnPlay.addEventListener('click', uncklickBtn);
repeat.addEventListener('click', (ev) => {
  repeat.classList.toggle('repeat');
}
);