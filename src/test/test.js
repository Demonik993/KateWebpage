let studentData = document.querySelector("#student_data");
let userData = new FormData (studentData);
const test = [
    ['Question1','answer 1', 'answer 2', 'answer 3', "answer 4"],
    ['Question2','answer 1', 'answer 2', 'answer 3', "answer 4"],
    ['Question3','answer 1', 'answer 2', 'answer 3', "answer 4"],
    ['Question4','answer 1', 'answer 2', 'answer 3', "answer 4"],
    ['Question5','answer 1', 'answer 2', 'answer 3', "answer 4"],
    ['Question6','answer 1', 'answer 2', 'answer 3', "answer 4"]
]
function loadtest () {
    //welcome user
    document.querySelector('h1').textContent = `Hi, ${userData.name}`;
    //clear page
    const div = document.querySelector('div');
    div.innerHTML = '';
    //create form with questions
    const form = document.createElement("form");
    form.id = "test";
    div.appendChild(form);
    test.forEach(question=>{
        let questions = document.createElement("fieldset");
        let legend = document.createElement("legend");
        questions.id = question[0].toLowerCase();
        legend.textContent = question[0];
        //adding answers
        for(i=1;i<question.length;i++){
            let para = document.createElement('p');
            let label = document.createElement('label')
            label.setAttribute("for", question[0]+i);
            label.textContent = question[i];
            let radio = document.createElement("input");
            radio.setAttribute('type', 'radio');
            radio.id = question[0]+i;
            radio.name = question[0]
            para.appendChild(radio);         
            para.appendChild(label);
            questions.appendChild(para);
        } 
        questions.appendChild(legend)
        form.appendChild(questions)       
    })
    //add submit button with function
    const buttonPara = document.createElement('p')
    const sendTest = document.createElement('button');
    sendTest.type = "submit";
    sendTest.textContent = 'I have done it!'
    buttonPara.appendChild(sendTest)
    form.appendChild(buttonPara);
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
    loadtest()
};

