
# MILLIONORDLE

  

Millionordle is more than just a mouthful. It's a game that aims to combine the lightning in a bottle that is *"Wordle"* with some of the gameplay elements from everybody's favourite "get-rich-quick" TV game-show *"Millionaire"*.

  

Through 5 rounds players will demonstrate that they have what it takes to win the $1,000,000,000 prize!

  

# How To Play

  

Like *Wordle* players will need to guess a randomly generated 5 letter word (the answer).

  

If the players guess contains none of the letters from the answer each letter they submitted will be in a black box (or dark grey box on the keyboard).

  

If the player correctly guesses a letter that is in the answer but it is not in the correct location (ie 1st, 2nd, 3rd, 4th or 5th letter) the letter will appear in a yellow box.

  

If the player correctly guesses a letter that is in the answer and is in the correct location (ie 1st, 2nd, 3rd, 4th or 5th letter) the letter will appear in a green box.

  

Players must correctly guess the word in 5 turns otherwise they will lose the game.

  

If they succeed in guessing the word they will move to the next round and will need to win 5 rounds to complete the game.

  

## Lifelines

  

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

Building this project had two fundamental challenges for me:

1. Working with words that contained multiple instances of the same letter
2. Ensuring users has a pleasant experience using the app on their mobiles

Here's how approached both issues:

## Working with words that contained multiple instances of the same letter

Initially the code I had written iterated over each letter of the players guess to check for matches against the round answer and coloured both the game board letters as well as the on screen keyboard letters accordingly.

This worked well in most cases except for when the round answer, or the players guess contained multiple instances of the same letter.

I realised I wasn't going to be able to iterate over these letters as the code would need to make decisions about prioritising letters in the the players guess that were in the correct position over letters that were in the word but not in the correct position.

To solve this I had to create an object which would not only capture the letters in both the players guess and the round answer but also the number of times those letters appeared and what the index was for each letter. For example if the player guessed the word "emcee" this is what the object would look like:

    guessWordObject = {
    	c: {
	    	count: 1,
	    	index: [2]
	    },
	    e: {
		    count: 3,
		    index: [0, 3, 4]
	    },
	    m: {
		    count: 1,
		    index: [1]
	    }
	} 

 With this I could make more effective comparisons between the guess word and the round answer. For example if a player had guessed the word "rebel" and the answer was "pulse" I could ensure only one "e" from "rebel" would be coloured yellow. If the guessed the word "emcee" and the answer was "steel" I could target the 2nd last "e" in "emcee" to colour it green, then colour one of the remaining e's yellow and the other black.

## Ensuring users has a pleasant experience using the app on their mobiles

A big lesson that I learned from doing this project is that mobile phones are very particular about what fonts they display. I spent a lot of time trying to get my on screen keyboard to display properly when the real problem was that my iPhone did not want to display the font I had chosen for the keyboard. (I'm sure something valuable will come from all the articles on read on Flexbox whilst troubleshooting!).

Even once I had the keyboard sized correctly I still had issues when double tapping letters or the backspace key and the screen would zoom in. Thankfully using the "touch: manipulation" css property removed these issues.


## Styling Millionordle


From the outset I had decided I wanted to use a colour palette that was reminiscent of *Who Wants To Be a Millionaire*. As it turned out working with deep purple wasn't the easiest choice! Particularly as I decided to keep the greens and yellows from Wordle to make it as familiar as possible. In the end I found a palette of colours that work even if it does feel a little in your face at times!

Another valuable lesson that I learned in building this project is that you shouldn't use colours as variable names! My keyboardObject initially had "colours" instead of "states" which led to a lot of confusion when I began experimenting with the colour palette on the page.


# Things I'd Like To Improve

  

- A greater payoff after winning the game. As fantastic as the confetti is perhaps some sound FX and even an appearance from Eddie McGuire would bring some class to the end.
- I feel I could improve how the Ask The Audience and Phone A Friend lifelines work when used in the same round or when all the letters of the word have already been revealed. Players can still choose to use the Ask The Audience button if all 5 letters of a word are revealed. At this point I feel that that is more user error than a bug, but perhaps a "are you sure you want to proceed?" dialog could be triggered when all 5 letters are in play.

  
  

# Possible Future Features

- A total that tally's the money you've won and an ability to spend it on in game features such as new lifelines

- A hard mode which only gives you 4 guesses per round

- Integration with social media so players can share top-scores or difficult words

- Lifelines that connect you to friends on your social network who can help answer words for you