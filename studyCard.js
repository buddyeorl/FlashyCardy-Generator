var inquirer = require("inquirer");
var fs = require('fs');
var BasicCard = require("./BasicCard.js");
var ClozeCard = require("./ClozeCard.js");
var cardBasic=[];
var cardCloze=[];
var subject = "";
var countBasic = 0;
var countCloze = 0;
var countStudy = 0;
var countStudyAdv = 0;

function mainMenu()
{
  inquirer.prompt([
  {
    type: 'list',
    name: "continue",
    message: "What do you want to do???",
    choices: ['add a new FlashCard', 'add a new Cloze Deletion Card']
  }
  ]).then(function(answers)
  {
    if (answers.continue === 'add a new FlashCard' || answers.continue === 'add a new Cloze Deletion Card')
    {
      promptSubject(answers.continue);
    }
  });
}

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


function createCards()
{
  console.log("current subject is: " + subject);
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
    // initializes the variable newguy to be a programmer object which will
    // take in all of the user's answers to the questions above
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

function createClozeCards()
{
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

    if (newCard.cardIsValid() === true)
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
      delete newCard;
      addNewCard('cloze');
    }
  });
}


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
      console.log('continue');
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
        studyAdvance();
      } else
      {
        studyBasic();
      }
    }
  });
}

function saveFlashCard()
{
 fs.appendFile('basicCards.txt', "\n" + subject +"=" + JSON.stringify(cardBasic) + "; \nmodule.exports = " + subject +";", (err) => {
  if (err) throw err;
  console.log("Flashcards saved to basicCards.txt");
  var readingtest = require("./basicCards.txt"); 
  console.log(readingtest[0].front);
 });  
}

function studyBasic()
{
saveFlashCard();
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
  countStudy = 0; 
  }

}

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
  countStudyAdv = 0; 
  }

}


mainMenu();
//createClozeCards();
//createCards();
