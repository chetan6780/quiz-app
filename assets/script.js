const questions = [
  {
    questionText:
      "Commonly used data types DO NOT include:",
    options:
      ["1. strings", "2. booleans", "3. alerts", "4. numbers"],
    answer:
      "3. alerts",
  },
  {
    questionText:
      "Arrays in JavaScript can be used to store ______.",
    options:
      [
        "1. numbers and strings",
        "2. other arrays",
        "3. booleans",
        "4. all of the above",
      ],
    answer:
      "4. all of the above",
  },
  {
    questionText:
      "String values must be enclosed within _____ when being assigned to variables.",
    options:
      ["1. commas", "2. curly brackets", "3. quotes", "4. parentheses"],
    answer:
      "3. quotes",
  },
  {
    questionText:
      "A very useful tool used during development and debugging for printing content to the debugger is:",
    options:
      [
        "1. JavaScript",
        "2. terminal/bash",
        "3. for loops",
        "4. console.log",
      ],
    answer:
      "4. console.log",
  },
  {
    questionText:
      "Which of the following is a statement that can be used to terminate a loop, switch or label statement?",
    options:
      ["1. break", "2. stop", "3. halt", "4. exit"],
    answer:
      "1. break",
  },
];

const box = document.querySelector(".box");
const questionsBox = document.querySelector(".box__questions");
const highscoresBox = document.querySelector(".box__highscores")
const endBox = document.querySelector(".box__end");
const startBtn = document.querySelector(".start-btn");
const highscoreBtn = document.querySelector(".highscore-btn");
const back = document.querySelector(".back");
const hr = document.querySelector("hr");
const playerName = document.querySelector("input");
const submit = document.querySelector(".submit");
const clearHighscores = document.querySelector(".clrHighScore");


let points = 0;
let timerVal = document.querySelector("span");
let startTime = 50;

let stopHere = true;

// function to toggle hide and unhide
hideElement = (element) => {
  element.classList.remove("unhide");
  element.classList.add("hide");
};
unhideElement = (element) => {
  element.classList.remove("hide");
  element.classList.add("unhide");
};

startGame = () => {
  points = 0;
  startTime = 50;
}

showStartScreen = () => {
  unhideElement(box);
  hideElement(questionsBox);
  hideElement(highscoresBox);
  hideElement(endBox);
}

startBtn.addEventListener("click", () => {
  startGame();
  hideElement(box);
  hideElement(highscoresBox);
  unhideElement(questionsBox);
})

back.addEventListener("click", () => {
  hideElement(questionsBox);
  hideElement(highscoresBox);
  unhideElement(box);
})

gameEnd = () => {
  hideElement(box);
  hideElement(questionsBox);
  hideElement(highscoresBox)
  unhideElement(endBox);
};


// timer for 50 sec
setInterval(function () {
  if (startTime > 0) {
    --startTime;
    timerVal.innerHTML = startTime;
  } else {
    if (stopHere) {
      gameEnd();
      stopHere = false;
    }
  }
}, 1000); // update about every second


// questions & answer

questionFunction = (i) => {
  if (i >= 5) {
    const playerPoint = document.querySelector(".points");
    playerPoint.innerHTML = `${points}`;
    gameEnd();
    return;
  }

  const question = document.querySelector(".question");
  question.innerHTML = `${questions[i].questionText}`;

  let result = document.querySelector("#result");
  for (const option of questions[i].options) {
    const button = document.createElement("p");
    button.classList.add("option");
    button.innerHTML = option;
    question.appendChild(button);
  }

  let answerText = "";
  optionSelected = document.querySelectorAll(".option");
  for (const option of optionSelected) {
    option.addEventListener("click", () => {
      answerText = option.innerHTML;
      unhideElement(hr);
      if (answerText === questions[i].answer) {
        result.innerHTML = "Correct!";
        points += 10;
      } else {
        startTime -= 10;
        result.innerHTML = "Incorrect!";
      }
      setTimeout(() => {
        i++;
        questionFunction(i);
        result.innerHTML = "";
        hideElement(hr);
      }, 1000);
    });
  }
};

questionFunction(0);



// let highscores = { "DF": 10, "AG": 19, "JK": 43 };
let highscores = JSON.parse(localStorage.getItem("highscores"));
if (highscores === null) { highscores = {} }
let sortedHighscores = Object.entries(highscores).sort((a, b) => b[1] - a[1]);

highscoreBtn.addEventListener("click", () => {
  hideElement(box);
  hideElement(questionsBox);
  hideElement(endBox);
  unhideElement(highscoresBox);

  highscores = JSON.parse(localStorage.getItem("highscores"));
  console.log(highscores);
  sortedHighscores = Object.entries(highscores).sort((a, b) => b[1] - a[1]);

  if (highscores !== null) {
    // print highscores to page in ordered list
    const list = document.querySelector("ol");
    for (const [key, value] of sortedHighscores) {
      const li = document.createElement("li");
      li.innerHTML = `${key}: ${value}`;
      list.appendChild(li);
    }
  } else {
    highscores = {};
  }
  console.log("highscoreBtn");
})

clearHighscores.addEventListener("click", () => {
  highscores = {};
  localStorage.setItem("highscores", JSON.stringify(highscores));
})

submit.addEventListener("click", () => {
  showStartScreen();

  if (points != 0) {
    highscores[playerName.value] = points;
    sortedHighscores = Object.entries(highscores).sort((a, b) => b[1] - a[1]);
    localStorage.setItem("highscores", JSON.stringify(highscores));
  }

});
// }
