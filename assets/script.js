const questions = [
  {
    questionText:
      "Q1.Commonly used data types DO NOT include:",
    options:
      ["1. strings", "2. booleans", "3. alerts", "4. numbers"],
    answer:
      "3. alerts",
  },
  {
    questionText:
      "Q2.Arrays in JavaScript can be used to store ______.",
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
      "Q3.String values must be enclosed within _____ when being assigned to variables.",
    options:
      ["1. commas", "2. curly brackets", "3. quotes", "4. parentheses"],
    answer:
      "3. quotes",
  },
  {
    questionText:
      "Q4.A very useful tool used during development and debugging for printing content to the debugger is:",
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
      "Q5.Which of the following is a statement that can be used to terminate a loop, switch or label statement?",
    options:
      ["1. break", "2. stop", "3. halt", "4. exit"],
    answer:
      "1. break",
  },
];

// ------------------------------------- All elements and variables -------------------------------------
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

let highscores = JSON.parse(localStorage.getItem("highscores"));
if (highscores === null) { highscores = {} }
let sortedHighscores = Object.entries(highscores).sort((a, b) => b[1] - a[1]);
// ------------------------------------- All elements and variables -------------------------------------


// ------------------------------------- All Functions -------------------------------------
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

timer = () => {
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
  }, 1000);
}

showQuestions = (i) => {
  if (i >= 5) {
    const playerPoints = document.querySelector(".points");
    playerPoints.innerHTML = `${points}`;
    startTime = 0;
    gameEnd();
    return;
  }

  // Set the question
  const question = document.querySelector(".question");
  question.innerHTML = `${questions[i].questionText}`;

  // result: Correct/Incorrect
  let result = document.querySelector("#result");
  for (const option of questions[i].options) {
    const optionVal = document.createElement("p");
    optionVal.classList.add("option");
    optionVal.innerHTML = option;
    question.appendChild(optionVal);
  }

  let answerText = "";
  let multipleOptions = document.querySelectorAll(".option");
  for (const selectedOption of multipleOptions) {
    selectedOption.addEventListener("click", () => {
      answerText = selectedOption.innerHTML;
      unhideElement(hr);
      if (answerText === questions[i].answer) {
        result.innerHTML = "Correct!";
        points += 10;
      } else {
        result.innerHTML = "Incorrect!";
        startTime -= 10;
      }

      setTimeout(() => {
        i++;
        showQuestions(i);
        result.innerHTML = "";
        hideElement(hr);
      }, 1000);
    });
  }
};

gameEnd = () => {
  timerVal.innerHTML = 0;
  hideElement(box);
  hideElement(questionsBox);
  hideElement(highscoresBox)
  unhideElement(endBox);
};
// ------------------------------------- All Functions -------------------------------------

// ------------------------------------- All Button Actions -------------------------------------
startBtn.addEventListener("click", () => {
  startGame();
  showQuestions(0);
  hideElement(box);
  hideElement(highscoresBox);
  unhideElement(questionsBox);
})

back.addEventListener("click", () => {
  hideElement(questionsBox);
  hideElement(highscoresBox);
  unhideElement(box);
})

highscoreBtn.addEventListener("click", () => {
  hideElement(box);
  hideElement(questionsBox);
  hideElement(endBox);
  unhideElement(highscoresBox);

  highscores = JSON.parse(localStorage.getItem("highscores"));
  sortedHighscores = Object.entries(highscores).sort((a, b) => b[1] - a[1]);

  if (highscores !== null) {
    // print highscores to page in ordered list
    const list = document.querySelector("ol");
    // remove all previous childs of ol
    while (list.firstChild) {
      list.removeChild(list.firstChild);
    }
    for (const [key, value] of sortedHighscores) {
      const li = document.createElement("li");
      li.innerHTML = `${key}: ${value}`;
      list.appendChild(li);
    }
  } else {
    highscores = {};
  }
});

clearHighscores.addEventListener("click", () => {
  highscores = {};
  localStorage.setItem("highscores", JSON.stringify(highscores));
  showStartScreen();
});

submit.addEventListener("click", () => {
  if (points != 0) {
    highscores[playerName.value] = points;
    sortedHighscores = Object.entries(highscores).sort((a, b) => b[1] - a[1]);
    localStorage.setItem("highscores", JSON.stringify(highscores));
  }
  showStartScreen();
});
// ------------------------------------- All Button Actions -------------------------------------

// timer for game
if (startTime > 0) {
  timer();
}