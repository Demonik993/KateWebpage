// document.onload = alert(`Kasia, zaczynamy pracować nad Twoją stroną! Narazie wersja wyłacznie na ekrany pow 600px. Musimy zastanowić się nad kolorystyką.`);


const logo = document.querySelector('#logo');
const boxLogo = document.querySelector('#text-box')
const webhead = document.querySelector('#name');
const boxName = document.querySelector('#text-name');
const navPan = document.querySelector('#nav-pan');
const boxNav = document.querySelector('#text-nav');

function textBox(element, box){
    element.addEventListener('mouseover', (e)=>{
        const x = e.clientX;
        const y = e.clientY;
        box.style.display = 'flex';
        box.style.top = `${y}px`;
        box.style.left = `${x}px`;
        element.addEventListener('mouseout', ()=>{
            box.style.display = "none"
        });
    });
};
 textBox(logo,boxLogo);
 textBox(webhead,boxName);
 textBox(navPan,boxNav);

