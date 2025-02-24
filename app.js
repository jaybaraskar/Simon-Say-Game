let gameSeq = [];
let userSeq = [];

let btns = ["red", "orange", "green", "purple"];

let level = 0;
let started = false;
let highScore = 0;

let h2 = document.querySelector("h2");
let score = document.querySelector(".h2");


document.addEventListener("keypress", function () {
    if (started == false) {
        started = true;
        console.log("Game Started!");

        levelUp();
    }
});

function levelUp() {
    userSeq = [];
    level++;
    h2.innerText = `Level ${level}`;

    let randIdx = Math.floor(Math.random() * 4);
    let randColor = btns[randIdx];
    let randBtn = document.querySelector(`.${randColor}`);

    gameSeq.push(randColor);
    // console.log(gameSeq);

    gameFlash(randBtn);
}

function gameFlash(btn) {
    btn.classList.add("flash");
    setTimeout(function () {
        btn.classList.remove("flash");
    }, 100);
}

function userFlash(btn) {
    btn.classList.add("userFlash");
    setTimeout(function () {
        btn.classList.remove("userFlash");
    }, 100);
}

function checkAns(idx) {
    if (gameSeq[idx] === userSeq[idx]) {
        if (gameSeq.length == userSeq.length) {
            setTimeout(levelUp, 1000);
        }
    } else {
        h2.innerHTML = `Game Over! Your score was ${level} <br> Press any key to try again`;
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(function () {
            document.querySelector("body").style.backgroundColor = "white";
        }, 150);
        if(highScore < level) {
            highScore = level;
        }
        score.innerText = `Highest Score: ${highScore}`;
        reset();
    }
}

function btnPressed() {
    let btn = this;
    userFlash(btn);

    let userColor = btn.getAttribute("id");
    userSeq.push(userColor);

    checkAns(userSeq.length - 1);
}

let allBtns = document.querySelectorAll(".btn");

for (btn of allBtns) {
    btn.addEventListener("click", btnPressed);
}


function reset() {
    gameSeq = [];
    userSeq = [];
    level = 0;
    started = false;
}