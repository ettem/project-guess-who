// All the DOM selectors stored as short variables
const board = document.getElementById('board')
const questions = document.getElementById('questions')
const restartButton = document.getElementById('restart')
const findOutButton = document.getElementById('filter')
const winOrLose = document.getElementById('winOrLose')
const playAgain = document.getElementById('playAgain')

// Array with all the characters, as objects
const CHARACTERS = [
  {
    name: 'Jabala',
    img: 'images/jabala.svg',
    hairColor: 'hidden',
    eyeColor: 'hidden',
    glasses: true,
    hat: true,
    smoker: false,
  },
  {
    name: 'Jack',
    img: 'images/jack.svg',
    hairColor: 'hidden',
    eyeColor: 'blue',
    glasses: false,
    hat: true,
    smoker: false,
  },
  {
    name: 'Jacques',
    img: 'images/jacques.svg',
    hairColor: 'grey',
    eyeColor: 'blue',
    glasses: false,
    hat: true,
    smoker: true,
  },
  {
    name: 'Jai',
    img: 'images/jai.svg',
    hairColor: 'black',
    eyeColor: 'brown',
    glasses: false,
    hat: false,
    smoker: false,
  },
  {
    name: 'Jake',
    img: 'images/jake.svg',
    hairColor: 'yellow',
    eyeColor: 'green',
    glasses: true,
    hat: false,
    smoker: false,
  },
  {
    name: 'James',
    img: 'images/james.svg',
    hairColor: 'brown',
    eyeColor: 'green',
    glasses: true,
    hat: false,
    smoker: false,
  },
  {
    name: 'Jana',
    img: 'images/jana.svg',
    hairColor: 'black',
    eyeColor: 'hidden',
    glasses: true,
    hat: false,
    smoker: false,
  },
  {
    name: 'Jane',
    img: 'images/jane.svg',
    hairColor: 'yellow',
    eyeColor: 'hidden',
    glasses: true,
    hat: false,
    smoker: false,
  },
  {
    name: 'Jaqueline',
    img: 'images/jaqueline.svg',
    hairColor: 'orange',
    eyeColor: 'green',
    glasses: true,
    hat: false,
    smoker: false,
  },

  {
    name: 'Jazebelle',
    img: 'images/jazebelle.svg',
    hairColor: 'purple',
    eyeColor: 'hidden',
    glasses: true,
    hat: false,
    smoker: true,
  },
  {
    name: 'Jean',
    img: 'images/jean.svg',
    hairColor: 'brown',
    eyeColor: 'blue',
    glasses: true,
    hat: true,
    smoker: true,
  },
  {
    name: 'Jeane',
    img: 'images/jeane.svg',
    hairColor: 'brown',
    eyeColor: 'green',
    glasses: true,
    hat: false,
    smoker: false,
  },
  {
    name: 'Jed',
    img: 'images/jed.svg',
    hairColor: 'orange',
    eyeColor: 'green',
    glasses: true,
    hat: true,
    smoker: true,
  },
  {
    name: 'Jenni',
    img: 'images/jenni.svg',
    hairColor: 'white',
    eyeColor: 'hidden',
    glasses: false,
    hat: true,
    smoker: false,
  },
  {
    name: 'Jeri',
    img: 'images/jeri.svg',
    hairColor: 'orange',
    eyeColor: 'green',
    glasses: true,
    hat: false,
    smoker: false,
  },
  {
    name: 'Jerry',
    img: 'images/jerry.svg',
    hairColor: 'hidden',
    eyeColor: 'blue',
    glasses: false,
    hat: true,
    smoker: false,
  },
  {
    name: 'Jess',
    img: 'images/jess.svg',
    hairColor: 'black',
    eyeColor: 'blue',
    glasses: true,
    hat: false,
    smoker: false,
  },
  {
    name: 'Jocelyn',
    img: 'images/jocelyn.svg',
    hairColor: 'black',
    eyeColor: 'brown',
    glasses: true,
    hat: false,
    smoker: false,
  },
  {
    name: 'Jon',
    img: 'images/jon.svg',
    hairColor: 'brown',
    eyeColor: 'green',
    glasses: true,
    hat: false,
    smoker: false,
  },
  {
    name: 'Jordan',
    img: 'images/jordan.svg',
    hairColor: 'yellow',
    eyeColor: 'hidden',
    glasses: true,
    hat: true,
    smoker: false,
  },
  {
    name: 'Josephine',
    img: 'images/josephine.svg',
    hairColor: 'grey',
    eyeColor: 'brown',
    glasses: false,
    hat: false,
    smoker: false,
  },
  {
    name: 'Josh',
    img: 'images/josh.svg',
    hairColor: 'yellow',
    eyeColor: 'green',
    glasses: false,
    hat: false,
    smoker: false,
  },
  {
    name: 'Jude',
    img: 'images/jude.svg',
    hairColor: 'black',
    eyeColor: 'green',
    glasses: false,
    hat: false,
    smoker: false,
  },
  {
    name: 'Julie',
    img: 'images/julie.svg',
    hairColor: 'black',
    eyeColor: 'brown',
    glasses: true,
    hat: true,
    smoker: false,
  },
]

// Global variables
let secret, currentQuestion, charactersInPlay

// Draw the game board
const generateBoard = () => {
  board.innerHTML = ''
  charactersInPlay.forEach((person) => {
    board.innerHTML += `
      <div class="card">
        <p>${person.name}</p>
        <img src=${person.img} alt=${person.name}>
        <div class="guess">
          <span>Guess on ${person.name}?</span>
          <button class="filled-button small" onclick="guess('${person.name}')">Guess</button>
        </div>
      </div>
    `
  })
}

// Randomly select a person from the characters array and set as the value of the variable called secret
const setSecret = () => {
  let randomElement = Math.random() * charactersInPlay.length //note to self! for a randomised number rounded off to length of array (will be a decimal (float) and therefore math.floor after)
  let randomElementInt = Math.floor(randomElement); 
  secret = charactersInPlay[randomElementInt]; //note to self! here we assign secret person by picking out the randomised number (aka person) from the array
  //secret = charactersInPlay[Math.floor(Math.random() * charactersInPlay.length)]
  //note to self! straight brackets show that we are picking out a randomised element on the randomised position in our array
}

// This function to start (and restart) the game
const start = () => {
  // Here we're setting charactersInPlay array to be all the characters to start with
  charactersInPlay = CHARACTERS;
  generateBoard();
  // What else should happen when we start the game? 
  setSecret();
}

// setting the currentQuestion object when you select something in the dropdown
const selectQuestion = () => {
  const category = questions.options[questions.selectedIndex].parentNode.label;
  // This variable stores what option group (category) the question belongs to.
  // We also need a variable that stores the actual value of the question we've selected.
  const property = questions.options[questions.selectedIndex].label;

  if (category === 'hair color') {
    currentQuestion = {
      attribute: 'hairColor',
      value: property,
      // 👆 add the value from the input here
      category: category,
    }
  } else if (category === 'eye color') {
    currentQuestion = {
      attribute: 'eyeColor',
      value: property,
      // 👆 add the value from the input here
      category: category,
    // Set this up your self
    }
  } else if (category === 'accessories') {
    currentQuestion = {
      attribute: property,
      // 👆 this is the property of the booleans such as smoke, glasses and hat. add the value from the input here
      value: true, // we're asking if this person wears a hat for exaple, so always true in the question.
      category: category,
    }
  } else if (category === 'other') {
    currentQuestion = {
      attribute: property,
      value: true,
      // 👆 add the value from the input here
      category: category,
    // Set this up your self (should be same structure as above)
    }
  }
}

// This function should be invoked when you click on 'Find Out'.
const checkQuestion = () => {
  // Compare the currentQuestion with the secret person.
  // See if we should keep or remove people based on that
  let keepPerson;
  let checking = currentQuestion.attribute;
  if (secret[checking] === currentQuestion.value) { //note to self! secret[value] if value is a variable, secret.value if value is an object, in this case checking is a variable and not an object key
    keepPerson = true;
  } else {
    keepPerson = false;
  }
  console.log(keepPerson);
  // Then invoke filterCharacters
  filterCharacters(keepPerson);
}

// It'll filter the characters array and redraw the game board.
const filterCharacters = (keep) => {
  // Show the correct alert message for different categories
  if (currentQuestion.attribute === 'hairColor') {
    if (keep) {
      alert(
        `Yes, the person has ${currentQuestion.value} hair! Keep all that has ${currentQuestion.value} hair`
      )
    } else {
      alert(
        `No, the person doesn't have ${currentQuestion.value} hair! Remove all that has ${currentQuestion.value} hair`
      )
    } 
  } else if (currentQuestion.attribute === 'eyeColor') {
    if (keep) {
      alert(
        `Yes, the person has ${currentQuestion.value} eyes! Keep all that has ${currentQuestion.value} eyes`
      )
    } else {
      alert(
        `No, the person doesn't have ${currentQuestion.value} eyes! Remove all that has ${currentQuestion.value} eyes`
      )
    }
  } else if (currentQuestion.category === 'accessories') {
      if (keep) {
        alert(
          `Yes, the person has ${currentQuestion.attribute}! Keep all that has ${currentQuestion.attribute}`
        )
      } else {
        alert(
          `No, the person doesn't have ${currentQuestion.attribute}! Remove all that has ${currentQuestion.attribute}`
        )
      }
  } else if (currentQuestion.category === 'other') {
      if (keep) {
        alert(
          `Yes, the person is a ${currentQuestion.attribute}! Keep all that are a ${currentQuestion.attribute}`
        )
      } else {
        alert(
          `No, the person isn't a ${currentQuestion.attribute}! Remove all that are a ${currentQuestion.attribute}`
        )
      }
    }
        
  // filter to keep or remove based on the keep variable.
  if (keep) { 
    charactersInPlay = charactersInPlay.filter((person) => person[currentQuestion.attribute] === currentQuestion.value);
  } else { 
    charactersInPlay = charactersInPlay.filter((person) => person[currentQuestion.attribute] !== currentQuestion.value);
  }
  // Invoke a function to redraw the board with the remaining people.
  generateBoard();
}

// when clicking guess, the player first have to confirm that they want to make a guess.
const guess = (suspect) => {
  // store the interaction from the player in a variable.
  // remember the confirm() ?
  let choice = confirm(`Do you want to guess ${suspect}?`);
  if (choice) {
    // If the player wants to guess, invoke the checkMyGuess function.
    checkMyGuess(suspect);
  } 
}

// If you confirm, this function is invoked
const checkMyGuess = (suspect) => {
   if (suspect === secret.name) {
    alert(`You Win! The secret person was ${secret.name}`);
  }
  else {
    alert(`Game Over - the secret person was ${secret.name}`);
  }
  winOrLose.style.display = "block";
  // 1. Check if the suspect is the same as the secret person's name
  // 2. Set a Message to show in the win or lose section accordingly
  // 3. Show the win or lose section
  // 4. Hide the game board
}

//a function to hide the win or lose section when play again is chosen
const showAgainWinOrLose = () => {
  winOrLose.style.display = "none";
  start();
}

// Invokes the start function when website is loaded
start()

// All the event listeners
restartButton.addEventListener('click', start);
questions.addEventListener('change', selectQuestion);
findOutButton.addEventListener('click', checkQuestion);
playAgain.addEventListener('click', showAgainWinOrLose);