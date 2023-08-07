const studentData = document.querySelector("#student_data");
const title = document.querySelector('h1');
const div = document.querySelector('div');


let userData = new FormData (studentData);

const test = [
    ['Question1','How to say...?','answer 1', 'answer 2', 'answer 3', "answer 4"],
    ['Question2','How to say...?','answer 1', 'answer 2', 'answer 3', "answer 4"],
    ['Question3','How to say...?','answer 1', 'answer 2', 'answer 3', "answer 4"],
    ['Question4','How to say...?','answer 1', 'answer 2', 'answer 3', "answer 4"],
    ['Question5','How to say...?','answer 1', 'answer 2', 'answer 3', "answer 4"],
    ['Question6','How to say...?','answer 1', 'answer 2', 'answer 3', "answer 4"]
];

// check answer save and send it as an email.
function checkanswers(userData, resFormData, answers){
    let result = 0;
    // new Object with answers
    const correctAnswers = new Object(answers);
    // clear all HTML file
    div.innerHTML = ''
    // lets create a page:
    title.textContent = `${userData.name}, congratulations you complete your test!`
    const paraRes = document.createElement('h2');
    paraRes.textContent = 'Below you can find your results:';
    div.style.display = "block";
    div.appendChild(paraRes)
    test.forEach(val=> {
        const article = document.createElement('article');
        article.id = val[0];
        div.appendChild(article);
        const head = document.createElement('h3');
        head.textContent = `${val[0]}: ${val[1]}`;
        article.appendChild(head);
    })

    // compare all data
    
    for(let cordata of Object.entries(correctAnswers)){
        for(let data of Object.entries(resFormData)){
            if(data[0]===cordata[0]){
              if(data[1] === cordata[1]){
                let para = document.createElement('p');
                let correctAnswer = document.createElement('p');
                let elId = data[0];
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
    }
    const sumarry = document.createElement('h2');
    const sum = Math.round(Math.floor(result/test.length));
    sumarry.textContent = `You made ${result} (${sum/100}%) correct answers!`;
    div.appendChild(sumarry)


}

function loadtest (userData) {
      //welcome user
    title.textContent = `Hi, ${userData.name}`;
    //clear page
   
    div.innerHTML = '';
    //create form with questions
    const form = document.createElement("form");
    form.id = "test";
    div.appendChild(form);
    test.forEach(question=>{
        const questions = document.createElement("fieldset");
        const legend = document.createElement("legend");
        questions.id = question[0].toLowerCase();
        legend.textContent = question[0];
        form.appendChild(questions)
        //adding questions
        const askQuestion = document.createElement("h3");
        askQuestion.textContent = question[1];
        questions.appendChild(askQuestion)
        //adding answers
        for(i=2;i<question.length;i++){
            let para = document.createElement('p');
            let label = document.createElement('label')
            label.setAttribute("for", question[0]+i);
            label.textContent = question[i];
            let radio = document.createElement("input");
            radio.setAttribute('required', 'true');
            radio.setAttribute('type', 'radio');
            radio.id = question[0]+i;
            radio.name = question[0]
            para.appendChild(radio);         
            para.appendChild(label);
            questions.appendChild(para);
        } 
        questions.appendChild(legend)
        //form.appendChild(questions)       
    })
    //add submit button with function
    const buttonPara = document.createElement('p')
    const sendTest = document.createElement('button');
    sendTest.type = "submit";
    sendTest.textContent = 'I have done it!'
    buttonPara.appendChild(sendTest)
    form.appendChild(buttonPara);

    form.onsubmit = async (e) =>{
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
        fetch('../dataFiles/test-answer.json')
            .then(response => {
                if(!response.ok){
                    throw new Error(`HTTP error: ${response.status}`);
                }
                return response.json();
            })
            //send it to next function 
            .then(json => checkanswers(userData, testResults,json))
           // .catch(err => console.error(`Fetch problem: ${err.message}`) );      
    }
}

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
    loadtest(userData)
};
