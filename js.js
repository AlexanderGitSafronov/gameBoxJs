const btn = document.querySelector('.button__game');
const game = document.querySelector('.game');
const time = document.querySelector('.time')
const timerHeader = document.querySelector('.timer');
const resultGame = document.querySelector('.resul__game')
const resulGameNumb = document.querySelector('.resul__game_numb')
const input = document.querySelector('.input__game input')
let score = 0;
let isGameStarter = false;
const arrColor = ['#fdbb2d','#fc466b','#fd1d1d','#003973','#cc95c0','#3ca55c']

btn.addEventListener('click', startGame);
game.addEventListener('click', handelboxClick);
input.addEventListener('input',setGameTime)

function startGame () {
    setGameTime();
    input.setAttribute('disabled', 'true');
    isGameStarter = true;
    score = 0;
    let interval = setInterval(()=> {
        let timer = parseFloat(time.textContent);
        if(timer <= 0) {
            clearInterval(interval);
            endGame();
        } else {
            time.textContent = (timer - 0.1).toFixed(1)
        }
        
    },100)
    game.style.backgroundColor = '#fff'
    btn.classList.add('hide');
    
    renderBox();
}   
function setScoreGame() {
    resulGameNumb.textContent = score.toString();
}
function setGameTime() {
    let timeStart = +input.value;
    time.textContent = timeStart.toFixed(1);
    timerHeader.classList.remove('hide');
    resultGame.classList.add('hide');
}
function endGame() {
    isGameStarter = false;
    btn.classList.remove('hide');
    game.style.backgroundColor = 'lavender'
    game.innerHTML = '';
    timerHeader.classList.add('hide');
    resultGame.classList.remove('hide');
    input.removeAttribute('disabled', 'true');
    setScoreGame();
}

function renderBox() {
    game.innerHTML = '';
    let boxSize = getRandom(30,100)
    let colorRandom = getRandom(0,arrColor.length);
    let box = document.createElement('div');
    box.style.height = box.style.width = boxSize + 'px'
    let gameSize = game.getBoundingClientRect();
    let maxTop = gameSize.height - boxSize
    let maxLeft = gameSize.width - boxSize
    box.style.position = 'absolute'
    box.style.backgroundColor = arrColor[colorRandom];
    box.style.left = getRandom(0, maxLeft) + 'px'
    box.style.top = getRandom(0, maxTop) + 'px'
    box.style.cursor = 'pointer'
    box.style.borderRadius = '10px'
    box.setAttribute('data-box', 'true')
    game.insertAdjacentElement('afterbegin', box)
}

function getRandom(min,max) {
    return Math.floor(Math.random() * (max-min) + min);
}



function handelboxClick(event) {
    if(!isGameStarter) {
        return 
    }
    if(event.target.dataset.box) {
        score++;
        renderBox();
        
    }
   
}
