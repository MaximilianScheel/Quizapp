let questions = [
    {
        "question": "Das flächenmäßig kleinste Bundesland heißt?",
        "answer_1": "Berlin",
        "answer_2": "Bremen",
        "answer_3": "Saarland",
        "answer_4": "Hamburg",
        "right_answer": 3,
    },
    {
        "question": "Was bedeutet das lateinische “carpe diem”?",
        "answer_1": "Genieße das Leben",
        "answer_2": "Nutze den Tag",
        "answer_3": "Dein Tag wird toll werden",
        "answer_4": "Man sieht sich immer zweimal im Leben",
        "right_answer": 2,
    },
    {
        "question": "Was ist die “Goldene Himbeere”?",
        "answer_1": "Ein Preis für die schlechteste Leistung innerhalb eines Filmjahres",
        "answer_2": "Eine Nachspeise aus Russland",
        "answer_3": "Das teuerste Schmuckstück der Welt",
        "answer_4": "Das Symbol einer Sekte",
        "right_answer": 1,
    },
    {
        "question": "Welcher deutsche Herrscher trug den Beinamen “der Große”?",
        "answer_1": "Friedrich der I. von Preußen",
        "answer_2": "Friedrich der III. von Sachsen",
        "answer_3": "Friedrich II. von Preußen",
        "answer_4": "Friedrich der III. von Österreich",
        "right_answer": 3,
    },
    {
        "question": "Welcher Pilz ist einer der giftigsten der Welt?",
        "answer_1": "Der Fliegenpilz",
        "answer_2": "Der Grüne Knollenblätterpilz",
        "answer_3": "Der Gemeine Kartoffelbovist",
        "answer_4": "Der Satansröhrling",
        "right_answer": 2,
    },
];

let rightQuestions = 0;
let currentQuestion = 0;
let AUDIO_SUCCESS = new Audio('audio/success.mp3');
let AUDIO_WRONG = new Audio('audio/wrong.mp3');


function init() {
    document.getElementById('all-questions').innerHTML = questions.length;

    showQuestion();

}


function showQuestion() {

    if (gameIsOver()) {
        showEndScreen();

    } else { 
        updateProgressBar(); 
        updateToNextQuestion();

    }
}


function gameIsOver() {
   return currentQuestion >= questions.length;
}


function showEndScreen() {

    document.getElementById('endScreen').style = '';
    document.getElementById('questionBody').style = 'display: none;'

    document.getElementById('amount-of-questions').innerHTML = questions.length;
    document.getElementById('amount-of-right-questions').innerHTML = rightQuestions;
    document.getElementById('header-image').src = 'img/trophy.jpg';
};


function updateProgressBar() {
    let percent = (currentQuestion + 1) / questions.length;
    percent = Math.round(percent * 100);

    document.getElementById('progress-bar').innerHTML = `${percent} %`;
    document.getElementById('progress-bar').style = `width: ${percent}%;`;
}


function updateToNextQuestion() {
    let question = questions[currentQuestion];
    document.getElementById('question-number').innerHTML = currentQuestion + 1;
    document.getElementById('questiontext').innerHTML = question['question'];
    document.getElementById('answer_1').innerHTML = question['answer_1'];
    document.getElementById('answer_2').innerHTML = question['answer_2'];
    document.getElementById('answer_3').innerHTML = question['answer_3'];
    document.getElementById('answer_4').innerHTML = question['answer_4'];
}


function answer(selection) {
    let question = questions[currentQuestion];
    let selectedQuestionNumber = selection.slice(-1);
    let idOfRightAnswer = `answer_${question['right_answer']}`;

    if (rightAnswerSelected(selectedQuestionNumber)) { // Richtige Frage beantwortet
        document.getElementById(selection).parentNode.classList.add('bg-success');
        AUDIO_SUCCESS.play();
        rightQuestions++;
    } else {
        document.getElementById(selection).parentNode.classList.add('bg-danger');
        document.getElementById(idOfRightAnswer).parentNode.classList.add('bg-success');
        AUDIO_WRONG.play();
    }
    document.getElementById('next-button').disabled = false;
}


function rightAnswerSelected(selectedQuestionNumber){
    return selectedQuestionNumber == question['right_answer'];
}

function nextQuestion() {
    currentQuestion++; // z.B. von 0 auf 1
    document.getElementById('next-button').disabled = true;
    restAnswerButtons();
    showQuestion();
}


function restAnswerButtons() {
    document.getElementById('answer_1').parentNode.classList.remove('bg-success');
    document.getElementById('answer_1').parentNode.classList.remove('bg-danger');
    document.getElementById('answer_2').parentNode.classList.remove('bg-danger');
    document.getElementById('answer_2').parentNode.classList.remove('bg-success');
    document.getElementById('answer_3').parentNode.classList.remove('bg-danger');
    document.getElementById('answer_3').parentNode.classList.remove('bg-success');
    document.getElementById('answer_4').parentNode.classList.remove('bg-danger');
    document.getElementById('answer_4').parentNode.classList.remove('bg-success');
}


function restartGame() {
    document.getElementById('header-image').src = 'img/Quiz.png';
    document.getElementById('questionBody').style = ''; // questionBody wieder anzeigen
    document.getElementById('endScreen').style = 'display: none;' // Endscreen ausblenden


    rightQuestions = 0;
    currentQuestion = 0;
    init();
}