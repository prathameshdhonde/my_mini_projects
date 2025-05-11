const container = document.querySelector('.container');
const questionBox = document.querySelector('.question');
const choicesBox = document.querySelector('.choices');
const nextBtn = document.querySelector('.nextBtn');
const scoreCard = document.querySelector('.scoreCard');
const alert = document.querySelector('.alert');
const startBtn = document.querySelector('.startBtn');
const timer = document.querySelector('.timer');

const quiz = [
    {
        question: "Q1. Which of the following colors contain equal amounts of RBG?",
        choices: ["White", "All of the above", "Black", "Grey"],
        answer: "All of the above"
    },
    {
        question: "Q2. What is the correct syntax to write an HTML comment?",
        choices: ["<--! Comment -->", "// Comment", "# Comment", "/* Comment */"],
        answer: "<--! Comment -->"
    },
    {
        question: "Q3. What is the effect of the <b> tag?",
        choices: ["It is used to change the font size.", "It is used to write black-colored font.", "It converts the text within it to bold font.", "None of the above."],
        answer: "It converts the text within it to bold font."
    },
    {
        question: "Q4. What is the smallest header in HTML by default?",
        choices: ["h1", "h2", "h6", "h4"],
        answer: "h6"
    },
    {
        question: "Q5. What tag is used to render an image on a webpage?",
        choices: ["None of the above", "src", "image", "img"],
        answer: "img"
    }
];

// Variables
let currentQuestionIndex = 0;
let score = 0;
let quizOver = false;
let timeLeft = 15;
let timerID = null;

// To show questions
const showQuestions = () => {
    const questionDetails = quiz[currentQuestionIndex];
    questionBox.textContent = questionDetails.question;
    choicesBox.textContent = "";

    questionDetails.choices.forEach(choice => {
        const choiceDiv = document.createElement('div');
        choiceDiv.textContent = choice;
        choiceDiv.classList.add('choice');
        choicesBox.appendChild(choiceDiv);

        choiceDiv.addEventListener('click', () => {
            document.querySelectorAll('.choice').forEach(c => c.classList.remove('selected'));
            choiceDiv.classList.add('selected');
        });
    });

    startTimer();
}

// Check answers
const checkAnswer = () => {
    const selectedChoice = document.querySelector('.choice.selected');
    if (selectedChoice && selectedChoice.textContent === quiz[currentQuestionIndex].answer) {
        displayAlert("Correct Answer!");
        score++;
    } else {
        displayAlert(`Wrong Answer! Correct answer is ${quiz[currentQuestionIndex].answer}`);
    }

    timeLeft = 15;
    currentQuestionIndex++;

    if (currentQuestionIndex < quiz.length) {
        showQuestions();
    } else {
        showScore();
        stopTimer();
        quizOver = true;
    }
}

// Show score
const showScore = () => {
    questionBox.textContent = "";
    choicesBox.textContent = "";
    scoreCard.textContent = `Your Score is ${score} out of ${quiz.length}!`;
    displayAlert("You have completed your quiz!");
    nextBtn.textContent = "Play Again";
}

// Display alert
const displayAlert = (msg) => {
    alert.style.display = "block";
    alert.textContent = msg;
    setTimeout(() => {
        alert.style.display = "none";
    }, 2000);
}

// Start the timer
const startTimer = () => {
    clearInterval(timerID); // Clear any existing timers
    timer.textContent = timeLeft;

    timerID = setInterval(() => {
        timeLeft--;
        timer.textContent = timeLeft;

        if (timeLeft === 0) {
            clearInterval(timerID);
            const confirmUser = confirm("Time's up! Do you want to try the quiz again?");
            if (confirmUser) {
                resetQuiz();
                startQuiz();
            } else {
                startBtn.style.display = "block";
                container.style.display = "none";
            }
        }
    }, 1000);
}

// Stop the timer
const stopTimer = () => {
    clearInterval(timerID);
}

// Start the quiz
const startQuiz = () => {
    score = 0;
    timeLeft = 15;
    currentQuestionIndex = 0;
    quizOver = false;
    scoreCard.textContent = "";
    showQuestions();
}

// Reset quiz state
const resetQuiz = () => {
    score = 0;
    currentQuestionIndex = 0;
    quizOver = false;
    timeLeft = 15;
    scoreCard.textContent = "";
    alert.style.display = "none";
    stopTimer();
}

// START button
startBtn.addEventListener('click', () => {
    startBtn.style.display = "none";
    container.style.display = "block";
    document.getElementById("heading").style.display = "none";
    document.getElementById("head2").style.display = "none";
    document.getElementById("note").style.display = "none";
    startQuiz();
});

// NEXT button
nextBtn.addEventListener('click', () => {
    const selectedChoice = document.querySelector('.choice.selected');
    if (!selectedChoice && nextBtn.textContent === "Next") {
        displayAlert("Please select your answer");
        return;
    }

    if (quizOver) {
        nextBtn.textContent = "Next";
        resetQuiz();
        startQuiz();
    } else {
        checkAnswer();
    }
});
