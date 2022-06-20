const WORDS = ["dream", "error", "space", "excel"];
let game;

class Lingo {
    board;
    word;

    letterIndex = 0;
    rowIndex = 0;
    guess = [];

    constructor() {
        this.board = document.getElementById("lingo");
        this.numberOfGuesses = this.board.getElementsByClassName('row').length;
        this.reset();
    }

    reset() {
        /*
            OPDRACHT 1
            
            Zorg ervoor dat this.word een random string uit de array WORDS krijgt
        */

        
        let wordIndex = Math.floor( Math.random() * WORDS.length );
        this.word = WORDS[wordIndex];

        /*
            OPDRACHT 2

            voor elk element in de variabele rows
                voor elk element met de class 'letter': row.getElementsByClassName('letter')
                    maak de innerHTML leeg.

            verander this.letterIndex naar 0
            verander this.rowIndex naar 0
        */
       let rows = this.board.getElementsByClassName('row');

       for(let rowIndex = 0; rowIndex < rows.length; rowIndex++) {
           let letters = rows[rowIndex].getElementsByClassName('letter');
            
           for(let letterIndex = 0; letterIndex < letters.length; letterIndex++) {
                letters[letterIndex].innerHTML = "";
                letters[letterIndex].style.backgroundColor = "";
            }

       }

       this.letterIndex = 0;
       this.rowIndex = 0;
    }

    done() {
        return this.rowIndex === this.numberOfGuesses;
    }

    addLetter(letter) {
        // Make all inputs lowercase
        letter = letter.toLowerCase();

        // If the last letter has been put in, don't add new letters
        if (this.letterIndex === 5) {
            return;
        }

        // Get the HTML element of the current row
        let row = this.board.getElementsByClassName("row")[this.rowIndex];
        // Get the HTML element of the current letter
        let box = row.children[this.letterIndex];

        box.innerHTML = letter;

        this.guess.push(letter);
        this.letterIndex++;
    }

    removeLetter() {
        if(this.letterIndex <= 0) {
            return;
        }

        // Get the HTML element of the current row
        let row = this.board.getElementsByClassName("row")[this.rowIndex];
        // Get the HTML element of the current letter
        let box = row.children[this.letterIndex - 1];

        /*
            OPDRACHT 3

            - Maak de innerHTML van de box leeg
            - Verwijder het laatste element van de array this.guess
                https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/pop
            - Verlaag this.letterIndex met 1
        */

        box.innerHTML = "";
        this.guess.pop();
        this.letterIndex -= 1;
    }

    checkWord() {
        // Get the HTML element of the current row
        let row = this.board.getElementsByClassName("row")[this.rowIndex];
        // Make an Array from the correct word String.
        let correctLetters = Array.from(this.word);

        // If the guessed word is not the correct length
        if (this.guess.length != 5) {
            alert("Not enough letters!");
            return;
        }

        // For every letter in the guess
        for (let index = 0; index < this.guess.length; index++) {
            let color;
            let box = row.children[index];
            let letter = this.guess[index];

            // Find the position of the letter
            let correctIndex = correctLetters.indexOf(letter);

            // If the letter is not in the word
            if (correctIndex < 0) {
                color = "grey";
                
            } else {
                // If the letter is in the correct position
                if (letter === this.word[index]) {
                    color = "green";
                    
                // If the letter is in the correct position
                } else {
                    color = "yellow";
                }

                // If the letter is found, remove it for the next letters
                correctLetters[index] = "#";
            }

            // Change the color of the letter box
            box.style.backgroundColor = color;
        }

        // Make a string from the guess Array
        let guessedWord = this.guess.join("");

        // If the word is completely guessed correct
        if (guessedWord === this.word) {
            alert("You guessed right! Game over!");
            this.rowIndex = this.numberOfGuesses;
            return;
            
        } else {
            this.rowIndex++;
            this.guess = [];
            this.letterIndex = 0;

            // If the game is over
            if (this.done()) {
                alert("You've run out of guesses! Game over!");
                alert(`The right word was: "${this.word}"`);
            }
        }

        /*
            OPDRACHT 4

            Als het spel klaar is HINT: this.done()
                - reset het spel
        */

        if(this.done()) {
            this.reset();
        }
    }

    handleKey(pressedKey) {
    
        /*
            OPDRACHT 5

            Herschrijf de onderstaande 3 if-statements naar een switch
        */

        switch(pressedKey) {
            case "Backspace":
                this.removeLetter();
                return;
                break;

            case "Escape":
                this.reset();
                return;
                break;

            case "Enter":
                this.checkWord();
                return;
                break;
        } 

        // If the game is done, don't handle keys
        if (this.done()) {
            return;
        }
    
        let isLetter = pressedKey.match(/[a-z]/gi);
        // If no letter is pressed, do nothing
        if (!isLetter || isLetter.length > 1) {
            return;
    
        // Else add the letter
        } else {
            this.addLetter(pressedKey);
        }
    }
}

function setup() {
    game = new Lingo();
    window.addEventListener("keyup", keyUp);
}

function keyUp(event) {
    let pressedKey = String(event.key);

    game.handleKey(pressedKey);
}

window.addEventListener("load", setup);
