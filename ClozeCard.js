function ClozeCard(text, cloze){
  this.cloze = cloze;
  this.partial = text.replace(cloze, "    ......   ").trim();
  this.fullText = text;
  this.cardIsValid = function () 
  {
  	if (this.fullText.includes(this.cloze))
  	{
  		console.log("Flash Card Created succesfully");
  		return true;
  	} else
  	{
  		console.log("Oops, it seems " + this.cloze +  " it's not included in the answer, please try again");
 		return false;
  	}
  }
  this.printCard = function () 
  {
  	console.log("Full text : " + this.fullText);
  	console.log("Partial text : " + this.partial);
  	console.log("Cloze : " + this.cloze);
  }
}

module.exports = ClozeCard;