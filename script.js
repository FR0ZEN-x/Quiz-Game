const welcomeScreen = document.getElementById('welcome-screen');
const quizScreen = document.getElementById('quiz-screen');
const resultsScreen = document.getElementById('results-screen');
const startButton = document.getElementById('start-button');
const questionText = document.getElementById('question-text');
const optionsContainer = document.getElementById('options-container');
const feedbackDiv = document.getElementById('feedback');
const scoreDiv = document.getElementById('score');
const progressBar = document.getElementById('progress');
const finalScoreDiv = document.getElementById('final-score');
const restartButton = document.getElementById('restart-button');

let currentQuestion = 0;
let score = 0;
let questions = [
    {
        question: "What is 2 + 2?",
        options: ["3", "4", "5", "6"],
        answer: 1
    },
    {
        question: "What is the capital of France?",
        options: ["London", "Berlin", "Paris", "Rome"],
        answer: 2
    },
    {
        question: "What is the largest planet in our solar system?",
        options: ["Mars", "Jupiter", "Saturn", "Neptune"],
        answer: 1
    }
];

function startQuiz() {
    welcomeScreen.style.display = 'none';
    quizScreen.style.display = 'block';
    loadQuestion();
}

function loadQuestion() {
    const question = questions[currentQuestion];
    questionText.textContent = question.question;
    optionsContainer.innerHTML = '';
    question.options.forEach((option, index) => {
        const label = document.createElement('label');
        label.innerHTML = `<input type="radio" name="answer" value="${index}"><span class="option-text">${option}</span>`;
        optionsContainer.appendChild(label);
    });
    updateProgressBar();
}

function checkAnswer() {
    const selectedOption = document.querySelector('input[name="answer"]:checked');
    if (!selectedOption) {
        feedbackDiv.textContent = "Please select an answer.";
        return;
    }
    const selectedAnswer = parseInt(selectedOption.value);
    if (selectedAnswer === questions[currentQuestion].answer) {
        feedbackDiv.textContent = "Correct!";
        score++;
    } else {
        feedbackDiv.textContent = "Incorrect!";
    }
    scoreDiv.textContent = `Score: ${score}`;
    currentQuestion++;
    selectedOption.checked = false;
    if (currentQuestion < questions.length) {
        setTimeout(loadQuestion, 1000);
    } else {
        setTimeout(showResults, 1000);
    }
}

function updateProgressBar() {
    const progress = (currentQuestion / questions.length) * 100;
    progressBar.style.width = `${progress}%`;
}

function showResults() {
    quizScreen.style.display = 'none';
    resultsScreen.style.display = 'block';
    finalScoreDiv.textContent = `Your final score is ${score} out of ${questions.length}`;
}

function restartQuiz() {
    resultsScreen.style.display = 'none';
    currentQuestion = 0;
    score = 0;
    scoreDiv.textContent = `Score: ${score}`;
    feedbackDiv.textContent = '';
    startQuiz();
}

startButton.addEventListener('click', startQuiz);
optionsContainer.addEventListener('change', checkAnswer);
restartButton.addEventListener('click', restartQuiz);
