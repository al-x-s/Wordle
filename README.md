# MILLIONORDLE

Millionordle is more than just a mouthful. It's a game that aims to combine the lightning in a bottle that is *"Wordle"* with some of the gameplay elements from everybody's favourite "get-rich-quick" TV game-show *"Millionaire"*.

Through 5 rounds players will demonstrate that they have what it takes to take home the $1,000,000,000 prize.

## How To Play

Like *Wordle* players will need to guess a randomly generated 5 letter word.

If the players guess contains none of the letters of the randomly generated word each letter they submitted will be in a black box (or dark grey box on the keyboard).

If the player correctly guesses a letter that is in the randomly generated word but it is not in the correct location (ie 1st, 2nd, 3rd, 4th or 5th letter) the letter will appear in a yellow box.

If the player correctly guesses a letter that is in the randomly generated word and is in the correct location (ie 1st, 2nd, 3rd, 4th or 5th letter) the letter will appear in a green box.

Players must correctly guess the word in 5 turns otherwise they will lose the game.

If they succeed in guessing the word they will move to the next round and will need to win 5 rounds to complete the game.

### Lifelines

Players will have access to 4 lifelines which they can only use once per game. The Lifelines are as follows:

#### Ask The Audience

This lifeline will display one of the green letters of the randomly generated word in the reveal boxes (boxes with the '?''s in them) at the top of the screen. This letter will be in the correct location.

#### Phone A Friend

This lifeline will display a yellow letter from the randomly generated word in the reveal boxes (boxes with the '?''s in them) at the top of the screen. This letter will not be in the correct location.

#### New Word

This lifeline will give you an opportunity to start again with a new word but be warned, any lifelines used will not be restored and any green or yellow yellows will also be reset.

#### 50/50

This lifeline will remove 50% of the letters from the keyboard that have not yet been used.

# Notes on building this project

## The Code

There were some things that I found surprisingly easy in this project. Getting the layout and the initial functionality of the project to work came together in a day, even the lifelines weren't too tricky.

The Ask The Audience and Phone A Friend lifelines were definitely the trickiest to code. Not so much when they were utilised once in a round but when both were utilised in the same round I had to ensure they wouldn't "overwrite" each other. I achieved this by storing any already revealed values in an array with the following code:

    let  alreadyRevealedIndex  = [];
    
    revealBoxes.forEach((box, index) => {
    
	    if (box.textContent  !==  '?') {
    
		    alreadyRevealedIndex.push(index);
    
	    }
    
    });

There's still some problems when players utilise them when all the letters have been found but the only alternative would be to deactivate them in this circumstance and I'd rather give players the option use lifelines unwisely...makes it more fun!

Another lesson I learned from this project is the importance of having clearly defined objects that can easily adapt as your project progresses. In the data.mjs file there's an object called keyboardObject which is used to record when the state of a keyboard letter changes with one of four possible states:

1. Unfound (not yet used by the player)
2. Found (used, returned as a yellow letter)
3. Located (used, returned as a green letter)
4. Discarded (used, but not a letter in the word)

I had initially set the "states" as colours with "lightgrey", "yellow", "green" and "grey". This led to a lot of headaches when styling, particularly when I was experimenting with different colour palettes. It was something that I intuited could be a problem when I was first writing it but I persisted anyway. Lesson learned.

## The CSS

From the outset I had decided I wanted to use a colour palette that was reminiscent of *Who Wants To Be a Millionaire*. As it turned out working with deep purple wasn't the easiest choice! Particularly as I decided to keep the greens and yellows from Wordle to make it as playable as possible. In the end I found a palette of colours that work even if it does feel a little in your face at times!

Another thing that I found quite challenging was getting the on screen keyboard to look and feel good on a mobile phone. I had initiated flex on each keyboard row but the buttons were displaying as different sizes on small screens meaning the letter "i" was paper thin and all of the letters on the bottom row were uncomfortably skinny. I used padding to give the letters more width but it created other problems. In the end I just set a max-width and min-width to each key (except enter and backspace) and used a media query to change those widths depending on the screen size. I'm not sure if it was the best way to solve this problem but it works.

# Things I'd like to Improve

- A greater payoff after winning the game. As fantastic as the confetti is perhaps some sound FX and even an appearance from Eddie McGuire would bring some class to the end.


## Possible Future Features
- A total that tally's the money you've won and an ability to spend it on in game features such as new lifelines
- A hard mode which only gives you 4 guesses per round
- Integration with social media:
	- sharing top-scores or difficult words
	- lifelines that connect you to friends on your social network who can help answer words for you