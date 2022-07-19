let questions = [
    {
        "question": "Wer hat HTML erfunden?",
        "answer_1": "Robbie Williams",
        "answer_2": "Lady Gaga",
        "answer_3": "Tim Berners-Lee",
        "answer_4": "Justin Biber",
        "right-answer": 3
    },

    {
        "question": "Welches Attribut kann man NICHT für Textarea verwenden?",
        "answer_1": "readonly",
        "answer_2": "max",
        "answer_3": "from",
        "answer_4": "spellcheck",
        "right-answer": 1
    },

    {
        "question": "Was heißt CSS?",
        "answer_1": "Computer Style Sheets",
        "answer_2": "Colorful Style Sheets",
        "answer_3": "Creative Style Sheets",
        "answer_4": "Cascading Style Sheets",
        "right-answer": 4
    },

    {
        "question": "Wie schreibt man den Befehl in CSS richtig?",
        "answer_1": "body:color=black",
        "answer_2": "body { color: black }",
        "answer_3": "{ body:color=black (body) }",
        "answer_4": "{ body;color:black }",
        "right-answer": 2
    },

    {
        "question": "Was ist eine mögliche Endung für eine HTML-Datei?",
        "answer_1": "*.ht",
        "answer_2": "*.ml",
        "answer_3": "*.web",
        "answer_4": "*.htm",
        "right-answer": 4
    },

    {
        "question": "Mit welchem Tag erzeugt man eine Nummerierung?",
        "answer_1": "< p >",
        "answer_2": "< ul >",
        "answer_3": "< body >",
        "answer_4": "< ol >",
        "right-answer": 4
    },

    {
        "question": "Was bedeutet HTML?",
        "answer_1": "Hyper Text Transfer Protocol",
        "answer_2": "Hyper Text Markup Language",
        "answer_3": "Hyper Thread Markup Library",
        "answer_4": "Home Tool Markup Language",
        "right-answer": 2
    },

    {
        "question": "Was ist ein < br > Tag?",
        "answer_1": "Absatzumbruch",
        "answer_2": "Zeilenumbruch",
        "answer_3": "Seitenumbruch",
        "answer_4": "Spaltenumbruch",
        "right-answer": 2
    },

    {
        "question": "Welche ist die größte Überschrift?",
        "answer_1": "h6",
        "answer_2": "h2",
        "answer_3": "h1",
        "answer_4": "h3",
        "right-answer": 3
    },

    {
        "question": "Was ändert die Textgröße in CSS?",
        "answer_1": "text-size",
        "answer_2": "font-style",
        "answer_3": "text-style",
        "answer_4": "font-size",
        "right-answer": 4
    }
];

let currentQuestion = 0;
let rightQuestions = 0;
let AUDIO_SUCCESS = new Audio('./sounds/success.wav');
let AUDIO_FAIL = new Audio('./sounds/fail.mp3');
let AUDIO_WIN = new Audio('./sounds/win.mp3');

function init() {
    document.getElementById('all-questions').innerHTML = questions.length;
    showQuestion();
};

function showQuestion() {

    if (gameIsOver()) {
        showEndscreen();
    } else {
        showNextQuestion();
    }
    updateProgressBar();
}

function answer(selection) {

    let question = questions[currentQuestion];
    let selectedQuestionNumber = selection.slice(-1);
    let IdOfRightAnswer = `answer_${question['right-answer']}`;

    document.getElementById('cover').classList.remove('d-none');

    if (rightAnswerSelected(selectedQuestionNumber, question)) {
        document.getElementById(selection).parentNode.classList.add('bg-success');
        AUDIO_SUCCESS.play();
        rightQuestions++;
    } else {
        document.getElementById(selection).parentNode.classList.add('bg-danger');
        document.getElementById(IdOfRightAnswer).parentNode.classList.add('bg-success');
        AUDIO_FAIL.play();
    }
    document.getElementById('next-button').disabled = false;
}

function nextQuestion() {
    currentQuestion++;
    showQuestion();
    document.getElementById('next-button').disabled = true;
    resetAnswerButtons();
}

function resetAnswerButtons() {
    document.getElementById('answer_1').parentNode.classList.remove('bg-danger');
    document.getElementById('answer_1').parentNode.classList.remove('bg-success');
    document.getElementById('answer_2').parentNode.classList.remove('bg-danger');
    document.getElementById('answer_2').parentNode.classList.remove('bg-success');
    document.getElementById('answer_3').parentNode.classList.remove('bg-danger');
    document.getElementById('answer_3').parentNode.classList.remove('bg-success');
    document.getElementById('answer_4').parentNode.classList.remove('bg-danger');
    document.getElementById('answer_4').parentNode.classList.remove('bg-success');

    document.getElementById('cover').classList.add('d-none');

}



function restartGame() {
    rightQuestions = 0;
    currentQuestion = 0;
    document.getElementById('card-header').src ='./img/school.jpg';
    document.getElementById('questionBody').style = ''; //Fragen anzeigen lassen
    document.getElementById('endScreen').style = 'display: none;'; //Endscreen ausblenden
    document.getElementById('question-footer').classList.remove('d-none');

    init();
}



function showEndscreen() {
    document.getElementById('endScreen').style = '';
    document.getElementById('questionBody').style = 'display: none;';
    document.getElementById('amount-of-questions').innerHTML = questions.length;
    document.getElementById('right-questions').innerHTML = rightQuestions;
    document.getElementById('card-header').src ='./img/368.jpg';
    document.getElementById('question-footer').classList.add('d-none');
    AUDIO_WIN.play()
}


function showNextQuestion() {
    let question = questions[currentQuestion];
    document.getElementById('questiontext').innerHTML = question['question'];
    document.getElementById('answer_1').innerHTML = question['answer_1'];
    document.getElementById('answer_2').innerHTML = question['answer_2'];
    document.getElementById('answer_3').innerHTML = question['answer_3'];
    document.getElementById('answer_4').innerHTML = question['answer_4'];
    document.getElementById('question-number').innerHTML = currentQuestion + 1;
}


function updateProgressBar(){
    let percent = currentQuestion / questions.length;
    percent = Math.round(percent * 100);
    document.getElementById('progress-bar').innerHTML = `${percent} %`;
    document.getElementById('progress-bar').style = `width:${percent}%`;
}

function gameIsOver(){
    return currentQuestion >= questions.length;
}


function rightAnswerSelected(selectedQuestionNumber, question){
    return selectedQuestionNumber == question['right-answer'];
}


