
## card game
[https://zahego.github.io/Card-Game/web/](https://zahego.github.io/Card-Game/web/)  
A flash card game with vanilla JS, HTML, CSS. User can use this to memorize concepts an then discard the ones they remembered to the discard pile. Made by following the course on LinkedIn Learning(Lynda).

## Motivation
The tutorial looks kinda cool so I jumped right in.

## Getting Started
These instructions will guild you through the inital setting up process and 
highlight what the apps can do for you to explore on your own.  


## Notable feature
- Single Page Application 
- Drag and drop (draggable, droppable)
- bind, call and this keyword
- propagation. (stopPropagation) - make parent div is the one receiving all event listerner
- createDocumentFragment - allow for all components to finish render and load instead of components loading one by one  
- Shuffle using fisher-yale algorithm
- dynamic component JS
- immediately invoked function - for restricting var amd let


## Prequesite
a server like [Glassfish](https://javaee.github.io/glassfish/) or [Tomcat](http://tomcat.apache.org/),   
or [VsCode live server plugin](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer)  


## Recommendation
[Netbean Glassfish/Tomcat support bundle](https://netbeans.org/downloads/8.2/rc/)


## Installing and Running
Clone the remote to your local repo
```
git clone https://github.com/zahego/Card-Game.git
```
run the file on server, or if run on Netbean with web support bundle, just click 'Run'  
explore the functionalities  


## What you can do
- drag and drop cards to discard pile
- flip card for fun
- shuffle the deck

## Technologies stack
web: HTML, CSS, JS,  
server: Glassfish  


## Contributors
Minh Tran 


## License
This project is licensed under the MIT License

## Challenges and resolutions
- I can't do var in json file so I migrate all the information to a js file.
- this keyword is still a pain, but at least I got closer to understand completely about it.
- still have some trouble with bind and call, this makes React seems like a gift from God with that arrow func
- I put a iif at the wrong scope level once and everything broke. This reminds me of being more careful of should a function be inside or outside scope

## Future enhancement (coming soon)
- A game of heart
- Tictactoe unlimited, with drag and drop UI,
- Rock, paper, scissor game
- a game of solitaire
