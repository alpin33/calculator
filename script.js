const curNumber = document.querySelector("[data-current-operand]");
const prevNumber = document.querySelector("[data-previous-operand]");
const numbers = document.querySelectorAll("[data-number]");
const operation = document.querySelectorAll("[data-operation]");
const allClear = document.querySelector("[data-all-clear]");
const deleteLastNumberButton = document.querySelector("[data-delete]");
const result = document.querySelector("[data-equals]");
const sqrt = document.querySelector("[data-operation-sqrt]");
const mathPow = document.querySelector("[data-operation-pow]");
let isAnswer = false;
let isSqrt = false;
let isError = false;

function writeNumber(number) {
  if (isAnswer || isError) {
    if (curNumber.innerHTML) {
      curNumber.innerHTML = "";
    }
    isAnswer = false;
    isError = false;
  }
  (number.target.innerHTML === "." && !curNumber.innerHTML.includes(".")) ||
  number.target.innerHTML !== "."
    ? (curNumber.innerHTML += number.target.innerHTML)
    : null;
}
function mathPowCalc() {
  if (!prevNumber.innerHTML) {
    prevNumber.innerHTML = `${curNumber.innerHTML} ^`;
    curNumber.innerHTML = "";
  } else {
    calculate3(`${prevNumber.innerHTML} ${curNumber.innerHTML}`, "^");
  }
}
function deleteLastNumber(press) {
  if (isError) {
    curNumber.innerHTML = "";
  }
  press
    ? (curNumber.innerHTML = curNumber.innerHTML.slice(0, -1))
    : null;
}

function deleteAllNumber() {
  curNumber.innerHTML = "";
  prevNumber.innerHTML = "";
}

function calculate(operat) {
  const operationValue = operat.target.innerHTML;
  if (isError) {
    currentNumber.innerHTML = "";
    isError = false;
  }
  if (isSqrt) {
    prevNumber.innerHTML = "";
    isSqrt = false;
  }
  if (prevNumber.innerHTML && curNumber.innerHTML) {
    calculat(
      `${prevNumber.innerHTML} ${curNumber.innerHTML}`,
      operationValue
    );
    curNumber.innerHTML = "";
  } else if (curNumber.innerHTML) {
    prevNumber.innerHTML = curNumber.innerHTML + ` ${operationValue}`;
    curNumber.innerHTML = "";
  } else if (!curNumber.innerHTML && operationValue == "-") {
    curNumber.innerHTML = "-";
  }
}

function returnResult() {
  if (prevNumber.innerHTML) {
    curNumber.innerHTML = `${prevNumber.innerHTML} ${curNumber.innerHTML}`;
    prevNumber.innerHTML = "";
    calcula(curNumber.innerHTML);
  }
}

function sqrtNumber(number) {
  if (curNumber.innerHTML) {
    if (!curNumber.innerHTML.includes("-")) {
      prevNumber.innerHTML =
        number.target.innerHTML + curNumber.innerHTML;
      curNumber.innerHTML = Math.sqrt(curNumber.innerHTML);
      isSqrt = true;
    } else {
      curNumber.innerHTML = "Error";
      isError = true;
    }
  }
}

function calcula(res) {
  const resArr = res.split(" ");
  console.log(res);
  console.log(resArr, 2);
  if (resArr[0] === ".") {
    resArr[0] = "0";
  }
  if (resArr[1] === "+") {
    answer = Number(resArr[0]) + Number(resArr[2]);
  } else if (resArr[1] === "-") {
    answer = Number(resArr[0]) - Number(resArr[2]);
  } else if (resArr[1] === "*") {
    answer = Number(resArr[0]) * Number(resArr[2]);
  } else if (resArr[1] === "÷") {
    answer = Number(resArr[0]) / Number(resArr[2]);
  } else if (resArr[1] === "^") {
    answer = Math.pow(Number(resArr[0]), Number(resArr[2]));
  }
  curNumber.innerHTML = fixNumber(answer);
  isAnswer = true;
}

function calculat(res, nextOperator) {
  const resArr = res.split(" ");
  let answer;
  console.log(resArr, 3);
  if (resArr[1] === "+") {
    answer = Number(resArr[0]) + Number(resArr[2]);
  } else if (resArr[1] === "-") {
    answer = Number(resArr[0]) - Number(resArr[2]);
  } else if (resArr[1] === "*") {
    answer = Number(resArr[0]) * Number(resArr[2]);
  } else if (resArr[1] === "÷") {
    answer = Number(resArr[0]) / Number(resArr[2]);
  } else if (resArr[1] === "^") {
    answer = Math.pow(Number(resArr[0]), Number(resArr[2]));
  }
  prevNumber.innerHTML = fixNumber(answer) + ` ${nextOperator}`;
  isAnswer = true;
}

function fixNumber(number) {
  return parseFloat(number.toPrecision(12));
}
numbers.forEach((number) => number.addEventListener("click", writeNumber));
operation.forEach((value) => value.addEventListener("click", calculate));
deleteLastNumberButton.addEventListener("click", deleteLastNumber);
allClear.addEventListener("click", deleteAllNumber);
result.addEventListener("click", returnResult);
sqrt.addEventListener("click", sqrtNumber);
mathPow.addEventListener("click", mathPowCalc);