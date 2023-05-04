const display = document.getElementById("inputDisplay");
const resultDisplay = document.getElementById("resultDisplay");
const numBtn = document.querySelectorAll("[data-number]");
const operatorBtn = document.querySelectorAll("[data-operator]");
const equalBtn = document.getElementById("equalOperator");
const allClearBtn = document.getElementById("allClearBtn");
const deleteBtn = document.getElementById("deleteBtn");

let operand = "";
let havedot = false;
let answer = "";

const getnumber = (number) => {
    number.addEventListener("click", (e) => {
        if (display.textContent === "0") display.textContent = "";
        if (e.target.textContent === "." && !havedot) {
            havedot = true;
            operand += e.target.textContent;
        } else if (e.target.textContent === "." && havedot) return;
        if (e.target.textContent != ".") operand += parseFloat(e.target.textContent);
        display.textContent = operand;
    });
};
const getoperator = (operator) => {
    operator.addEventListener("click", (operation) => {
        let prevchar = display.textContent.at(-1);
        let operationName = operation.target.textContent;
        havedot = false;
        if (display.textContent === "0") return;
        for (let number of numBtn) {
            if (prevchar === number.textContent) {
                operand += operationName;
                display.textContent = operand;
            }
        }
    });
};
numBtn.forEach((number) => {
    getnumber(number);
});

operatorBtn.forEach((operator) => {
    getoperator(operator);
});

const deleteLastChar = () => {
    display.textContent = display.textContent.slice(0, -1);
    operand = operand.slice(0, -1);
    resultDisplay.textContent = "0";
};

deleteBtn.addEventListener("click", deleteLastChar);
document.addEventListener("keyup", (e) => {
    if (e.key === "Backspace") deleteLastChar();
});

allClearBtn.addEventListener("click", () => {
    havedot = false;
    operand = "";
    display.textContent = "";
    resultDisplay.textContent = "0";
});
const createHistory = () => {
    let historyDiv = document.createElement("div");
    let historyResult = document.createElement("div");
    historyDiv.className = "calculation";
    historyResult.className = "result";
    historyContent.append(historyDiv, historyResult);
    historyDiv.textContent = operand + " " + equalBtn.textContent;
    historyResult.textContent = answer;
    clearHistory.style.display = "block";
};
const result = () => {
    if (display.textContent === "") historyDiv.textContent = "";
    answer = eval(display.textContent);
    resultDisplay.textContent = answer;
    createHistory();
    if (display.textContent === "") resultDisplay.textContent = "0";
};
equalBtn.addEventListener("click", result);
document.addEventListener("keyup", (e) => {
    if (e.key === "Enter") result();
});

const historyBtn = document.querySelector(".history-btn");
const modalHistory = document.querySelector(".history");
const historyBody = document.querySelector(".history-body");
const historyContent = document.querySelector(".history-content");
const closeBtn = document.querySelector(".close-btn");
const clearHistory = document.querySelector(".clear-history");

historyBtn.addEventListener("click", () => {
    modalHistory.style.display = "flex";
    modalHistory.classList.add("history-position");
    historyBody.style.animation = "open-history 1s ease-in";
});

clearHistory.addEventListener("click", () => {
    historyContent.textContent = "";
    clearHistory.style.display = "none";
});

closeBtn.onclick = () => {
    modalHistory.style.display = "none";
};
document.onclick = (event) => {
    if (event.target === modalHistory) {
        modalHistory.style.display = "none";
    }
};

let numberArray = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
let operatorArray = ["+", "-", "*", "/", "%"];
document.addEventListener("keyup", (e) => {
    if (e.key === "." && !havedot) {
        havedot = true;
        operand += e.key;
    } else if (e.key === "." && havedot) return;
    display.textContent = operand;
    for (let number of numberArray) {
        if (e.key === number) {
            operand += e.key;
            display.textContent = operand;
        }
    }
    for (let operator of operatorArray) {
        if (e.key === operator) {
            havedot = false;
            let prevchar = display.textContent.at(-1);
            for (let number of numBtn) {
                if (prevchar === number.textContent) {
                    operand += e.key;
                    display.textContent = operand;
                }
            }
        }
    }
});
