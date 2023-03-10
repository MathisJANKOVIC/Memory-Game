import {getCookie} from "./cookies_functions.js"

const hiddenCardColor = "rgb(129 34 12)" //color of hidden card (from CSS)
const shownCardColor = "rgb(190 44 0)"  //color it changes to when card is shown
const defaultTheme = "emojis"          //default icon theme in case user didn't change it in skin page
const reflexionTime = 500 //ms        //time to let to the player to see what he discovered

async function initImport() //use of async function and "await" to await the program to load data before executing the rest of code
{
    var iconsModule = await import(`./icons.js`) //imports the module with all skins
    var listIcons = Object.values(iconsModule)[Object.keys(iconsModule).indexOf(iconTheme)] //loads the variable with has iconTheme as name in iconsModule
    
    if(listIcons){
        return listIcons      
    } 
    else{
        alert("Error : failed to load icons for cards")
        throw new Error("failed to load icons for cards")
    }  
}

let iconTheme = getCookie("icon-theme")
if(iconTheme === null){ //if the cookie doesn't exist
    iconTheme = defaultTheme //use default theme
}
let listIcons = await initImport()

console.log("List of pairs to match : ")
listIcons.forEach(element => {
    console.log(element)
})

listIcons = [].concat(listIcons,listIcons) //duplication of listIcons to make pairs
listIcons = listIcons.sort((a,b) => 0.5 - Math.random()) //random sort of listIcon

let isAnimationInProgress = false //informs us if card flip animation is still in progress so we don't allow the player to flip another card
let alreadySelectedCard = false  //informs us if a card is already selected
let firstSelectedCard = null    //saves first card selected so we can modify its properties later
let nRightMoves = 0            //couts pairs of cards that the player found so we can stop the game when he discovered all of them       

let nMoves = document.querySelector(".n-moves") //selects paragraph that represents the score of the player so we can update it
let allCards = document.querySelectorAll(".card") //selects all cards

if(allCards.length != listIcons.length){
    alert("Error : number of icons doesn't correspond to number of cards")
    throw new Error("number of icons doesn't correspond to number of cards")
}
allCards.forEach((selectedCard,index) => 
{
    selectedCard.addEventListener("click",(event) => //action when player clicks on a card
    {
        if(selectedCard.innerHTML == "" && isAnimationInProgress == false) //allow to flip the card only if it's hidden and there is no animation in progress
        {            
            event.target.style.transform = "rotateY(0)" //flips the card selected
            isAnimationInProgress = true //animation starts
            
            setTimeout((function(){
                
                //gives to the card an icon and another color  
                selectedCard.innerHTML = listIcons[index] 
                event.target.style.backgroundColor = shownCardColor

                if(alreadySelectedCard == false)
                {                    
                    firstSelectedCard = selectedCard
                    alreadySelectedCard = true
                    isAnimationInProgress = false //there is no animation so the player can quickly select another card
                }
                else //if there already one card selected
                {                
                    nMoves.innerHTML++ //update the number of moves printed on the screen
                    if(selectedCard.innerHTML != firstSelectedCard.innerHTML) //if icons don't correspond
                    {
                        setTimeout(() => 
                        {
                            event.target.style.transform = firstSelectedCard.style.transform = "rotateY(180deg)" //flips back to initial position 
                            setTimeout((function(){                      
                                event.target.style.backgroundColor = firstSelectedCard.style.backgroundColor = hiddenCardColor //back cards to initial color
                                selectedCard.innerHTML = firstSelectedCard.innerHTML = "" //"hides" cards icons  
                                isAnimationInProgress = false //animation ends     
                            }),100) //flip animation time
                        }, reflexionTime);           
                    }
                    else //if icons correspond
                    {
                        nRightMoves = nRightMoves + 1
                        isAnimationInProgress = false //there is no animation so the player can quickly select another card

                        if(nRightMoves == listIcons.length/2) //if nRightMoves equals to the number of pairs icons
                        {
                            setTimeout((function()
                            {
                                var player = prompt("F??licitaion ! Vous avez remport?? la partie ???????? \nScore : " + nMoves.innerHTML + " coups \nEntrez votre nom pour sauvegarder votre score :")
                                var regex = /[^a-zA-Z0-9_-]/                                
                                while(regex.test(player) || player == ""){ //while there are characters ??? ["a","z"] && ["A","Z"] && [0,9] && "_" && "-"
                                    player = prompt('??? Le nom ne peut ??tre vide ou contenir des caract??res sp??ciaux autres que "_" et "-" ! \nVeuillez r??essayer :')
                                }

                                if(player !== null)  
                                {
                                    //encryption of data and send to PHP highscore page using get method
                                    var encryptedPlayer = btoa(player)
                                    var encryptedScore = btoa(nMoves.innerHTML)
                                    window.location.replace(`highscore.php?player=${encryptedPlayer}&score=${encryptedScore}`)
                                }
                                else //if the user clicked on "cancel" button 
                                { 
                                    window.location.replace(`highscore.php?player=null`)
                                }
                            }),reflexionTime)
                        }                                                     
                    }
                    alreadySelectedCard = false                             
                }                
            }),200) //flip animation time           
        }                  
    })
})

/*
Probl??mes rencontr??s :
- quand on clique sur une carte trouv??e avec une autre non trouv??e les 2 se retournent | status : ???
- quand on clique sur plusieurs cartes diff??rentes rapidement et que aucune n'est bonne elles se retournent toutes sauf une | status : ???
- quand on clique 2 fois sur la m??me carte et une autre diff??rente cach??es elles restent affich??es | status : ???
*/