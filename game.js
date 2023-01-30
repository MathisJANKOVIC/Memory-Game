import {getCookie} from "./cookies_functions";
let listType = getCookie("iconType")
let listTypeName

if(listType !== null){
    listTypeName = "list" + listType.charAt(0).toUpperCase() + listType.slice(1)
}
else{
    listTypeName = "list" + "Shapes"
}

async function initImport() 
{
    let iconsModule = await import(`./icons.js`)
    let listIcons = Object.values(iconsModule)[Object.keys(iconsModule).indexOf(listTypeName)];
    console.log(listIcons)
    return listIcons
}
let listIcons = await initImport();
console.log(listIcons)
const defaultColor = "rgb(145, 48, 18)" //color of hidden card (from CSS)
const shownColor = "rgb(207, 66, 23)"  //color it changes to when card is shown
const reflexionTime = 500 //ms        //time to let to the player to see what he discovered

console.log("List of pairs to match : ")
listIcons.forEach(element => {
    console.log(element)
});

listIcons = [].concat(listIcons,listIcons) //duplication of listIcons to make pairs
listIcons = listIcons.sort((a,b) => 0.5 - Math.random()) //random sort of listIcon

let isAnimationInProgress = false //informs us if card flip animation is still in progress so we don't allow the player to flip another card
let alreadySelectedCard = false  //informs us if a card is already selected
let firstSelectedCard = null    //saves first card selected so we can modify its properties later
let nRightMoves = 0            //couts pairs of cards that the player found so we can stop the game when he discovered all of them       

let nMoves = document.querySelector(".n-moves") //selects paragraph that represents the score of the player so we can update it
let allCards = document.querySelectorAll(".card") //selects all cards
allCards.forEach((cardSelected,index) => 
{
    cardSelected.addEventListener("click",(event) => //action when player clicks on a card
    {
        if(cardSelected.innerHTML == "" && isAnimationInProgress == false) //allow to flip the card only if it's hidden and there is no animation in progress
        {            
            event.target.style.transform = "rotateY(180deg)" //flips the card selected
            isAnimationInProgress = true //animation starts
            
            setTimeout((function(){
                
                //gives to the card an icon and another color  
                cardSelected.innerHTML = listIcons[index] 
                event.target.style.backgroundColor = shownColor

                if(alreadySelectedCard == false)
                {                    
                    firstSelectedCard = cardSelected
                    alreadySelectedCard = true
                    isAnimationInProgress = false //there is no animation so the player can quickly select another card
                }
                else //if there already one card selected
                {                
                    nMoves.innerHTML++ //update the number of moves printed on the screen
                    if(cardSelected.innerHTML != firstSelectedCard.innerHTML) //if icons don't correspond
                    {
                        setTimeout(() => 
                        {
                            event.target.style.transform = firstSelectedCard.style.transform = "rotateY(0deg)" //flips back to initial position 
                            setTimeout((function(){                      
                                event.target.style.backgroundColor = firstSelectedCard.style.backgroundColor = defaultColor //back cards to initial color
                                cardSelected.innerHTML = firstSelectedCard.innerHTML = "" //"hides" cards icons  
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
                                var player = prompt("Félicitaion ! Vous avez remporté la partie 🥳🎉 \nScore : " + nMoves.innerHTML + " coups \nEntrez votre nom pour sauvegarder votre score :")
                                var regex = /[^a-zA-Z0-9_-]/                                
                                while(regex.test(player) || player == ""){ //while there are characters ∉ ["a","z"] && ["A","Z"] && [0,9] && "_" && "-"
                                    player = prompt('⚠ Le nom ne peut être vide ou contenir des caractères spéciaux autres que "_" et "-" ! \nVeuillez réessayer :')
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
Problèmes rencontrés :
- quand on clique sur une carte trouvée avec une autre non trouvée les 2 se retournent | status : ✔
- quand on clique sur plusieurs cartes différentes rapidement et que aucune n'est bonne elles se retournent toutes sauf une | status : ✔
- quand on clique 2 fois sur la même carte et une autre différente cachées elles restent affichées | status : ✔
*/