// ===========
// DATA
// ===========
// Global variable for applicatoin state
var questions = [
    {
        text: "What is the middle of a hurricane called?",
        choices: ["The epicenter", 'The enclave', "The eye", "The epiphone"],
        answer: "The eye"
    },
    {
        text: "Which of the following paper towel brands is known as the quicker picker upper?",
        choices: ["Bounty", 'Viva', "Charmin", "Scott"],
        answer: 'Bounty'
    },
    {
        text: "Which part of the water cycle makes clouds?",
        choices: ["Evaporation", 'Condensation', "Precipitation", "Accumulation"],
        answer: "Condensation"
    },
    {
        text: "What color is a polar bear's skin?",
        choices: ["White", 'Brown', "Black", "Blonde"],
        answer: "Black"
    },
    {
        text: "Who is the first woman to hold executive office in the United States?",
        choices: ["Hillary Clinton", 'Sandra Day O Conner', "Condoleezza Rice", "Kamala Harris"],
        answer: "Kamala Harris"
    },
    {
        text: "Fill in the blank to the title of this kids book by Eileen Christelow: ______ Little Monkeys Jumping on the Bed",
        choices: ["Silly", 'Wild', "Five", "Nine"],
        answer: 'Five'
    },
    {
        text: "How many quarters are there in an NFL football game?",
        choices: ["1", '2', "3", "4"],
        answer: "4"
    },
    {
        text: "If I were to give you a dollar, How many dimes would you have?",
        choices: ["0", '10', "100", "1000"],
        answer: "0"
    },
]

var TIME_PER_QUESTION = 5;
var quizQuestionsIndex = 0;
var timerId;
var timeCount = questions.length * TIME_PER_QUESTION;

// HTML elements
var startScreenEl = document.getElementById("start-screen");
var startBtn = document.getElementById("start");
var questionsEl = document.getElementById("questions");
var timerEl = document.getElementById("time");
var questionTextEl = document.getElementById("question-text");
// choices element
var choicesEl = document.getElementById('choices');
// feedback element
var feedbackEl = document.getElementById('feedback');
// end screen element
var endScreenEl = document.getElementById('end-screen');
// final score element
var finalScoreEl = document.getElementById('final-score');
// initials Input Elment
var initialsInputEl = document.getElementById('initials');
// initials Submit Btn
var initialsSubmitBtn = document.getElementById('submit');

// =============
// MAIN PROCESS
// =============
function startQuiz() {
    startScreenEl.setAttribute("class", "hide");
    questionsEl.setAttribute("class", "show");
    // Start timer
    timerId = setInterval(handleTicks, 1000);

    // Ask questions
    askQuestions();
};

function askQuestions() {
    var currentQuestionObj = questions[quizQuestionsIndex];
    console.log(currentQuestionObj);
    var questionText = currentQuestionObj.text;

    // Display question text
    questionTextEl.textContent = questionText;

    // ?? Display choices
    // Clear the existing choices content
    choicesEl.innerHTML = '';
    choicesEl.textContent = '';

    // Create a loop to create list item elements.
    var choicesArr = currentQuestionObj.choices;
    for (var i = 0; i < choicesArr.length; i++) {
        // In for loop, create a list item element, 'li'.
        var liEl = document.createElement('li');
        // Add an value attribute to hold the choice on the list item
        console.log(choicesArr[i]);
        liEl.setAttribute('value', choicesArr[i]);
        // Add content to the list item
        liEl.textContent = (i + 1) + ". " + choicesArr[i];
        // Append the list item to the choices element
        choicesEl.appendChild(liEl);
    }
}

// Function quizEnd
// - clear interval
// - display end screen element
// - add content to the 'final-score' element with timeCount
// - hide questions element
function quizEnd() {
    console.log('quizEnd');
    // clear interval
    clearInterval(timerId);
    // hide questions element
    questionsEl.setAttribute('class', 'hide');
    // add content to the final score element with timeCount
    finalScoreEl.textContent = timeCount;
    // display end screen element
    endScreenEl.setAttribute('class', 'show');

    return;
}

function handleTicks() {
    // Decement time count
    timeCount--;
    // Display time count
    timerEl.textContent = timeCount;
    // Check time count if it reaches 0
    // if true, quiz ends - clear the interval timer, then call the quizEnd function
    if (!timeCount) {
        console.log("Time is up");
        clearInterval(timerId);
        quizEnd();
    }
}

/* Function handleChoices
    // get the value attribute from event target
    // compare the value with the current question answer
    // if equal, add content to the feedback element with 'Correct!'
    // if not,
    //     subtract a number of seconds from time count as penalty
    //     if time count less than zero, make it zero. This will end the quiz.
    //     modify the content of the timer element with this new time count
    //     add content to the feedback element with 'Wrong!'
    // display feedback element
    // set one-time timer to hide the feedback element in 1 ~ 2 secs
    // increment the quiz questions index by 1 for the next question object
    // check if the index is equal to the length (size) of questions
    // if equal, call quizEnd function
    // if not, call ask questions function
*/
function handleChoices(event) {
    console.log('handleChoices');
    // get the value attribute from event target
    var choiceValue = event.target.getAttribute('value');
    console.log(choiceValue);
    // compare the value with the current question answer
    // if equal, add content to the feedback element with 'Correct!'
    if (choiceValue === questions[quizQuestionsIndex].answer) {
        feedbackEl.textContent = "Correct!";
    }
    // if not,
    //     subtract a number of seconds from time count as penalty
    //     if time count less than zero, make it zero. This will end the quiz.
    //     modify the content of the timer element with this new time count
    //     add content to the feedback element with 'Wrong!'
    else {
        timeCount -= TIME_PER_QUESTION ; // timeCount = timeCount - 5;
        if (timeCount < 0) {
            timeCount = 0;
        }
        timerEl.textContent = timeCount;
        feedbackEl.textContent = 'Wrong!';
    }

    // display feedback element
    feedbackEl.setAttribute('class', 'feedback');
    // set one-time timer to hide the feedback element in 1 ~ 2 secs
    setTimeout(function() {
        feedbackEl.setAttribute('class', 'hide');
    }, 1500);

    // increment the quiz questions index by 1 for the next question object
    // check if the index is equal to the length (size) of questions
    // if equal, call quizEnd function
    // else, call ask questions function
    quizQuestionsIndex++;
    if (quizQuestionsIndex === questions.length) {
        quizEnd();
    }
    else {
        askQuestions();
    }
}

function saveScores() {
    console.log('saveScores');
    // get initials
    var initialsValue = initialsInputEl.value.trim();
    // get localStorage item
    var scores = [];
    if (initialsValue) {
        scores = JSON.parse(localStorage.getItem('scores'));
        // console.log(scores);
        if (!scores) {
            scores = [];
        };

        var newScore = {
            score: timeCount,
            initials: initialsValue
        }
        console.log(scores);
        scores.push(newScore);
        localStorage.setItem('scores', JSON.stringify(scores));
    }
    // redirect to scores.html
    location.href = "./highscores.html";

    return;
}

function handleInitialsKeyup(event) {
    console.log('handleInitialsKeyup');
    // console.log('event.target', event.target);
    // console.log('event: ', event);
    console.log('event.key', event.key);
    if (event.key === 'Enter') {
        saveScores();
    }
    return;
}

function handleInitialsSubmit(event) {
    console.log('handleInitialsSubmit');

    saveScores();
}

startBtn.addEventListener("click", startQuiz);

choicesEl.onclick = handleChoices;

// add event listener for initials
initialsInputEl.onkeyup = handleInitialsKeyup;
// initialsInputEl.addEventListener('keyup', handleInitialsKeyup);

// add event listener for submit button
initialsSubmitBtn.addEventListener('click', handleInitialsSubmit);
