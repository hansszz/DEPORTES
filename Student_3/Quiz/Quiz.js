const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressTest = document.querySelector('#progressTest');
const scoreTest = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');
const time_line = document.querySelector("header .time_line");
const timeText = document.querySelector(".timer .time_left_txt");
const timeCount = document.querySelector(".timer .timer_sec");

let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availablequestions = []

let questions = [
    {
        question : 'How many regulation strokes are there in swimming?',
        choice1: 'Two',
        choice2: 'Six',
        choice3: 'Four',
        choice4: 'Three',
        answer: '3',
    },
    {
        question : 'What is the only sport to be played on the moon?',
        choice1: 'Cricket',
        choice2: 'Football',
        choice3: 'Tennis',
        choice4: 'Golf',
        answer: '4',
    },
    {
        question : 'How many gold medals has Usain Bolt won?',
        choice1: 'Twelve',
        choice2: 'Five',
        choice3: 'Eight',
        choice4: 'Ten',
        answer: '3',
    },
    {
        question : 'What international rugby team are known as the Pumas?',
        choice1: 'Argentina',
        choice2: 'Canada',
        choice3: 'Fiji',
        choice4: 'Ireland',
        answer: '1',
    },
    {
        question : 'Which sport involves tucks and pikes?',
        choice1: 'Surfing',
        choice2: 'Kayaking',
        choice3: 'Jet Skiing',
        choice4: 'Diving',
        answer: '4',
    },
    {
        question : 'What is the national sport of Japan?',
        choice1: 'Basketball',
        choice2: 'Sumo wrestling',
        choice3: 'Soccer',
        choice4: 'Table Tennis',
        answer: '2',
    },
    {
        question : 'In darts, what is the highest score from a single dart?',
        choice1: ' 60 ',
        choice2: ' 34 ',
        choice3: ' 50 ',
        choice4: ' 65 ',
        answer: '1',
    },
    {
        question : 'In football, how many yards is a penalty kick taken from goal?',
        choice1: '10 yards',
        choice2: '24 yards',
        choice3: '12 yards',
        choice4: '16 yards',
        answer: '3',
    },
    {
        question : 'Which Formula One team did Lewis Hamilton compete for from 2007 to 2012?',
        choice1: 'Alpine',
        choice2: 'Haas',
        choice3: 'Williams',
        choice4: 'MaLaren',
        answer: '4',
    },
    {
        question : "In karate, what colour belt comes right before black? ",
        choice1: 'Brown',
        choice2: 'Green',
        choice3: 'Blue',
        choice4: "White",
        answer: '1',
    },
]

const SCORE_POINTS = 10
const MAX_QUESTIONS = 10
let timeValue =  60;

startQuiz = () => {
    questionCounter = 0
    score = 0
    var widthValue=1
    availablequestions = [...questions]
    getNewQuestion()
    startTimer(timeValue); //calling startTimer function
    startTimerLine(widthValue); //calling startTimerLine function
    timeText.textContent = "Time Left"; //change the text of timeText to Time Left
}

getNewQuestion = () => {
    
    if (availablequestions.length == 0 || questionCounter >= MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore',score)
        // alert(getNewQuestion);

        return window.location.assign('endQuizPg.html')
    }

    questionCounter ++
    progressTest.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}% `

    const questionsindex =Math.floor(Math.random() * availablequestions.length)
    currentQuestion = availablequestions[questionsindex]
    question.innerText = currentQuestion.question

    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })

    availablequestions.splice(questionsindex,1)

    acceptingAnswers = true

}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return

        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'
        // alert(classToApply);

        if (classToApply == 'correct'){
            incrementScore(SCORE_POINTS)
        }

        selectedChoice.parentElement.classList.add(classToApply)
 
        setTimeout(() => {
	
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()
            
        },1000)
    })
})

incrementScore = num =>{
    score += num
    scoreTest.innerText = score
}
startTimer = time => {
    const countDown = setInterval(() => {
        time -= 1
        timeCount.textContent = time
        if (time <= 0 || questionCounter >= MAX_QUESTIONS) {
            clearInterval(countDown)
            localStorage.setItem('mostRecentScore',score)
            return window.location.assign('endQuizPg.html')
        }
    }, 1000)
}

startTimerLine = time => {
    const countDown = setInterval(() => {
        time += 1
        time_line.style.width = time + "px"
        if (time > 549) { //549px is the width of the time_line div
            clearInterval(countDown)
            localStorage.setItem('mostRecentScore',score)
            return window.location.assign('endQuizPg.html')
        }
    }, 1000)
}
function startTimer(time){
    
    counter = setInterval(timer, 1000);
    function timer(){
        timeCount.textContent = time; //changing the value of timeCount with time value
        time--; //decrement the time value
        if(time < 9){ //if timer is less than 9
            let addZero = timeCount.textContent; 
            timeCount.textContent = "0" + addZero; //add a 0 before time value
        }
        if(time < 0){ //if timer is less than 0
            clearInterval(counter); //clear counter
            timeText.textContent = "Time Off"; //change the time text to time off
            const allOptions = option_list.children.length; //getting all option items
            let correcAns = questions[que_count].answer; //getting correct answer from array
            for(i=0; i < allOptions; i++){
                if(option_list.children[i].textContent == correcAns){ //if there is an option which is matched to an array answer
                    option_list.children[i].setAttribute("class", "option correct"); //adding green color to matched option
                    option_list.children[i].insertAdjacentHTML("beforeend", tickIconTag); //adding tick icon to matched option
                    console.log("Time Off: Auto selected correct answer.");
                }
            }
            for(i=0; i < allOptions; i++){
                option_list.children[i].classList.add("disabled"); //once user select an option then disabled all options
            }
            next_btn.classList.add("show"); //show the next button if user selected any option
        }
    }
}

function startTimerLine(time){
    counterLine = setInterval(timer, 29);
    function timer(){
        time += 1; //upgrading time value with 1
        time_line.style.width = time + "px"; //increasing width of time_line with px by time value
        if(time > 549){ //if time value is greater than 549
            clearInterval(counterLine); //clear counterLine
        }
    }
    
}

startQuiz()