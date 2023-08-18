const search = document.querySelector('#searching');
const subscirbe = document.querySelector('#newsletter')

//SERCHING WEBSITE
search.onsubmit = async (e) => {
    e.preventDefault();
    const quest = document.querySelector('#search');
    const siteContent = document.querySelectorAll('a');
    siteContent.forEach(val => {
        if(quest.value.toLowerCase() == val.textContent.toLowerCase())
        console.log(val)
    });
    
        
}
subscirbe.onsubmit = async (e) =>{
    e.preventDefault();
    const email =  document.querySelector('#newsEmail');
    const level = document.querySelector('#english-level');
    const levelVal = level.value === "" ? "User didn't define level" : level.value;
    const toSubscribe  = {};
    toSubscribe.email = email.value;
    toSubscribe.level = levelVal;
    emailjs.send("service_dckp35n","template_qpf6att", toSubscribe)
    .then(function(response) {
       console.log('SUCCESS!', response.status, response.text);
    }, function(error) {
       console.log('FAILED...', error);
    });
}