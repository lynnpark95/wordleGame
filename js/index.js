const answer = "HARRY";
let index = 0;
let row = 0;
let timerId = 0;

appStart = () => {
  const displayGameOver = () => {
    const div = document.createElement("div");
    div.innerText = "Game Over.";
    div.style =
      "display:flex; justify-content:center; align-items:center; position:absolute; top:40vh; left:42vw; background-color:red; width:200px; height:100px; ";
    document.body.appendChild(div);
  };
  const gameOver = () => {
    window.removeEventListener("keydown", handleKeyDown);
    displayGameOver();
    clearInterval(timerId);
  };

  const nextLine = () => {
    if (row === 6) {
      return gameOver;
    }
    row += 1;
    index = 0;
  };

  const handleEnterKey = () => {
    let numOfAnswer = 0;

    for (let i = 0; i < 5; i++) {
      const block = document.querySelector(
        `.board-block[data-index='${row}${i}']`
      );
      const inputLetter = block.innerText;
      const answerLetter = answer[i];
      if (inputLetter === answerLetter) {
        block.style.background = "green";
        numOfAnswer++;
      } else if (answer.includes(inputLetter)) {
        block.style.background = "#C9B458";
      } else {
        block.style.background = "#787C7E";
      }
      block.style.color = "white";
    }
    if (numOfAnswer === 5) {
      gameOver();
    } else {
      nextLine();
    }
  };
  const handleBackspace = () => {
    if (index > 0) {
      const prevBlock = document.querySelector(
        `.board-block[data-index='${row}${index - 1}']`
      );
      prevBlock.innerText = "";
    }
    if (index !== 0) {
      index -= 1;
    }
  };

  const handleKeyDown = (event) => {
    const key = event.key;
    const keyCode = event.keyCode;
    const thisBlock = document.querySelector(
      `.board-block[data-index='${row}${index}']`
    );
    if (event.key === "Backspace") {
      handleBackspace();
    } else if (index === 5) {
      if (event.key === "Enter") {
        handleEnterKey();
      } else {
        return;
      }
    } else if (65 <= keyCode && keyCode <= 90) {
      thisBlock.innerText = key.toUpperCase();
      index++;
    }
  };
  const startTimer = () => {
    const startTime = new Date();

    function setTime() {
      const currentTime = new Date();
      const timeElapsed = new Date(currentTime - startTime);
      const minutes = timeElapsed.getMinutes().toString().padStart(2, "0");
      const sec = timeElapsed.getSeconds().toString().padStart(2, "0");
      const timeDiv = document.querySelector("#time");
      timeDiv.innerText = `${minutes}:${sec}`;
    }
    timerId = setInterval(setTime, 1000);
  };
  startTimer();
  window.addEventListener("keydown", handleKeyDown);
};

appStart();
