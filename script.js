
let timerValue = 0; // variable to store the remaining time in minutes
let interval = null; 
let output = document.querySelector("form");

// SETTING TIME: Title
function updateTitleAndMeta() { //function, that updates the page title and meta element content according to the current timerValue in minutes (synchronizing the timer information with the actual countdown)
    let titleElement = document.querySelector("title");
    let timerMetaElement = document.getElementById("timer-meta");
    let roundedTimerValue = Math.round(timerValue);
    titleElement.textContent = `${roundedTimerValue } minut`;
    timerMetaElement.setAttribute("content", timerValue.toString());
}

// SETTING TIME: Page
function startCountdown(minutes) { // function that starts the countdown
    clearInterval(interval); 
    timerValue = minutes;
    updateTitleAndMeta();   

 interval = setInterval(function() {
    if (timerValue > 0) {
            timerValue -= 1 / 60;
            updateTitleAndMeta();
        } else {
            clearInterval(interval); // Stop the interval when timer reaches 0
            output.style.display = "block";
        }
    }, 1000); // Update every minute
}

function getMinutesAndSeconds(value) {
    let minutes = Math.floor(value);
    let seconds = Math.floor((value - minutes) * 60);
    return { minutes, seconds }; // convert to minutes and seconds
}

// SETTING TIME: Button
let invalidOutput = document.createElement("p"); 
let invalidTextBlock = document.querySelector(".invalid_text_block");    
let timerButton = document.querySelector(".timer_button");   

timerButton.addEventListener("click", function(event){
    event.preventDefault() // prevents the default behavior of the button
    let preInput = document.querySelector(".timer_bar").value;
    let input = parseFloat(preInput.replace(",", ".").replace(" ", ""))

    if(!isNaN(input) && input > 0 && input <= 60) {
        output.style.display = "none";
        invalidTextBlock.textContent = "";
        startCountdown(input);
    } else if(input > 60) {
        invalidTextBlock.textContent = "Vysoké číslo, můžete zadat maxmimálně 60 min!";
        invalidTextBlock.style.color = "red";
        document.querySelector(".invalid_text_block").appendChild(invalidOutput);
    } else if(input <= 0) {
        invalidTextBlock.textContent = "Nízké číslo, musíte zadat více, než 0 min!";
        invalidTextBlock.style.color = "red";
        document.querySelector(".invalid_text_block").appendChild(invalidOutput);
    } else {
        invalidTextBlock.textContent = "Chybné zadání, zadávejte pouze čísla!";
        invalidTextBlock.style.color = "red";
        document.querySelector(".invalid_text_block").appendChild(invalidOutput);
    } 
})



// STOP TIMER
document.addEventListener("click", function(event) {   
    let timerForm = document.querySelector("form");
    if (!timerForm.contains(event.target)) {
        let { minutes, seconds } = getMinutesAndSeconds(timerValue);
        output.style.display = "block";
        invalidOutput.textContent = `Uběhlo ${minutes} minut a ${seconds} sekund.`;
        invalidOutput.style.color = "green";
        document.querySelector(".invalid_text_block").appendChild(invalidOutput);
    }
    if (!timerForm.contains(event.target) && interval !== null) {
        clearInterval(interval);
        timerValue = 0;
        updateTitleAndMeta();
        output.style.display = "block";
    }
})


//SETTING - WALL
let whiteButton = document.querySelector(".color_1");
let grayButton = document.querySelector(".color_2");
let greenButton = document.querySelector(".color_3");
let lemonButton = document.querySelector(".color_4");
let blueButton = document.querySelector(".color_5");
let img1Button = document.querySelector(".img1");
let img2Button = document.querySelector(".img2");
let img3Button = document.querySelector(".img3");
let img4Button = document.querySelector(".img4");
let img5Button = document.querySelector(".img5");


// Function to change the background
let wallChanger = function(button, type) {
    button.addEventListener("click", function(event) {
        event.preventDefault();
        let output = document.querySelector("body");
        if (type === "color") {
            let color = button.getAttribute("data-color");
            output.style.background = color;
            output.style.backgroundImage = "";
        } else if (type === "image") {
            output.style.backgroundImage = `url(${button.src})`;
            output.style.backgroundSize = "cover";
            output.style.backgroundRepeat = "no-repeat";
        }
    });
}

wallChanger(whiteButton, "color");
wallChanger(grayButton, "color");
wallChanger(greenButton, "color");
wallChanger(lemonButton, "color");
wallChanger(blueButton, "color");

wallChanger(img1Button, "image");
wallChanger(img2Button, "image");
wallChanger(img3Button, "image");
wallChanger(img4Button, "image");
wallChanger(img5Button, "image");
