const studentData = document.querySelector("#student_data");
const title = document.querySelector('h1');
const div = document.querySelector('div');
let userData = new FormData (studentData);
//const answers = require("../dataFiles/test-answer.json")

// check answer save and send it as an email.
function checkanswers(questions, userData, resFormData, answers, testName){
    const answersToSend = [];
    let result = 0;

    // clear all HTML file
    div.innerHTML = ''
    // lets create a page:
    title.textContent = `${userData.name}, congratulations you complete your test!`
    const paraRes = document.createElement('h2');
    paraRes.textContent = 'Below you can find your results:';
    div.style.display = "block";
    div.appendChild(paraRes)
    for (let val of Object.entries(questions)){
        const article = document.createElement('article');
        article.id = val[0];
        div.appendChild(article);
        const head = document.createElement('h3');
        head.textContent = `${val[0]}: ${val[1][0]}`;
        article.appendChild(head);
    };

    // compare all data
    for(let cordata of Object.entries(answers)){
        for(let data of Object.entries(resFormData)){
            if(data[0]===cordata[0]){
              if(data[1] === cordata[1]){
                let para = document.createElement('p');
                let correctAnswer = document.createElement('p');
                let elId = data[0];
                answersToSend.push(`On question: ${data[0]}, ${userData.name} gave corret answer. ${data[1]}`);
                result++;
                para.textContent = "Good job you are right!";
                para.className = "correctAnswer";
                correctAnswer.textContent = `${data[1]}`
                document.getElementById(`${elId}`).appendChild(para);
                document.getElementById(`${elId}`).appendChild(correctAnswer); 
               } else {
                let para = document.createElement('p');
                let correctAnswer = document.createElement('p');
                let wrongAnswer = document.createElement('p');
                let elId = data[0];
                answersToSend.push(`On question: ${data[0]}, ${userData.name} gave wrong answer: ${data[1]}. Correct answer: ${cordata[1]}`);
                para.textContent = "Unfortunatly, you are wrong!";
                para.className = "wrongAnswer";
                wrongAnswer.textContent = `Your answer: ${data[1]}`;
                correctAnswer.textContent = `Correct answer: ${cordata[1]}`
                document.getElementById(`${elId}`).appendChild(para);
                document.getElementById(`${elId}`).appendChild(wrongAnswer);
                document.getElementById(`${elId}`).appendChild(correctAnswer);
               }
            }
        }    
    };
    // And add some summary for user 
    const sumarry = document.createElement('h2');
    const sum = Math.round((result/Object.keys(answers).length)*100)/100;
    if(sum===1){sumarry.textContent = `Awesome, you passed this test perfectly!`}
    if(sum>0.9){sumarry.textContent = `Wow, you made ${result} (${sum*100}%) correct answers!`}
    if(sum>0.7){sumarry.textContent = `Good job, you made ${result} (${sum*100}%) correct answers!`}
    if(sum>=0.4){sumarry.textContent = `You made ${result} (${sum*100}%) correct answers. Next time will be better`}
    else {sumarry.textContent = `I know you can do this better. You made ${result} (${sum*100}%) correct answers.`}
    
    div.appendChild(sumarry)
 
    //create obj with user answers
    let userResults = {...userData};
    userResults.answers = answersToSend;
    userResults.summary =  `${userData.name} gave ${result} correct answers and it gives ${sum*100}%`;
    userResults.testName = testName;

    // sending e-mail
    emailjs.send('service_dckp35n', 'template_4ypd9ca', userResults)
    .then(function(response) {
       console.log('SUCCESS!', response.status, response.text);
    }, function(error) {
       console.log('FAILED...', error);
    });
    // adding last button to exit test and close tab
    
    const closingButton = document.createElement('button');
    closingButton.textContent = "I've got it. Close the test";
    closingButton.className = "closingButton"
    closingButton.onclick = ()=>{ window.close()};
    div.appendChild(closingButton);
};

function loadtest (userData,testName,questions) {
      //welcome user
    title.textContent = `Hi, ${userData.name}, you are doing ${testName}`;
    //clear page
    div.innerHTML = '';
    //create form with questions
    const form = document.createElement("form");
    form.id = "test";
    div.appendChild(form);
// !!! TO CHANGE LOADED QUESTIONS AND ADD TEST NAME !!!!
    for(let question of Object.entries(questions)){
        const questionField = document.createElement("fieldset");
        const legend = document.createElement("legend");
        questionField.id = question[0].toLowerCase();
        legend.textContent = question[0];
        questionField.appendChild(legend);
        form.appendChild(questionField)
        //adding questions
        const askQuestion = document.createElement("h3");
        askQuestion.textContent = question[1][0];
        questionField.appendChild(askQuestion)
        //adding answers
        for(i=1;i<question[1].length;i++){
            let para = document.createElement('p');
            let label = document.createElement('label')
            label.setAttribute("for", question[0]+i);
            label.textContent = question[1][i];
            let radio = document.createElement("input");
            radio.setAttribute('required', 'true');
            radio.setAttribute('type', 'radio');
            radio.id = question[0]+i;
            radio.name = question[0]
            para.appendChild(radio);         
            para.appendChild(label);
            questionField.appendChild(para);
        };    
    }
    //add submit button with function
    const buttonPara = document.createElement('p')
    const sendTest = document.createElement('button');
    sendTest.type = "submit";
    sendTest.textContent = 'I have done it!'
    buttonPara.appendChild(sendTest)
    form.appendChild(buttonPara);
    form.onsubmit = async (e) =>{
        e.preventDefault();
        const formId = document.querySelector('#test')
        const testResults = new FormData(formId);
        e.preventDefault();
        const allAnswers = document.querySelectorAll("input");
        const allLabels = document.querySelectorAll("label");
        const studRes = []
        allAnswers.forEach(ans =>{
            if(ans.checked===true){
                allLabels.forEach(lab=>{
                   if(lab.htmlFor===ans.id){
                    let qName = ans.name
                    testResults[`${qName}`] = lab.textContent;
                   }
                })
            }
        });
        // fetch answers from json
        fetch("https://sweet-kleicha-edf916.netlify.app/test-answer.json")
            .then(response => {
                if(!response.ok){
                    const err = new Error("No answers file accessable!")
                    err.status = 404;
                    return err;
                } else {return response.json();}
            })
            //send it to next function 
            .then(json => checkanswers(questions, userData, testResults,json, testName))    
    }
};
// function to choose type of test
function chooseTest(userData) {
    //clear div
    title.textContent = 'Which branch are you interested?'
    div.innerHTML = '';
    div.className = 'test-types';
    div.innerHTML = `<div tabindex="0" id ='bussiness' class='test-type' ><p>BUSSINESS TEST</p></div>
    <div tabindex="0" id ='military' class='test-type'><p>MILITARY TEST</p></div>
    <div tabindex="0" id ='medical' class='test-type'><p>MEDICAL TEST</p></div>
    <div tabindex="0" id ='other' class='test-type'><p>OTHER TEST</p></div>`;
    const bussiness = document.querySelector('#bussiness');
    const military = document.querySelector('#military');
    const medical = document.querySelector('#medical');
    const other = document.querySelector('#other');
    //to fetch data and send it to next function
    function fetchTest (testName) {
        fetch("https://sweet-kleicha-edf916.netlify.app/test.json") //change the end of url to name of test
        .then(response => {
            if(!response.ok){
                const err = new Error("No answers file accessable!")
                err.status = 404;
                return err;
            } else {return response.json();}
        })
        //send it to next function 
        .then(json => loadtest(userData, testName,json))
    };
    // to choose node
    let typesOfTest = document.querySelectorAll('.test-type');
    typesOfTest.forEach(branch => {branch.addEventListener('click', (e)=>{
        const testName = e.target.firstChild.textContent;
        fetchTest(testName);
    })});
    typesOfTest.forEach(branch => {
        branch.addEventListener('keypress', (e)=>{
            if(e.keyCode === 13){
                e.preventDefault();
                const testName = e.target.firstChild.textContent;
                fetchTest(testName);}
    })});
};

studentData.onsubmit = async (e) => {
    e.preventDefault();
    
    const name = document.querySelector('#first-name').value;
    const surname = document.querySelector('#last-name').value;
    const age = document.querySelector('#age').value;
    const email = document.querySelector('#email').value;
    userData.name = name;
    userData.surname = surname;
    userData.age = age;
    userData.email = email;
    chooseTest(userData)
   //move it to next function loadtest(userData)
};
