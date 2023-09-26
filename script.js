const questions=[
    {
        question:"what is the full meaning of HTML?",
        answers: [
            {text:"Hyper Text Markup Language", correct: true},
            {text:"Hyper Text Makeup Language", correct: false},
            {text:"Hyper Transform Markup Language", correct: false},
            {text:"Hyper Text Mark Language", correct: false},
        ]
    },
    {
        question:"What does CSS stand for? ",
        answers: [
            {text:"Cascading Style Sheet", correct: true},
            {text:"Colourful Style Sheet", correct: false},
            {text:"Common Style Sheet", correct: false},
            {text:"Computer Style Sheet", correct: false},
        ]
    },
    {
        question:"What does PHP stand for?",
        answers: [
            {text:"Hypertext Preprogramming", correct: false},
            {text:"Hypertext Preprocessor", correct: true},
            {text:"Hypertext Programing", correct: false},
            {text:"Hometext Preprocessor", correct: false},
        ]
    },
    {
        question:"What does SQL stand for?",
        answers: [
            {text:"Stylish Question Language ", correct: false},
            {text:"Stylesheet Query Language", correct: false},
            {text:"Structured Query Language", correct: true},
            {text:"Statement Question Language", correct: false},
        ]
    },
    {
        question:"What does XML stand for?",
        answers: [
            {text:"Extra Multi-Program Language", correct: false},
            {text:"Extensible Markup Language", correct: true},
            {text:"Examine Multiple Language ", correct: false},
            {text:"Executable Multiple Language", correct: false},
        ]
    },
]

const question=document.getElementById('question')
const answerbutton=document.querySelector('.answer-button')
const nextbutton=document.querySelector('.next-btn')
const span=document.querySelectorAll('span')[3];
const span2=document.querySelectorAll('span')[5];
const quiznumber=document.querySelector('.quiz-number');
const timerdiv=document.querySelector('.timer');
const timer=document.querySelector('.timer-span');
const timerzone=document.querySelector('.timezone');
const line=document.querySelector(".time-line");
// const button=document.createElement("button");
console.log(line)
// console.log(question,answerbutton,nextbutton)

let currentquestionindex=0;
let score=0;

function startquiz(){
    currentquestionindex=0;
    score=0;
    nextbutton.innerHTML="NEXT";
    showquestion();
    startQuizTimer();
    startTimeline();
    timerzone.innerHTML="TIME ON";
    // startQuizTimer();
        // timerzone.innerHTML="TIME ON:";
}

function showquestion(){
    resetState();
    let currentquestion=questions[currentquestionindex];
    let questionno=currentquestionindex + 1;
     question.innerHTML=questionno + ". " + currentquestion.question;
     quiznumber.style.display="block"
// console.log(question)
    currentquestion.answers.forEach(answer =>{
        const button=document.createElement("button");
        button.innerHTML=answer.text;
         button.classList.add('btn')
         answerbutton.appendChild(button)
         span.innerHTML=currentquestionindex + 1
         span2.innerHTML=questions.length
        if(answer.correct){
            button.dataset.correct=answer.correct
        }
         button.addEventListener('click', SelectAnswer);
         
    })
} 

function  resetState(){
    nextbutton.style.display="none"
    while(answerbutton.firstChild){
        answerbutton.removeChild(answerbutton.firstChild)
    }
}

startquiz();

function SelectAnswer(e){
    clearInterval(quiztimerinterval);
    clearInterval(counterline);
    timerzone.innerHTML="ON HOLD"
    const selectedbtn=e.target;
    const isCorrect=selectedbtn.dataset.correct==="true";
    if(isCorrect){
        selectedbtn.classList.add('correct')
        score++;
    }else{
        selectedbtn.classList.add('incorrect')
    }
    Array.from(answerbutton.children).forEach(button=>{
        if(button.dataset.correct==='true'){
            button.classList.add('correct');
        }
        button.disabled=true
    })
    nextbutton.style.display='block'
}

nextbutton.addEventListener('click', ()=>{
    if(currentquestionindex<questions.length){
        handlenextquestion();
    }else{
        startquiz();
    }
})

// console.log(nextbutton)

function handlenextquestion(){
    currentquestionindex++;
    if(currentquestionindex<questions.length){
        showquestion()
        startQuizTimer();
        startTimeline()
        // clearInterval(counterline);
        timerzone.innerHTML="TIME ON";
    }else{
        showscore();
    }
}

function showscore(){
    resetState();
    question.innerHTML=`You Scored ${score} out of ${questions.length}!;`
    nextbutton.innerHTML='PLAY AGAIN'
    nextbutton.style.display='block';
    quiznumber.style.display="none";
    clearInterval(quiztimerinterval);
    timerzone.innerHTML="TIME OFF";
    timer.innerHTML='00';
    line.style.width="0"
    clearInterval(counterline);

}

function startQuizTimer(){
    quiztimer=15;
    quiztimerinterval=setInterval(()=>{
        quiztimer--;
        if(quiztimer<0){
            quiztimer=0
        }
        timer.innerHTML=quiztimer
        if(quiztimer<10){
            let addzero=timer.innerHTML;
            timer.innerHTML='0' + addzero;
        }
        if(quiztimer<1){
            clearInterval(quiztimerinterval);
            timerzone.innerHTML="TIME OFF"
        }
        lockbutton()        
    }, 1000);
}

let time=0;
let widthvalue=0;
function startTimeline(){
    let time=0;
    counterline=setInterval(()=>{
        time+=1
        line.style.width=time + "px";
        if(time > 599){
            clearInterval(counterline)
        }
        // console.log(time)

    }, 21)

}
function lockbutton(){
    Array.from(answerbutton.children).forEach(button=>{
        if(quiztimer<1){
            button.disabled=true
            nextbutton.style.display="block"
        }
    })
}