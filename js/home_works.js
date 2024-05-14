//HOMEWORK 1 Part 1-----------------------------------------------------------------------------------------------------

const gmailInput = document.querySelector("#gmail_input");
const gmailButton = document.querySelector("#gmail_button");
const gmailResult = document.querySelector("#gmail_result");

const regExp = /^[-\w.]+@([A-z0-9][-A-z0-9]+\.)+[A-z]{2,4}$/;

gmailButton.onclick = () => {
    if (regExp.test(gmailInput.value)) {
        gmailResult.innerHTML = "Welcome";
        gmailResult.style.color = "green";
    }else {
        gmailResult.innerHTML = "Account doesn't exist";
        gmailResult.style.color = "red";
    }
};

//HOMEWORK 2 ----------------------------------------------------------------------------------------------------

const parentBlock = document.querySelector(".parent_block");
const childBlock = document.querySelector(".child_block");
let positionX = 0;
let positionY = 0;

const maxParentWidth = parentBlock.offsetWidth - childBlock.offsetWidth
const maxParentHeight = parentBlock.offsetHeight - childBlock.offsetHeight
const moveChildBlock = () => {
    if (positionX > 0 && positionY === maxParentHeight) {
        positionX--;
        childBlock.style.left = `${positionX}px`;
        requestAnimationFrame(moveChildBlock);
    } else if (positionX === 0 && positionY > 0) {
        positionY--;
        childBlock.style.top = `${positionY}px`;
        requestAnimationFrame(moveChildBlock);
    } else if (positionX < maxParentWidth && positionY === 0) {
        positionX++;
        childBlock.style.left = `${positionX}px`;
        requestAnimationFrame(moveChildBlock);
    } else if (positionX === maxParentWidth && positionY < maxParentHeight) {
        positionY++;
        childBlock.style.top = `${positionY}px`;
        requestAnimationFrame(moveChildBlock);
    } else if (positionX > 0 && positionY === maxParentHeight) {
        positionX--;
        childBlock.style.left = `${positionX}px`;
        requestAnimationFrame(moveChildBlock);
    }
};

moveChildBlock();

//-Timer----------------------------------------------------------------------------------------------

document.addEventListener("DOMContentLoaded", function() {
    const secondsDisplay = document.querySelector("#seconds");
    const startButton = document.querySelector("#start");
    const stopButton = document.querySelector("#stop");
    const resetButton = document.querySelector("#reset");

    let intervalId;
    let seconds = 0;
    let isRunning = false;

    function startTimer() {
        if (!isRunning) {
            isRunning = true;
            intervalId = setInterval(() => {
                seconds++;
                secondsDisplay.innerHTML = seconds;
            }, 1000);
        }
    }

    function stopTimer() {
        if (isRunning) {
            clearInterval(intervalId);
            isRunning = false;
        }
    }

    function resetTimer() {
        stopTimer();
        seconds = 0;
        secondsDisplay.innerHTML = seconds;
    }

    startButton.onclick = startTimer;
    stopButton.onclick = stopTimer;
    resetButton.onclick = resetTimer;
});

