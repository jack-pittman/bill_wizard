
let welcomeText = "" 

function loadTextFile() {
    console.log("Fetching Welcome Text!!")
    fetch('welcome-text.txt')
        .then(response => response.text())
        .then(data => {
            welcomeText = data;
            setWelcomeText();  // Use the text after it has been loaded
        })
        .catch(error => console.error('Fetch error:', error));
}

function setWelcomeText() {

    document.getElementById('welcome-message').innerHTML = welcomeText;
}

console.log("loading text file!")

loadTextFile();
setWelcomeText();
