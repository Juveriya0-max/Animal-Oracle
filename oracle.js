// -------------------- DATABASE --------------------
document.getElementById("answerButtons").style.display = "none";

function show(el) {
    document.getElementById(el).style.display = "block";
}

function hide(el) {
    document.getElementById(el).style.display = "none";
}

let animals = JSON.parse(localStorage.getItem("animals")) || [
    { name: "Lion", fly: false, water: false, big: true, stripe: false, fact: "Lions are called the king of the jungle 🦁" },
    { name: "Tiger", fly: false, water: false, big: true, stripe: true, fact: "Tigers have unique stripes like fingerprints 🐯" },
    { name: "Elephant", fly: false, water: false, big: true, stripe: false, fact: "Elephants are the largest land animals 🐘" },
    { name: "Eagle", fly: true, water: false, big: false, stripe: false, fact: "Eagles have extremely sharp eyesight 🦅" },
    { name: "Shark", fly: false, water: true, big: true, stripe: false, fact: "Sharks have existed for over 400 million years 🦈" },
    { name: "Dolphin", fly: false, water: true, big: true, stripe: false, fact: "Dolphins are highly intelligent marine animals 🐬" }
];

// -------------------- GAME STATE --------------------

let questions = [
    { text: "Does it fly?", key: "fly" },
    { text: "Does it live in water?", key: "water" },
    { text: "Is it bigger than a human?", key: "big" },
    { text: "Does it have stripes?", key: "stripe" }
];

let currentQ = 0;
let scores = [];
let started = false;

// -------------------- UI ELEMENTS --------------------

const questionEl = document.getElementById("question");
const startBtn = document.getElementById("startBtn");
const answerButtons = document.getElementById("answerButtons");
const resultBox = document.getElementById("resultBox");



// -------------------- START GAME --------------------

function startGame() {
    started = true;
    currentQ = 0;

    scores = new Array(animals.length).fill(0);
    
    startBtn.style.display = "none";
    answerButtons.style.display = "none";
    resultBox.style.display ="none";

    /*document.getElementById("answerButtons").style.display = "block";*/

    questionEl.textContent = "Think of an animal... 🧠";

    /*setTimeout(nextQuestion, 1500);
    show("answerButtons");*/

    setTimeout(() => {
        answerButtons.style.display = "block"; 
        nextQuestion();
    }, 1500);
}

// -------------------- QUESTION --------------------

function nextQuestion() {

    if (currentQ >= questions.length) {
        return guessAnimal();
    }

    questionEl.textContent = questions[currentQ].text;
}

// -------------------- HANDLER --------------------

function answer(ans) {
    if (!started) return;

    let key = questions[currentQ].key;

    for (let i = 0; i < animals.length; i++) {
        let trait = animals[i][key];

        if (ans === "yes") {
            if (trait) scores[i]++;
        } else {
            if (!trait) scores[i]++;
        }
    }

    currentQ++;
    nextQuestion();
}

// -------------------- GUESS --------------------

function guessAnimal() {

    answerButtons.style.display = "none";

    let bestIndex = 0;

    for (let i = 1; i < scores.length; i++) {
        if (scores[i] > scores[bestIndex]) {
            bestIndex = i;
        }
    }

    let guess = animals[bestIndex];

    questionEl.innerHTML =
    "I think it's " + guess.name;
        

    showFunFact(guess);

    setTimeout(() => {
        document.getElementById("resultBox").style.display = "block";
    }, 2000);
}

// -------------------- FACT --------------------

function showFunFact(animal) {
    setTimeout(() => {
        questionEl.innerHTML += `<br><br>💡 Fun Fact: ${animal.fact}`;
    }, 1000);
}

// -------------------- LEARNING SYSTEM --------------------

function learnSystem(guess) {

    let correct = confirm("Was I correct?");

    if (!correct) {

        let newAnimal = prompt("What animal were you thinking of?");
        let fact = prompt("Tell me a fun fact about it:");

        let newEntry = {
            name: newAnimal,
            fly: confirm("Does it fly?"),
            water: confirm("Does it live in water?"),
            big: confirm("Is it bigger than a human?"),
            stripe: confirm("Does it have stripes?"),
            fact: fact || "No fact added yet"
        };

        animals.push(newEntry);

        localStorage.setItem("animals", JSON.stringify(animals));

        alert("🧠 I learned a new animal!");
    }

    restartGame();
}

// -------------------- RESTART --------------------

function restartGame() {

    started = false;

    /*startBtn.style.display = "inline-block";
    resultBox.style.display = "none";
    startBtn.style.display = "none";
    document.getElementById("answerButtons").style.display="none";
    questionEl.textContent = "Click Start to play again 🐾";*/
 

    document.getElementById("answerButtons").style.display = "none";
    document.getElementById("resultBox").style.display = "none";
    document.getElementById("learnBox").style.display = "none";

    // show start button again (IMPORTANT FIX)
    startBtn.style.display = "inline-block";
    startBtn.textContent = "Start Again"

    questionEl.textContent = "Click Start to play again 🐾";
}
   


function feedback(isCorrect) {


    document.getElementById("resultBox").style.display = "none";

    if (isCorrect) {

        restartGame();
        return;

        /*document.getElementById("learnBox").style.display = "block";
        let newAnimal = prompt("What animal were you thinking of?");
        let fact = prompt("Tell me a fun fact about it:");

        let newEntry = {
            name: newAnimal,
            fly: confirm("Does it fly?"),
            water: confirm("Does it live in water?"),
            big: confirm("Is it bigger than a human?"),
            stripe: confirm("Does it have stripes?"),
            fact: fact || "No fact added yet"
        };*/
    }

    document.getElementById("learnBox").style.display = "block";
}

function saveAnimal() {

    let name = document.getElementById("animalInput").value;
    let fact = document.getElementById("factInput").value;

    let newAnimal = {
        name: name,
        fly: false,
        water: false,
        big: false,
        stripe: false,
        fact: fact
    };

    animals.push(newAnimal);
    localStorage.setItem("animals", JSON.stringify(animals));

    document.getElementById("learnBox").style.display = "none";

    alert("I learned it 🧠");

    restartGame();
}