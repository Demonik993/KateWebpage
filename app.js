document.onload = alert(`Kasia, zaczynamy pracować nad Twoją stroną! Narazie wersja wyłacznie na laptopa`);


const logo = document.querySelector('#logo');

logo.addEventListener('click', ()=>{


    const textBox = document.querySelector('#text-box');
    const message = document.createElement('p');
    if(textBox.id !== "active"){
    const x = document.scrollX
    const y = document.scrollY
    console.log(y)
    console.log(x)
    message.textContent = 'musimy zrobić Ci jakieś logo, potrzebuję wiedzieć co Cię interesuje';
    textBox.appendChild(message);
    textBox.style.display = 'block';
    textBox.style.top = `100px`
    textBox.style.left = `100px`
    textBox.id = "active"
    }
    

})