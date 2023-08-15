const search = document.querySelector('#searching')

//SERCHING WEBSITE
search.onsubmit = async (e) => {
    e.preventDefault();
    console.log("HELLO WORLD")

    const input = document.querySelector("#search").value;
    console.log(input)
}
