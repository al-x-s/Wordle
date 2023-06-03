// ****** GAME SETUP ******

// import wordlist from ./data.mjs file
import { alphabet, keyboardObject, wordList } from "./data.mjs";

// randomly select a word from that list to be the gameWord
let gameWord = wordList[Math.floor(Math.random() * wordList.length)];
// create an Array from that word
let gameWordArray = Array.from(gameWord);
let guessNumber = 1;


// ****** DOCUMENT OBJECTS ******
const container = document.getElementById('container');

// ***** KEYBOARD INPUT FUNCTIONS ******

const updateKeyboard = (letter, color) => {
   
    if (keyboardObject[letter].color === 'green') {

    } else {
        let letterDiv = document.getElementById(letter)
        letterDiv.style.backgroundColor = color;
        keyboardObject[letter].color = color;
    }

}

// a function that executes on ENTER and checks what has been submitted
const checkanswer = (guessArray) => {
    let guessId = `row-guess-${guessNumber}`;
    let rowGuess = document.getElementById(guessId);
    let rowSquares = Array.from(rowGuess.querySelectorAll('div'));

    if (guessArray.length < 5) {
        //dialog with set timeout instead of alert
        alert('Not Enough Letters');
        return;
    }

    let guessWord = guessArray.join('')
    if (wordList.indexOf(guessWord.toLowerCase()) === -1) {
        //dialog with set timeout instead of alert
        alert('Not A Valid Word');
        return;
    }

    // comparison with gameWordArray
    console.log(`ANSWER = ${gameWord}`)
    console.log(gameWordArray);
    console.log(`GUESS = ${guessWord}`)
    console.log(guessArray);

    const resultOfGuess = () => {
        
        for (let i = 0; i < guessArray.length; i++) {

            let letter = guessArray[i];
            let color = ''
     
            if (letter === gameWordArray[i]) {
                color = 'green' 
                rowSquares[i].style.backgroundColor = color;
                updateKeyboard(letter, color);
            } else if (gameWordArray.includes(letter)) {
                color = 'yellow'
                rowSquares[i].style.backgroundColor = color;
                updateKeyboard(letter, color);
            } else {
                color = 'grey'
                rowSquares[i].style.backgroundColor = color;
                updateKeyboard(letter, color);
            }
     
        }

        guessNumber++
    }

    resultOfGuess();

    // updateKeyboard(guessArray);

}

// a function that defines what to do with the input submitted
const keyboardInput = (e) => {
    // define a constant that is the input letter
    let guessId = `row-guess-${guessNumber}`;
    let rowGuess = document.getElementById(guessId);
    let rowSquares = Array.from(rowGuess.querySelectorAll('div'));
  
    if (e.key === 'Backspace') {
       
        for (let i = rowSquares.length-1; i >= 0; i--) {
            if (rowSquares[i].textContent !== '') {
                rowSquares[i].textContent = '';
                return;
            }
        }

        return;
    }

    if (e.key === 'Enter') {
        const guessArray = [];
        
        rowSquares.forEach((square) => {
            if (square.textContent !== '') {
                guessArray.push(square.textContent.toLowerCase());
            }
        })

        checkanswer(guessArray);
        return;
    }

    
    const regex = /[a-z]/i
    if (regex.test(e.key)) {

        const letter = e.key.toUpperCase();

        for (let i = 0; i < rowSquares.length; i++) {
            if (rowSquares[i].textContent === '') {
                rowSquares[i].textContent = letter;
                return;
            }
        }

    }
    
    
}

// ****** EVENT LISTENERS ******
document.addEventListener('keyup', keyboardInput)



// 

