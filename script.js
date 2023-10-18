let circle = document.getElementById('circle');
let carSound = document.getElementById('carSound');
let brakeSound = document.getElementById('brakeSound');
let startButton = document.getElementById('startButton');
let stopButton = document.getElementById('stopButton');


let intervalId;
let seni = 1;
let intervalDuration = 0;
let count = 0;

function startButtonFunc() {
    alert("しばらくすると音が鳴り出しますのでご注意下さい。");
    
    // 開始ボタンを非表示にする
    seni = 1;
    intervalDuration = 0;
    count = 0;
    startButton.style.display = 'none';
    stopButton.style.display = 'block';

    startInterval();

}

function stopButtonFunc() {
    // 開始ボタンを表示する
    startButton.style.display = 'block';
    stopButton.style.display = 'none';

    // インターバルを停止
    clearInterval(intervalId);

    resetSounds();
    hideTextContainer();
}

function resetSounds() {
    // サウンドを停止
    carSound.pause();
    carSound.currentTime = 0;
    brakeSound.pause();
    brakeSound.currentTime = 0;

    // 赤青のクラスを削除
    circle.classList.remove('blue');
    circle.classList.remove('red');

}

function showTextContainer() {
    let textContainer = document.getElementsByClassName('text-container');
    textContainer[0].style.display = 'block';
    seni = 2;
}

function hideTextContainer() {
    let textContainer = document.getElementsByClassName('text-container');
    textContainer[0].style.display = 'none';
}

function setBlue() {
    circle.classList.remove('red');
    circle.classList.add('blue');

    // ブレーキ音を再生
    carSound.play();

    seni = 3;
}

function setRed() {
    circle.classList.remove('blue');
    circle.classList.add('red');

    // ブレーキ音を再生
    brakeSound.play();

    seni = 2;
}

function startInterval() {
    intervalId = setInterval(function () {
        switch (seni) {
            case 1:
                hideCircle();
                resetSounds();
                showTextContainer();
                intervalDuration = getRandomTime(5000, 7000);
                break;
            case 2:
                hideTextContainer();
                showCircle();
                resetSounds();
                setBlue();
                intervalDuration = getRandomTime(4500, 7000);
                break;
            case 3:
                resetSounds();
                setRed();
                intervalDuration = getRandomTime(3000, 6000);
                count++;
                if(count >= 5) {
                    count = 0;
                    seni = 1;
                }
                break;
        }
        // インターバルを挟むごとにランダムでインターバル時間を更新する
        clearInterval(intervalId);
        startInterval();
    }, intervalDuration);
}

function getRandomTime(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

adjustCircleSize();

window.addEventListener('resize', adjustCircleSize); // ウィンドウサイズが変わったときも調整

function adjustCircleSize() {
    hideCircle();

    let vw = window.innerWidth;  // viewport width
    let vh = window.innerHeight; // viewport height

    let size = (vw < vh ? vw : vh) * 0.3; // 短い辺の30%
    circle.style.width = `${size}px`;
    circle.style.height = `${size}px`;
    showCircle();
}

function showCircle() {
    circle.style.display = 'block';
}

function hideCircle() {
    circle.style.display = 'none';
}

function resizeImg() {
    var img = document.getElementById("annotationImg");
    var windowWidth = window.innerWidth;
    var windowHeight = window.innerHeight;
    var imgSize = (windowWidth < windowHeight ? windowWidth : windowHeight) * 0.8; // 画面の小さい方の80%に設定
    img.style.width = imgSize + "px";
}

// ウィンドウのリサイズ時にimgタグのサイズを再計算する
window.addEventListener("resize", resizeImg);

// 初期化時にimgタグのサイズを設定する
resizeImg();
