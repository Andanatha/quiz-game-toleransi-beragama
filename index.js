const option = {
    eropa: "Pemahaman dan praktik toleransi lebih berkembang selama Abad Pencerahan di?",
    tujuhbelas: "Pada abad keberapa pemahaman dan praktik lebih berkembang selama pencerahan di eropa abad ke ",
    tolerare: "Apa nama latin dari toleransi?",
    vihara: "Apa nama tempat ibadah agama Buddha?",
    gereja: "Apa nama tempat ibadah agama Kristen?",
    masjid: "Apa nama tempat ibadah agama Islam?",
    pura: "Apa nama tempat ibadah agama Hindu?",
    kelenteng: "Apa nama tempat ibadah agama Khonghucu?",
    pastor: "Apa nama imam untuk agama Katolik?",
    pendeta: "Apa nama imam untuk agama Protestan?",
    pandita: "Apa nama imam untuk agama Hindu",
    biksu: "Apa nama imam untuk agama Buddha?",
    pendeta: "Apa nama imam untuk agama Khonghucu?",
    ustad: "Apa nama imam untuk agama Islam?",
    enambelas: "Berapa banyak RT dalam RW.04 kelurahan Jamika?",
    satu: "Undang-Undang Dasar 1945 Kerukunan dan Toleransi antar umat beragama terdapat dalam pasal 29 dan ayat?",
    natal: "Hari besar agama Kristen",
    idulfitri: "Hari besar agama islam",
    nyepi: "Hari besar agama Hindu",
    waisak: "Hari besar agama Buddha",
    imlek: "Hari besar agama Khonghucu",
}

const message = document.getElementById("message");
const hintRef = document.querySelector(".hint-ref");
const controls = document.querySelector(".controls-container");
const startBtn = document.getElementById("start");
const letterContainer = document.getElementById("letter-container");
const userInpSection = document.getElementById("user-input-section");
const resultText = document.getElementById("result");
const scoreDisplay = document.getElementById("score-display");
const word = document.getElementById("word");
const words = Object.keys(option);
let randomWord = "",
    randomHint = "";
let winCount = 0,
    lossCount = 0;
let totalGames = 0; 
let userScore = 100;
 
const generateRandomValue = (array) => Math.floor(Math.random() * array.length);

const blocker = () => {
    let lettersButtons = document.querySelectorAll(".letters");
    stopGame();
};

startBtn.addEventListener("click", () => {
    controls.classList.add("hide");
    init();
});

const stopGame = () => {
    controls.classList.remove("hide");
};

const displayScore = () => {
    scoreDisplay.innerText = `Tingkat Toleransi ${userScore}%`;

    localStorage.setItem("userScore", userScore);
};


const generateWord = () => {
    letterContainer.classList.remove("hide");
    userInpSection.innerText = "";
    randomWord = words[generateRandomValue(words)];
    randomHint = option[randomWord];
    hintRef.innerHTML = `<div id="wordHint">
  <span>Hint: </span>${randomHint}</div>`;
    let displayItem = "";
    randomWord.split("").forEach((value) => {
        displayItem += '<span class="inputSpace">_ </span>';
    });
    userInpSection.innerHTML = displayItem;
    userInpSection.innerHTML += `<div id='chanceCount'>Chances Left: ${lossCount}</div>`;
};

const updateScore = () => {
    if (winCount == randomWord.length) {
        userScore += 5;
    } else if (lossCount == 0) {

        userScore -= 10;
    }

    userScore = Math.max(userScore, 0);
    displayScore();

    localStorage.setItem("userScore", userScore);
};

const loadLocalStorage = () => {
    const savedUserScore = localStorage.getItem("userScore");

    if (savedUserScore !== null) {
        userScore = parseInt(savedUserScore);
        displayScore();
      }
}

const init = () => {
    winCount = 0;
    lossCount = 5;
    randomWord = "";
    word.innerText = "";
    randomHint = "";
    message.innerText = "";
    userInpSection.innerHTML = "";
    letterContainer.classList.add("hide");
    letterContainer.innerHTML = "";
    generateWord();

    totalGames += 1;
    loadLocalStorage();
    displayScore();


    for (let i = 65; i < 91; i++) {
        let button = document.createElement("button");
        button.classList.add("letters");
        button.innerText = String.fromCharCode(i);
        button.addEventListener("click", () => {
            message.innerText = `Correct Letter`;
            message.style.color = "#008000";
            let charArray = randomWord.toUpperCase().split("");
            let inputSpace = document.getElementsByClassName("inputSpace");
           
            if (charArray.includes(button.innerText)) {
                charArray.forEach((char, index) => {
                 
                    if (char === button.innerText) {
                        button.classList.add("correct");
                        
                        inputSpace[index].innerText = char;
                       
                        winCount += 1;
                        
                        if (winCount == charArray.length) {
                            resultText.innerHTML = "You Won";
                            startBtn.innerText = "Restart";
                            
                            blocker();
                            updateScore();
                        }
                    }
                });
            } else {
              
                button.classList.add("incorrect");
                lossCount -= 1;
                document.getElementById(
                    "chanceCount"
                ).innerText = `Chances Left: ${lossCount}`;
                message.innerText = `Incorrect Letter`;
                message.style.color = "#ff0000";
                if (lossCount == 0) {
                    word.innerHTML = `The word was: <span>${randomWord}</span>`;
                    resultText.innerHTML = "Game Over";
                    blocker();
                    updateScore();
                }
            }
            
            button.disabled = true;
        });
        
        letterContainer.appendChild(button);
    }
};
window.onload = () => {
    init();
};