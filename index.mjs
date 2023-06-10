// ****** GAME SETUP ******

// import wordlist from ./data.mjs file
import { alphabet, keyboardObject, wordList, prizeMoney } from "./data.mjs";

// randomly select a word from that list to be the gameWord
let gameWord = wordList[Math.floor(Math.random() * wordList.length)];
// create an Array from that word
let gameWordArray = Array.from(gameWord);
let guessNumber = 1;
let round = 1;
let wins = 0;


// ****** COLOURS ******
// Colours for keyboardObject.states
const unfoundColor = '#D0CCD0'
const foundColor = '#CBA328'
const locatedColor = '#69995D'
const discardedColor = 'grey'
const backgroundColor = '#240046'


// ****** DOCUMENT OBJECTS ******
const container = document.getElementById('container');
const invalidWordDialog = document.getElementById('invalidWord');
const notEnoughLettersDialog = document.getElementById('notEnoughLetters');
const roundCounter = document.getElementById('roundCounter');
const roundWinDialog = document.getElementById('roundWinDialog');
const roundWinMessage = document.getElementById('roundWinMessage');
const gameLoseMessage = document.getElementById('gameLoseMessage')
const nextRoundButton = document.getElementById('nextRound');
const gameWinDialog = document.getElementById('gameWinDialog');
const gameWinMessage = document.getElementById('gameWinMessage');
const newGameWinButton = document.getElementById('newGameWin');
const newGameLoseButton = document.getElementById('newGameLose');
const lifelinesButton = document.getElementById('lifelines');
const lifelinesDialog = document.getElementById('lifelinesDialog');
const lifelineDialogButtons = lifelinesDialog.querySelectorAll('button');
const rowRevealDiv = document.getElementById('row-reveal');
const revealBoxes = rowRevealDiv.querySelectorAll('div');
const gameLoseDialog = document.getElementById('gameLoseDialog');
const keyboardDiv = document.getElementById('keyboard');

// ****** Reset Reveal Boxes ******

const resetReveal = () => {
    revealBoxes.forEach((box) => {
        box.textContent = '?';
        box.style.backgroundColor = backgroundColor;
    })
};

// ****** NEXT ROUND FUNCTION ******

const nextRound = () => {
    guessNumber = 1
    roundCounter.textContent = `Round ${round} - ${prizeMoney[round-1]}`;
    gameWord = wordList[Math.floor(Math.random() * wordList.length)];
    gameWordArray = Array.from(gameWord);
    // console.log(`Round ${round} word is ${gameWord}`);
    // reset grid squares to empty...you'll need to i
    const gameSquares = Array.from(document.getElementsByClassName('square'));

    gameSquares.forEach((square) => {
        square.textContent = '';
        square.style.backgroundColor = backgroundColor;
    })
    // reset keyboard to lightgrey
    alphabet.forEach((letter) => {
        let letterDiv = document.getElementById(letter)
        letterDiv.style.backgroundColor = unfoundColor;
        keyboardObject[letter].state = 'unfound';
    })

    resetReveal()

}

// ****** NEW GAME FUNCTION ******

const newGame = () => {
    wins++
    round = 1;
    nextRound();
    lifelineDialogButtons.forEach((button) => {
        button.disabled = false;
    });

    askAudienceIcon.style.color = '#FBFCFF';
    fiftyFiftyIcon.style.color = '#FBFCFF';
    newWordIcon.style.color = '#FBFCFF';
    phoneFriendIcon.style.color = '#FBFCFF';

    resetReveal()

    

}


// ***** KEYBOARD INPUT FUNCTIONS ******

const updateKeyboard = (letter, state, color) => {
   
    if (keyboardObject[letter].state === 'located') {

    } else {
        keyboardObject[letter].state = state;
        let letterDiv = document.getElementById(letter)
        letterDiv.style.backgroundColor = color;
    }

}

// The gameWordObject which is used to identify instances of double letters



// a function that executes on ENTER and checks what has been submitted
const checkanswer = (guessArray) => {
    let guessId = `row-guess-${guessNumber}`;
    let rowGuess = document.getElementById(guessId);
    let rowSquares = Array.from(rowGuess.querySelectorAll('div'));

    if (guessArray.length < 5) {
        notEnoughLettersDialog.showModal();
        function closeBox() {
            notEnoughLettersDialog.close()
        }
        setInterval(closeBox, 2000);
        return;
    }

    let guessWord = guessArray.join('')
    if (wordList.indexOf(guessWord.toLowerCase()) === -1) {
        invalidWordDialog.showModal();
        function closeBox() {
            invalidWordDialog.close()
        }
        setInterval(closeBox, 2000);
        return;
    }

    // comparison with gameWordArray

    const resultOfGuess = () => {

        // create a guessWordObject with a key/value pair of indices and an array of 0-4
        let guessWordObject = {
            indices: [0, 1, 2, 3, 4],
            addLetter(letter, index) {
                    this[letter] = {
                    "count": 1,
                    "index": [index], 
                }
            }
        };
        // create a gameWordObject that does the same
        let gameWordObject = {
            indices: [0, 1, 2, 3, 4],
            addLetter(letter, index) {
                    this[letter] = {
                    "count": 1,
                    "index": [index], 
                }
            }
        };


        // for our gameWord object create keys for the letters in the gameWordArray then have a count and index for each letter which counts each instance of the letter and records its index
        
        for (let i = 0; i < gameWordArray.length; i++) {
                    
            let letter = gameWordArray[i];
        
            if (gameWordObject[letter] == undefined) {
                gameWordObject.addLetter(letter, i);
            } else {
                gameWordObject[letter].count++;
                gameWordObject[letter].index.push(i);
            }

        }

        // do the same for the guessWordObject
        
        for (let i = 0; i < guessArray.length; i++) {
            
            let letter = guessArray[i];

            if (guessWordObject[letter] == undefined) {
                guessWordObject.addLetter(letter, i);
            } else {
                guessWordObject[letter].count++;
                guessWordObject[letter].index.push(i);
            }
        
        }

        //make a set from the guess Array which reduces it to unique letters only

        let guessWordSet = [...new Set(guessArray)];

        guessWordSet.forEach((letter) => {
            // first you must handle if the letters is not in the gameword
            if (gameWordObject[letter] == undefined) {
                guessWordObject[letter].index.forEach((index) => {
                    rowSquares[index].style.backgroundColor = 'black'
                    // guessWordObject.indices.splice(index, 1);
                })
                // Send state and colour to the updateKeyboard function
                let state = 'discarded'
                let color = discardedColor
                updateKeyboard(letter, state, color);
                return;
            }
            
            // if the letter is in the game word you must assess how many instances of the letter is in the gameword
            let letterInstanceCount = gameWordObject[letter].count;
            // compare the indexes of the letter to see if there is a located letter
            guessWordObject[letter].index.forEach((index) => {
                if (gameWordObject[letter].index.includes(index)) {
                    let state = 'located';
                    let color = locatedColor;
                    rowSquares[index].style.backgroundColor = locatedColor;
                    updateKeyboard(letter, state, color);
                    letterInstanceCount--
                } 
            })
        
            // now search for yellow letters but not if the count reaches 0 AND the index has been removed from the indices
        
            guessWordObject[letter].index.forEach((index) => {
                if (guessWordObject.indices.includes(index) && letterInstanceCount !== 0) {
                    let state = 'found';
                    let color = foundColor;
                    if (rowSquares[index].style.backgroundColor != 'rgb(105, 153, 93)') {
                        rowSquares[index].style.backgroundColor = foundColor;
                    }
                    updateKeyboard(letter, state, color);
                    letterInstanceCount--
                } else if (letterInstanceCount == 0 && rowSquares[index].style.backgroundColor === 'rgb(36, 0, 70)') {
                    rowSquares[index].style.backgroundColor = 'black';
                }
            })
        
    })

        guessNumber++
    }

    
    resultOfGuess();

    
    
    if (guessWord === gameWord && round < 5) {
        roundWinMessage.innerHTML = `You correctly guessed <span id="answer">${gameWord.toUpperCase()}</span>`;
        roundWinDialog.showModal();
        round++
    } else if (guessWord === gameWord) {
        gameWinDialog.showModal();
        confetti();
        
    } else if (guessWord !== gameWord && guessNumber === 6) {
        gameLoseMessage.innerHTML = `You Lost! The correct answer was <span id="answer">${gameWord.toUpperCase()}</span>`
        gameLoseDialog.showModal();
    }
}

// a function that defines what to do with the input submitted
const keyboardInput = (e) => {
    // define a constant that is the input letter
    let guessId = `row-guess-${guessNumber}`;
    let rowGuess = document.getElementById(guessId);
    let rowSquares = Array.from(rowGuess.querySelectorAll('div'));
  
    if (e.key === 'Meta' || e.key === 'F12') {
        return;
    }

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
        let guessArray = [];
        
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

// ****** ON SCREEN KEYBOARD INPUT ******

const screenKeyboard = (e) => {
    if (!e.target.classList.contains('keyboardButton')) {
        return;
    }

    let guessId = `row-guess-${guessNumber}`;
    let rowGuess = document.getElementById(guessId);
    let rowSquares = Array.from(rowGuess.querySelectorAll('div'));
  

    if (e.target.id === 'Backspace') {
       
        for (let i = rowSquares.length-1; i >= 0; i--) {
            if (rowSquares[i].textContent !== '') {
                rowSquares[i].textContent = '';
                return;
            }
        }

        return;
    }

    if (e.target.id === 'Enter') {
        let guessArray = [];
        
        rowSquares.forEach((square) => {
            if (square.textContent !== '') {
                guessArray.push(square.textContent.toLowerCase());
            }
        })

        checkanswer(guessArray);
        return;

    }


    
    const regex = /[a-z]/i
    if (regex.test(e.target.id)) {

        const letter = e.target.id.toUpperCase();

        for (let i = 0; i < rowSquares.length; i++) {
            if (rowSquares[i].textContent === '') {
                rowSquares[i].textContent = letter;
                return;
            }
        }

    }

}

keyboardDiv.addEventListener('touchstart', screenKeyboard);
// keyboardDiv.addEventListener('click', screenKeyboard);


// ****** "SHUFFLE" FUNCTION ******

function shuffle(array) {
    let currentIndex = array.length,  randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex != 0) {

        // Pick a remaining element.
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }

    return array;
}

// ****** LIFE LINES ******

const askAudienceIcon = document.getElementById('askAudienceIcon');
const fiftyFiftyIcon = document.getElementById('fiftyFiftyIcon');
const newWordIcon = document.getElementById('newWordIcon');
const phoneFriendIcon = document.getElementById('phoneFriendIcon');




const openLifeline = () => {
    lifelinesDialog.showModal();
}

const fiftyfifty = (button) => {
    button.disabled = true;
    fiftyFiftyIcon.style.color = 'black';
    //create an array which pushes keys for values of 'lightgrey' from keyboardObject
    let unusedLetters = [];
    alphabet.forEach((letter) => {
        if (keyboardObject[letter].state === 'unfound') {
            unusedLetters.push(letter);
        }
    });
    

    //remove letters from the array which are in the gameWord
    gameWordArray.forEach((letter) => {
        if (unusedLetters.includes(letter)) {
            let index = unusedLetters.indexOf(letter);
            unusedLetters.splice(index, 1);
        }
    });
    

    //"shuffle" unused letters array
    shuffle(unusedLetters);

    //remove every 2nd value in the array
    unusedLetters.forEach((letter) => {
        if (unusedLetters.indexOf(letter)%2 === 0) {
            let index = gameWordArray.indexOf(letter);
            unusedLetters.splice(index, 1);
        }
    })

    //of the remaining letters change each value in the keyboardObject to 'grey' as well as the backgroundColor of each value in the keyboardDiv

    unusedLetters.forEach((letter) => {
        let box = document.getElementById(letter);
        box.style.backgroundColor = discardedColor;
        keyboardObject[letter].state = 'discarded';
    })

    // close Lifelines dialog window
    lifelinesDialog.close();
}

const askAudience = (button) => {
    button.disabled = true;
    askAudienceIcon.style.color = 'black';

    // first create an array which takes the index of any revealDiv's that are already in use

    let alreadyRevealedIndex = [];

    revealBoxes.forEach((box, index) => {
        if (box.textContent !== '?') {
            alreadyRevealedIndex.push(index);
        }
    })


    // take the word Array and look through the keyboardObject for all of the letters that are lightgrey and push them into a new array
    let askAudienceArray = [];

    gameWordArray.forEach((letter, index) => {
        if (index !== alreadyRevealedIndex[0] && keyboardObject[letter].state === 'unfound') {
            askAudienceArray.push(letter);
        }
    });

    // select a value from the array at random

    let askAudienceLetter = askAudienceArray[Math.floor(Math.random() * askAudienceArray.length)]

     // get the index of this value from the word Array so you can avoid it

    let avoidIndex = [gameWordArray.indexOf(askAudienceLetter)];

    let indexArray = [0, 1, 2, 3, 4];
    let indexChoices = []

    indexArray.forEach((index) => {
        if (avoidIndex.includes(index) || alreadyRevealedIndex.includes(index)) {

        } else {
            indexChoices.push(index);
        }
    })

    //  indexArray.splice(avoidIndex, 1);
    //  if (alreadyRevealedIndex[0] >= 0) {
    //     indexArray.splice(alreadyRevealedIndex[0], 1);
    //  }
    
     let indexChoice = indexChoices[Math.floor(Math.random() * indexChoices.length)];
     if (indexChoice === 5) {
        indexChoice--
     }

     // then create an index which is not the avoid index or the already revealed index

     // target the row-reveal Div's with a querySelectorAll and use the index of the value from the word array to target a div and change it's textContent to the letter as well as it's background color to green
 
     revealBoxes[indexChoice].textContent = askAudienceLetter.toUpperCase();
     revealBoxes[indexChoice].style.backgroundColor = foundColor;
     
     // after this change the keyboardObject[letter].color to green as well
 
     keyboardObject[askAudienceLetter].state = 'found';
 
     // close Lifelines dialog window
     lifelinesDialog.close();
    
}

const phoneFriend = (button) => {
    button.disabled = true;
    phoneFriendIcon.style.color = 'black';

    // first create an array which takes the index of any revealDiv's that are already in use

    let alreadyRevealedIndex = [];

    revealBoxes.forEach((box, index) => {
        if (box.textContent !== '?') {
            alreadyRevealedIndex.push(index);
        }
    });

     // take the word Array and look through the keyboardObject for all of the letters that are lightgrey and push them into a new array
    let phoneFriendArray = [];

     gameWordArray.forEach((letter, index) => {
        if (index !== alreadyRevealedIndex[0] && (keyboardObject[letter].state === 'unfound' || keyboardObject[letter].state === 'found')) {
            phoneFriendArray.push(letter);
        }
    });

    // select a value from the array at random

    let phoneFriendLetter = phoneFriendArray[Math.floor(Math.random() * phoneFriendArray.length)]

    // get the index of this value from the word Array

    let index = gameWordArray.indexOf(phoneFriendLetter);

    // target the row-reveal Div's with a querySelectorAll and use the index of the value from the word array to target a div and change it's textContent to the letter as well as it's background color to green

    revealBoxes[index].textContent = phoneFriendLetter.toUpperCase();
    revealBoxes[index].style.backgroundColor = locatedColor;
    
    // after this change the keyboardObject[letter].color to green as well

    keyboardObject[phoneFriendLetter].state = 'located';

    // close Lifelines dialog window
    lifelinesDialog.close();

}

const newWord = (button) => {
    button.disabled = true;
    newWordIcon.style.color = 'black';

    nextRound();

    // close Lifelines dialog window
    lifelinesDialog.close();

}

const lifelineOptions = (e) => {
    if (e.target.type !== 'submit') {
        return;
    }

    if (e.target.id === "50-50") {
        fiftyfifty(e.target);
    }

    if (e.target.id === 'askAudience') {
        askAudience(e.target);
    }

     if (e.target.id === 'phoneFriend') {
        phoneFriend(e.target);
    }

     if (e.target.id === 'newWord') {
        newWord(e.target);
    }

     if (e.target.id === 'cancelLifeline') {
        lifelinesDialog.close();
    }
}

// ****** EVENT LISTENERS ******
document.addEventListener('keyup', keyboardInput)
nextRoundButton.addEventListener('click', () => {
    roundWinDialog.close();
    nextRound();
})
newGameWinButton.addEventListener('click', () => {
    gameWinDialog.close();
    newGame();
})
newGameLoseButton.addEventListener('click', () => {
    gameLoseDialog.close();
    newGame();
})

lifelinesButton.addEventListener('click', openLifeline);
lifelinesDialog.addEventListener('click', lifelineOptions);


newGame()