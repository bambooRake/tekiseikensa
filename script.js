let circle = document.getElementById('circle');
let carSound = document.getElementById('carSound');
let brakeSound = document.getElementById('brakeSound');
let startButton = document.getElementById('startButton');

function startSounds() {
    // 開始ボタンを非表示にする
    startButton.style.display = 'none';

    // 初期状態として青に設定して、次に切り替えるまでの待ち時間を設定
    setBlue();
}


function setRed() {
    circle.classList.remove('blue');
    circle.classList.add('red');

    // 加速音を停止
    carSound.pause();
    carSound.currentTime = 0;

    // ブレーキ音を再生
    brakeSound.play();

    let timeoutDuration = getRandomTime(2000, 5000); // 2-5秒
    setTimeout(setBlue, timeoutDuration);
}

function setBlue() {
    circle.classList.remove('red');
    circle.classList.add('blue');

    // ブレーキ音を停止
    brakeSound.play();
    brakeSound.pause();
    brakeSound.currentTime = 0;

    // 加速音を再生
    carSound.play();

    let timeoutDuration = getRandomTime(4000, 8000); // 4-8秒
    setTimeout(setRed, timeoutDuration);
}

function getRandomTime(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}


adjustCircleSize();

window.addEventListener('resize', adjustCircleSize); // ウィンドウサイズが変わったときも調整

function adjustCircleSize() {
    let vw = window.innerWidth;  // viewport width
    let vh = window.innerHeight; // viewport height

    let size = (vw < vh ? vw : vh) * 0.5; // 短い辺の30%
    circle.style.width = `${size}px`;
    circle.style.height = `${size}px`;
}
