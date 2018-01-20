# FlashyCardy-Generator
Flashy Cardy !!!! Yay!!!!

# To run this code you will need to install the following dependencies:

For the menu creator:
npm install inquirer

to update the database that I used to upload the flash cards to:
npm install firebase

to update/write both basicCards.txt and clozeCards.txt files with the new flashcards input by the user to be retrieve later as a menu:
npm intall fs

# after you installed all the dependecies you can test the code two ways:

1.Open terminal (or command) and write: node studyCard.js


2.Open the the flashy Cardy site (https://buddyeorl.github.io/FlashyCardy-Generator/) to test the preloaded firebase Database flash cards (I'll add more (or try to add more) before the assignment due day.... that is tomorrow....) 

# later I will update this readme with pictures and better explanations...
# Below are the assignment instructions I followed, I just added a little twist to the code to make it a little bit interesting, and implemented a firebase Database to be able to show the interaction between node and the browser.



Advanced JavaScript Assignment: Cloze Constructors


Overview

In this week's assignment, you will create the backend for a basic flashcard application.

The backend will essentially constitute an API that allows users to create two types of flashcards.


Basic flashcards, which have a front ("Who was the first president of the United States?"), and a back ("George Washington").
Cloze-Deleted flashcards, which present partial text ("... was the first president of the United States."), and the full text when the user requests it ("George Washington was the first president of the United States.")



Cloze Deletions

A cloze deletion is simply a sentence that has had some of its text removed. For example, given the sentence:

"George Washington was the first president of the United States."

...We can create a "cloze deletion" by removing the words "George Washington":

"... was the first president of the United States."

This is useful for building flash card applications that forces users to remember the important part of a sentence, and is a common device in educational applications.

A flash card built this way has three parts:


The full text. This is the entire sentence users need to remember:  "George Washington was the first president of the United States."
The cloze deletion. This is the text we've chosen to remove: "George Washington".
The partial text. This is what we get if we remove the cloze deletion from the full text: "... was the first president of the United States.


See below for examples as to how your constructor should behave.


Instructions


Create a new GitHub repository, named Flashcard-Generator or something similar. Clone this to your local drive.

Create a new file named BasicCard.js:


This file should define a Node module that exports a constructor for creating basic flashcards, e.g.:
module.exports = BasicCard;

The constructor should accept two arguments: front and back.
The constructed object should have a front property that contains the text on the front of the card.
The constructed object should have a back property that contains the text on the back of the card.



Create a new file named ClozeCard.js:


This file should define a Node module that exports a constructor for creating cloze-deletion flashcards, e.g.:
module.exports = ClozeCard;

The constructor should accept two arguments: text and cloze.
The constructed object should have a cloze property that contains only the cloze-deleted portion of the text.
The constructed object should have a partial property that contains only the partial text.
The constructed object should have a fullText property that contains only the full text.
The constructor should throw or log an error when the cloze deletion does not appear in the input text.
Use prototypes to attach these methods, wherever possible.




The bulk of this assignment is implementing ClozeCard. If you build a robust ClozeCard implementation, feel free to try your hand at implementing a front-end, as well.


Examples

Your constructors should work as follows.

var firstPresident = new BasicCard(
    "Who was the first president of the United States?", "George Washington");

// "Who was the first president of the United States?"
console.log(firstPresident.front); 

// "George Washington"
console.log(firstPresident.back); 

var firstPresidentCloze = new ClozeCard(
    "George Washington was the first president of the United States.", "George Washington");

// "George Washington"
console.log(firstPresidentCloze.cloze); 

// " ... was the first president of the United States.
console.log(firstPresidentCloze.partial); "

// "George Washington was the first president of the United States.
console.log(firstPresidentCloze.fullText): "

// Should throw or log an error because "oops" doesn't appear in "This doesn't work"
var brokenCloze = new ClozeCard("This doesn't work", "oops");

Bonuses



Write your constructors such that users can call them with or without the new keyword. 


Look up scope-safe constructors, and try to implement them. It takes only two additional lines of code.
