;(function(window){
    var Game=function(div_root, gameMode){
        
        this.div_root=document.getElementById(div_root);
        this.gameMode=gameMode;
        
        
        this.info_div=document.createElement('div');
        this.info_div.setAttribute("id", "info_div");
        
        this.deck_div=document.createElement('div');
        this.deck_div.setAttribute("id","deck_div");
        this.gameDeck=new Deck(gameMode);
        this.gameDeck.buildThatDeck.call(this);
        
        var shuffleButton=document.createElement('button');
        shuffleButton.innerHTML="Shuffle";
        //"this" is the whole game
        shuffleButton.onclick=this.gameDeck.shuffle.bind(this);
        this.info_div.appendChild(shuffleButton);
        
        this.rules={
            discardRow:[
                {
                    name: 'leanred and remembered',
                    //droppable is an actual keyword in js
                    droppable: true,
                    maxcards:this.deck_div.children.length,
                    plies:1
                }
            ],
            gameComplete: function(e)
            {
                if(e.currentTarget.childNodes.length===this.discardRow[0].maxcards){
                    console.log("you win, mudda fukka!!");
                }
            }}
        //should this function really be in here?
        this.buildDiscard =function(){
            for (var i=this.rules.discardRow.length-1;i>=0;i--){
                var zone=document.createElement("div");
                zone.className="zone row";
                var discardRule=this.rules.discardRow[i];
                var c = 0;
                while(c<discardRule.plies){
                    var discardObj = new DiscardPile();
                    discardObj.name=discardRule.name;
                    discardObj.droppable=discardRule.droppable;
                    discardObj.id="pile-"+c;
                    var buildObj=discardObj.init();
                    zone.appendChild(buildObj);
                    c++;
                }
            }
            this.div_root.appendChild(zone);
        }
        
        
        this.div_root.appendChild(this.info_div);
        this.div_root.appendChild(this.deck_div);
        this.buildDiscard();
        
        
        
    };
    
    var Deck=function(gameOption){
        this.deckInfo=gameOption.gameMode;
        
        
        this.buildThatDeck=function(){
            //fragment allow to build element(div, img,...) off DOM 
            //and append it back to body once it is all collected. What is collected action here means?
            //each time modify the DOM, it create a redraw, so this allow to redraw less
            var parentFragment=document.createDocumentFragment();
            this.deck_div.innerHTML="";//empty out previous deck play if neccessary
            //the reason for this is because we will use i as a traverse int for deckInfo array
            for(var i=this.gameMode.gameMode.length-1; i>=0;i--){
                var eachCard=new Card();
                var cardId="card-"+i;
                eachCard.id=cardId;
                eachCard.data=this.gameDeck.deckInfo[i];
                eachCard.buildThatCard(parentFragment);
            }
            this.deck_div.appendChild(parentFragment);
            this.gameDeck.stack.call(this);
            
        };
    };
    //prototype allow other instance of a object to use. This means all Deck instances can use this shuffle
    Deck.prototype.shuffle=function(){
       //this is the whole game. Assign it to a new var for manipulation
       var cardsToShuffle=this.gameDeck.deckInfo;
       //declare 3 variable
       var current_index=cardsToShuffle.length, temp, new_index;
       //loop through all the lenght of the deck, so O(n) operation
        while(current_index){
           new_index=Math.floor(Math.random()*current_index--);
           //hold current index in a different place to change and reassign new index to old value
           temp=cardsToShuffle[current_index];
           cardsToShuffle[current_index]=cardsToShuffle[new_index];
           cardsToShuffle[new_index]=temp;
       }
       this.gameDeck.deckInfo=cardsToShuffle;
       //the reason we don't need to pass deck_div as argument/props is because 
       //bind help put this(which is Game and contain deck_div inside
       this.gameDeck.buildThatDeck.call(this);
    };
    
    Deck.prototype.stack=function(){
        var cards=this.deck_div.children;
        for(var i=cards.length-1; i>=0; i--){
            var ihigher=i+1*i;
            cards[i].style.top =ihigher+"px";
            cards[i].style.left =ihigher+"px";
            cards[i].classList.add("stacked_card");
        }
    };
    
    var Card=function(){
        this.id="";
        this.data="";
        this.cardContainer=document.createElement("div");
        this.cardContainer.className="card_container";
        this.cardFront=document.createElement("div");
        this.cardFront.className="card_front";
        this.cardBack=document.createElement("div");
        this.cardBack.className="card_back";
        
        this.buildThatCard=function(parentFragment){
            var flipDiv=document.createElement("div"),
                frontValueDiv=document.createElement("div"),
                backValueDiv=document.createElement("div"),
                categoryDiv=document.createElement("div");
            flipDiv.className="flip_value";
            frontValueDiv.className="front_value";
            backValueDiv.className="back_value";
            categoryDiv.className="category_value";
            
            //q from json file
            
            frontValueDiv.innerHTML=this.data.q;
            backValueDiv.innerHTML=this.data.a;
            categoryDiv.innerHTML=this.data.category;
            
            this.cardFront.appendChild(frontValueDiv);
            this.cardFront.appendChild(categoryDiv);
            this.cardBack.appendChild(backValueDiv);
            
            var learnMoreAboutTheHeartOfTheCard=document.createElement('a');
            learnMoreAboutTheHeartOfTheCard.text="learn more";
            learnMoreAboutTheHeartOfTheCard.href=this.data.link;
            learnMoreAboutTheHeartOfTheCard.target="_blank";
            
            var infoImage=document.createElement("img");
            infoImage.src="./images/info.svg";
            learnMoreAboutTheHeartOfTheCard.appendChild(infoImage);
            //stop propagation prevent card from flipping once click the link
            learnMoreAboutTheHeartOfTheCard.addEventListener("click", function(event){
                event.stopPropagation();
            });
            backValueDiv.appendChild(learnMoreAboutTheHeartOfTheCard);
            
            flipDiv.appendChild(this.cardFront);
            flipDiv.appendChild(this.cardBack);
            //id here is pass through the function, so this.id above doesn't affect here
            this.cardContainer.id=this.id;
            //small onclick, not big onClick
            this.cardContainer.onclick = cardClick;
            
            this.cardContainer.draggable=true;
            this.cardContainer.ondragstart = cardDrag;
            
            //if there is another cardClick2 function override the onclick method,
            //the counter can also be manipulate and override, which is not ideal
            //iffy function make it so that var live inside the iffy can't be access from outside 
            //since var only live within that functon
            
            
            this.cardContainer.appendChild(flipDiv);
            parentFragment.appendChild(this.cardContainer);
            
            
        }
        
    };
    
    function cardDrag(e){
        e.dataTransfer.setData("text/plain", e.currentTarget.id);
    }
    var DiscardPile=function(){
        this.name="";
        this.draggable;
        this.id="";
        this.init=function(){
            var holderContainer=document.createElement("div"),
            holderLabel=document.createElement("div"),
            holderTarget=document.createElement("div");
            holderTarget.ondragover=function(e){
                e.preventDefault()
            };
            holderTarget.ondrop=this.cardDrop;
            holderContainer.className="holder_container";
            holderLabel.className="holder_label";
            holderTarget.className="holder_target";
            holderLabel.innerText=this.name;
            
            holderContainer.appendChild(holderLabel);
            holderContainer.appendChild(holderTarget);
            return holderContainer;
        }
    }
        DiscardPile.prototype.cardDrop=function(e){
            var cardID=e.dataTransfer.getData("text/plain");
            var cardDragging=document.getElementById(cardID);
            cardDragging.style.top="0px";
            cardDragging.style.left="0px";
            e.currentTarget.appendChild(cardDragging);
        }
        //issue was that iffy function was not placed outside of Card function, which caused the counter to continuously reset
            var cardClick=(function(e){
                var counter=0;
                return function(e){
                e.currentTarget.classList.toggle("flip_card");
                e.currentTarget.classList.toggle("slide_over");
                e.currentTarget.style.zIndex=counter;
                counter++;
                }})();
    window.Game=Game;
})(window);