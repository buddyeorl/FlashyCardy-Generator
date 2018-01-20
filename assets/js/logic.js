var counterForButtons = 0;
var kindOfCard = "";
var buttonId = 0;
var thisCard = 0;
var card;
// Initialize Firebase
var config = {
	apiKey: "AIzaSyANBJGBO-NgKF7aIvNoWX0SMHMVcBreDgw",
	authDomain: "flashycardy-44bbd.firebaseapp.com",
	databaseURL: "https://flashycardy-44bbd.firebaseio.com",
	projectId: "flashycardy-44bbd",
	storageBucket: "flashycardy-44bbd.appspot.com",
	messagingSenderId: "211800068703"
};
firebase.initializeApp(config);

var database = firebase.database();

database.ref().on("value", function(snapshot) {
clozeCards = snapshot.val().studyMaterial.clozeCards;
flashCards = snapshot.val().studyMaterial.flashCards;
console.log(clozeCards);
console.log(flashCards);
console.log(Object.keys(clozeCards)[1]);
console.log(Object.keys(flashCards).length);
});


$("#show").hide();
$("#next").hide();
$("#mainDisplay").hide();

$("#flashCards").on('click', function(){
	counterForButtons = 0;
	$("#subjects").html('');
	for (var i = 0; i < Object.keys(flashCards).length;i++)
	{
		$("#subjects").append('<button id="'+i+'" type="button" class="list-group-item list-group-item-success list-group-item-action-">'+Object.keys(flashCards)[i] +'</button>')
		counterForButtons = i;
	}
	kindOfCard = "flash";
});

$("#clozeCards").on('click', function(){
	counterForButtons = 0;
	$("#subjects").html('');
	for (var i = 0; i < Object.keys(clozeCards).length;i++)
	{
		$("#subjects").append('<button id="'+i+'" type="button" class="list-group-item list-group-item-primary list-group-item-action-">'+Object.keys(clozeCards)[i] +'</button>')
		counterForButtons = i;
	}
	kindOfCard = "cloze";
});


$("#subjects").on('click','button', function(){
	buttonId = parseInt($(this).attr("id"));
	if (kindOfCard === 'cloze')
	{	
		counterShow = 0;
		thisCard = Object.values(clozeCards)[buttonId].length - 1;
		card=clozeCards;
		showFront(card, buttonId, counterShow);
		console.log(Object.values(clozeCards)[buttonId]);
	} else
	{	counterShow = 0;
		thisCard = Object.values(flashCards)[buttonId].length - 1;
		card=flashCards;
		showFront(card,buttonId, counterShow);
		console.log(Object.values(flashCards)[buttonId]);
	}
});


$("#show").on('click', function(){
	showBack(card,buttonId,counterShow);
});
$("#next").on('click', function(){
	console.log(thisCard);
	if (counterShow < thisCard)
	{
	console.log('clicking');
	counterShow++;
	showFront(card,buttonId,counterShow);
	} else
	{
		$("#show").hide();
		$("#next").hide();
		$("#back").hide();
		$("#front").hide();
		$("#mainDisplay").hide();
	}
});
function showBack(card, buttonId, question)
{
	$("#front").hide();
	$("#back").show();
	if (kindOfCard === 'cloze')
	{
		$("#back").html('<h1 class="text-uppercase display-4">' +JSON.stringify(Object.values(card)[buttonId][question].fullText)+'</h1>');		
	} else
	{
		$("#back").html('<h1 class="text-uppercase display-4">' +JSON.stringify(Object.values(card)[buttonId][question].back)+'</h1>');		
	}
}

function showFront(card, buttonId, question)
{
	$("#mainDisplay").show();
	$("#show").show();
	$("#next").show();
	$("#back").hide();
	$("#front").show();
	if (kindOfCard === 'cloze')
	{
		$("#front").html('<h1 class="text-uppercase display-4">'+(counterShow +1) +": "+JSON.stringify(Object.values(card)[buttonId][question].partial)+'</h1>');
	} else
	{
		$("#front").html('<h1 class="text-uppercase display-4">'+(counterShow +1) +": "+JSON.stringify(Object.values(card)[buttonId][question].front)+'</h1>');		
	}	
}

