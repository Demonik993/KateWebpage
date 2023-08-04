let studentData = document.querySelector("#student_data");
let userData = new FormData (studentData);
studentData.onsubmit = async (e) => {
    e.preventDefault();
    
    const name = document.querySelector('#first-name').value;
    const surname = document.querySelector('#last-name').value;
    const age = document.querySelector('#age').value;
    const email = document.querySelector('#email').value;
    userData.name = name;
    userData.surname = surname;
    userData.age = age;
    userData.email = email;\};

