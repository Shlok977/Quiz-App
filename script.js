document.addEventListener("DOMContentLoaded", () => {

  const questions = [
    {
      question: "Which language runs in a web browser?",
      answers: [
        { text: "Java", correct: false },
        { text: "C", correct: false },
        { text: "JavaScript", correct: true }
      ]
    },
    {
      question: "What does CSS stand for?",
      answers: [
        { text: "Computing Style Sheet", correct: false },
        { text: "Cascading Style Sheet", correct: true },
        { text: "Creative Style System", correct: false }
      ]
    },
    {
      question: "Which HTML tag is used to link a JavaScript file?",
      answers: [
        { text: "<js>", correct: false },
        { text: "<script>", correct: true },
        { text: "<javascript>", correct: false }
      ]
    }
  ];

  const questionElement = document.getElementById("question");
  const answerButtons = document.getElementById("answer-buttons");
  const nextButton = document.getElementById("next-btn");

  let currentQuestionIndex = 0;
  let score = 0;

  function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerText = "Next";
    showQuestion();
  }

  function showQuestion() {
    resetState();
    const currentQuestion = questions[currentQuestionIndex];
    questionElement.innerText = currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
      const button = document.createElement("button");
      button.innerText = answer.text;
      button.classList.add("btn");

      if (answer.correct) {
        button.dataset.correct = "true";
      }

      button.addEventListener("click", selectAnswer);
      answerButtons.appendChild(button);
    });
  }

  function resetState() {
    nextButton.style.display = "none";
    answerButtons.innerHTML = "";
  }

  function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";

    if (isCorrect) {
      selectedBtn.style.backgroundColor = "#9aeabc";
      score++;
    } else {
      selectedBtn.style.backgroundColor = "#ff9393";
    }

    Array.from(answerButtons.children).forEach(button => {
      button.disabled = true;
      if (button.dataset.correct === "true") {
        button.style.backgroundColor = "#9aeabc";
      }
    });

    nextButton.style.display = "block";
  }

  function showScore() {
    resetState();
    questionElement.innerText = `Quiz Finished! 🎉 Your Score: ${score}/${questions.length}`;
    nextButton.innerText = "Play Again";
    nextButton.style.display = "block";
  }

  nextButton.addEventListener("click", () => {
    if (nextButton.innerText === "Play Again") {
      startQuiz();
    } else {
      currentQuestionIndex++;
      if (currentQuestionIndex < questions.length) {
        showQuestion();
      } else {
        showScore();
      }
    }
  });

  startQuiz();
});
