const search = document.querySelector('#searching');
const subscirbe = document.querySelector('#newsletter');
const searchResults = document.querySelector('[search-template]');
const resultsContainer = document.querySelector('[searching-result-container]');

//SERCHING WEBSITE
search.onsubmit = async (e) => {
    e.preventDefault();
    resultsContainer.innerHTML = '';
    const quest = document.querySelector('#search');
    const siteContent = document.querySelectorAll('a');
    let results = 0
    if(quest.value.trim()!==''){
        siteContent.forEach(val => {
            if(val.textContent.toLowerCase().includes(quest.value.toLowerCase().trim())){
            results++;
            const card = searchResults.content.cloneNode(true).children[0];
            const header = card.querySelector('[result-title]');
            const para = card.querySelector('[result-description]')
            const link = card.querySelector('[result-link]');
            header.textContent = val.textContent;
            para.textContent = val.title;
            link.href = val.href;
            link.textContent = val.href;
            resultsContainer.append(card);
            };
        });
        if(results===0){
            const h2 = document.createElement('h2');
            h2.textContent = `No results for "${quest.value}".`
            resultsContainer.appendChild(h2);
            quest.focus()
        } else { 
            quest.value = '';
            const child = resultsContainer.firstChild.children[0];
            child.focus();
            console.log( )
            window.scroll({top: search.getBoundingClientRect().top, behavior: "smooth" })
        }
    } else {
        quest.value = '';
        quest.focus();
    };
};
// subscription       

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
};

// to add new enter and onclick tool for all dives in articles