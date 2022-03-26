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

let points = 0;

startBtn.addEventListener("click", () => {
  box.classList.remove("unhide");
  highscoresBox.classList.remove("unhide");
  box.classList.add("hide");
  highscoresBox.classList.add("hide");

  questionsBox.classList.remove("hide");
  questionsBox.classList.add("unhide");
  console.log("startBtn");
})

back.addEventListener("click", () => {
  questionsBox.classList.remove("unhide");
  highscoresBox.classList.remove("unhide");
  questionsBox.classList.add("hide");
  highscoresBox.classList.add("hide");

  box.classList.remove("hide");
  box.classList.add("unhide");
  console.log("back");
})

highscoreBtn.addEventListener("click", () => {
  box.classList.remove("unhide");
  box.classList.add("hide");
  questionsBox.classList.remove("unhide");
  questionsBox.classList.add("hide");

  highscoresBox.classList.remove("hide");
  highscoresBox.classList.add("unhide");
  console.log("highscoreBtn");
})


// timer for 50 sec
let timerVal = document.querySelector("span");
let start = 50;
setInterval(function () {
  if (start > 0) {
    --start;
    timerVal.innerHTML = start;
  } else {
    box.classList.remove("unhide");
    box.classList.add("hide");
    questionsBox.classList.remove("unhide");
    questionsBox.classList.add("hide");
    highscoresBox.classList.remove("unhide");
    highscoresBox.classList.add("hide");

    endBox.classList.remove("hide");
    endBox.classList.add("unhide");
  }
}, 1000); // update about every second


// let highscores = { "DF": 10, "AG": 19, "JK": 43 };
// localStorage.setItem("highscores", JSON.stringify(highscores));
let highscores = JSON.parse(localStorage.getItem("highscores"));
// console.log(highscores);

const sortedHighscores = Object.entries(highscores).sort((a, b) => b[1] - a[1]);
// console.log(sortedHighscores);

// print highscores to page in ordered list
const list = document.querySelector("ol");
for (const [key, value] of sortedHighscores) {
  const li = document.createElement("li");
  li.innerHTML = `${key}: ${value}`;
  list.appendChild(li);
}

// questions & answer
// for (const [questionText, options, answer] of questions) {
const question = document.querySelector(".question");
question.innerHTML = `${questions[0].questionText}`;
let result = document.querySelector("#result");

for (const option of questions[0].options) {
  const button = document.createElement("p");
  button.classList.add("option");
  button.innerHTML = option;
  question.appendChild(button);
}
let answerText = "";
optionSelected = document.querySelectorAll(".option");
console.log(optionSelected);
for (const option of optionSelected) {
  option.addEventListener("click", () => {
    console.log("clicked");
    answerText = option.innerHTML;
    if (answerText === questions[0].answer) {
      result.innerHTML = "Correct!";
      points++;
      console.log(points);
    } else {
      result.innerHTML = "Incorrect!";

    }
  });
}

// }