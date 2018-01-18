// dependecies //
var inquirer = require("inquirer");
var fs = require('fs');

// local dependecies //
var BasicCard = require("./BasicCard.js");
var ClozeCard = require("./ClozeCard.js");
var savedBasic = require("./basicCards.txt"); 
var savedCloze = require("./clozeCards.txt"); 

// variables //
var cardBasic=[];
var cardCloze=[];
var savedFlashCards=[];
var subject = "";
var countBasic = 0;
var countCloze = 0;
var countStudy = 0;
var countStudyAdv = 0;


// ============================ FUNCTIONS ==========================//

// ============================MAIN MENU STARTS HERE ==========================//
function mainMenu()
{
  inquirer.prompt([
  {
    type: 'list',
    name: "continue",
    message: "What do you want to do???",
    choices: ['add a new FlashCard', 'add a new Cloze Deletion Card', 'Review saved FlashCards by subject??','Review saved Cloze deletion Cards by subject??']
  }
  ]).then(function(answers)
  {
    if (answers.continue === 'add a new FlashCard' || answers.continue === 'add a new Cloze Deletion Card')
    {
      promptSubject(answers.continue);
    } else if (answers.continue === 'Review saved FlashCards by subject??') // READ CONTENT IN basicCards.txt and create a menu with the object values
    {
      for (var i =0; i< Object.keys(subjects).length; i++)
      {
        savedFlashCards.push(Object.keys(subjects[i])[0]); // savedFlashCards holds all the object name inside the basicCards.txt file to display as menu
      }
      inquirer.prompt([
      {
        type: 'list',
        name: "choiceSavedCard",
        message: "Choose the subject you want to review",
        choices: savedFlashCards
      }]).then(function(answers) 
      {
        for (var i =0; i < savedFlashCards.length;i++)
        {
          if (savedFlashCards[i] === answers.choiceSavedCard)
          {
            //console.log(Object.values(subjects[i])[0]);
            cardBasic = Object.values(subjects[i])[0]; 
            studyBasic(); // review the selected subject
          }
        }
      });
    } else  // READ CONTENT IN clozeCards.txt and create a menu with the object values
    {
      for (var i =0; i< Object.keys(subjectsCloze).length; i++)
      {
        savedFlashCards.push(Object.keys(subjectsCloze[i])[0]); // savedFlashCards holds all the object name inside the clozeCards.txt file to display as menu
      }
      inquirer.prompt([
      {
        type: 'list',
        name: "choiceSavedCard",
        message: "Choose the subject you want to review",
        choices: savedFlashCards
      }]).then(function(answers)
      {
        for (var i =0; i < savedFlashCards.length;i++)
        {
          if (savedFlashCards[i] === answers.choiceSavedCard)
          {
            //console.log(Object.values(subjectsCloze[i])[0]);
            cardCloze = Object.values(subjectsCloze[i])[0];
            studyAdvance(); // review the selected subject
          }
        }
      });
    }
  });
}

// ============================ Function to create a topic/subject, the topic will become the object name for the flash cards ==========================//
function promptSubject(action)
{
  inquirer.prompt([
  {
    name: "subject",
    message: "How do you want to name this group of FlashCards??",
  }]).then(function(answers)
  {
    subject = answers.subject;
    if (action === 'add a new FlashCard')
    {
      createCards();
    } else
    {
      createClozeCards();
    }
  }); 
}

// ============================CREATE BASIC FLASH CARDS ==========================//

function createCards()
{
  console.log("current subject is: " + subject); //display current subject
  console.log("Please complete the following information :");
  inquirer.prompt([
    {
      name: "front",
      message: "Flashcard " + (countBasic + 1) +" Front:"
    }, {
      name: "back",
      message: "Flashcard " + (countBasic + 1) + " Back:"
    }
  ]).then(function(answers) 
  {

    var newCard = new BasicCard(
    answers.front,
    answers.back);
    cardBasic.push(newCard);
    for (var i=0; i<cardBasic.length;i++)
    {
      console.log("Card " + (i+1) +" Front: " +cardBasic[i].front);
      console.log("Card " + (i+1) +" Back: " +cardBasic[i].back);
    }
    countBasic++;
    addNewCard('basic');
  });
}


// ============================ CREATE CLOZE CARDS ==========================//

function createClozeCards()
{
  console.log("current subject is: " + subject); //display current subject
  console.log("Please complete the following information :");
  inquirer.prompt([
    {
      name: "full",
      message: "Flashcard " + (countCloze + 1) +" Full text:"
    }, {
      name: "cloze",
      message: "Flashcard " + (countCloze + 1) + " cloze:"
    }
  ]).then(function(answers) 
  {
    // initializes the variable newguy to be a programmer object which will
    // take in all of the user's answers to the questions above
    var newCard = new ClozeCard(
    answers.full,
    answers.cloze);
 
    if (newCard.cardIsValid() === true) // IF newCard.cardisValid() returns false, the object created will be deleted.
    {
      cardCloze.push(newCard);
      for (var i=0; i<cardCloze.length;i++)
      {
        console.log("Card " + (i+1) +" Full text: " +cardCloze[i].fullText);
        console.log("Card " + (i+1) +" cloze:" +cardCloze[i].cloze);
      }
      countCloze++;
      addNewCard('cloze');
    } else
    {
      delete newCard; // deleted invalid cloze card.
      addNewCard('cloze');
    }
  });
}

// ============================ MENU TO ASK USER TO ADD NEW FLASH CARD OR REVIEW THE FLASHCARDS ==========================//
function addNewCard(kindOfCard)
{
  inquirer.prompt([
  {
    type: 'list',
    name: "continue",
    message: "Do you want to add a new FlashCard?",
    choices: ['add a new FlashCard', 'I want to review my flashCards']
  }
  ]).then(function(answers)
  {
    if (answers.continue === 'add a new FlashCard')
    {
      if (kindOfCard === 'cloze')
      {
        createClozeCards();
      } else
      {
        createCards();
      }
    } else
    {
      if (kindOfCard === 'cloze')
      {
        saveFlashCard('clozeCards.txt', cardCloze); //save cloze card into local file
        studyAdvance(); //review current card
      } else
      {
        saveFlashCard('basicCards.txt', cardBasic); //save flashcard into local file
        studyBasic(); // review current card
      }
    }
  });
}

// ============================ FUNCTION WILL SAVE THE CURRENT FLASH CARD INTO A LOCAL TXT FILE ==========================//
function saveFlashCard(file, cards)
{
 fs.appendFile(file, "\n\n" + subject +"=" + JSON.stringify(cards) + "; \nsubjectsCloze.push({'" + subject +"':" + subject +"}); \nmodule.exports = " + subject +";", (err) => {
  if (err) throw err;
  console.log("Flashcards saved to " + file);
 });  
}

// ============================ FUNCTION TO REVIEW THE BASIC FLASHCARDS ==========================//
function studyBasic()
{
  if (countStudy < cardBasic.length)
  {
    inquirer.prompt([
    {
      name: "guess",
      message: "Question " + (countStudy + 1) +" : " + cardBasic[countStudy].front
    }]).then(function(answers)
    {
      if (answers.guess === cardBasic[countStudy].back)
      {
        console.log("Perfect Answer, have you been studying???");
      } else
      {
        console.log("wrong!!!! the correct answer was: " + cardBasic[countStudy].back);
      }
      countStudy++;
      studyBasic();
    });
  } else
  {
  readingtest = require("./basicCards.txt");
  savedFlashCards=[];
  cardBasic=[];
  countStudy = 0; 
  mainMenu();
  }

}

// ============================ FUNCTION TO REVIEW THE CLOZE DELETION CARDS==========================//
function studyAdvance()
{
  
  if (countStudyAdv < cardCloze.length)
  {
    inquirer.prompt([
    {
      name: "guess",
      message: "Question " + (countStudyAdv+ 1) +" : " + cardCloze[countStudyAdv].partial
    }]).then(function(answers)
    {
      if (answers.guess === cardCloze[countStudyAdv].cloze)
      {
        console.log("Perfect Answer, have you been studying???");
      } else
      {
        console.log("wrong!!!! the correct answer was: " + cardCloze[countStudyAdv].cloze);
      }
      countStudyAdv++;
      studyAdvance();
    });
  } else
  {
  readingtest = require("./basicCards.txt");
  savedFlashCards=[]; //reset variable
  cardCloze=[]; //reset variable
  countStudyAdv = 0;  //reset counter
  mainMenu(); //go back to mainMenu
  }

}

// ============================MAIN APP STARTS HERE ==========================//


mainMenu();

