let listIcons = ["🦢","🐘","🦎","🦋","🐕","🐳","🐠","🦨","🐣","🦥"] //All Icons to match
const reflexionTime = 500 //ms

console.log("List of pairs to match :")
listIcons.forEach(element => {
    console.log(element)
});

listIcons = [].concat(listIcons,listIcons) //duplication of listIcons to make pairs
listIcons = listIcons.sort((a,b) => 0.5 - Math.random()) //random sort of listIcon

let alreadySelectedCard = false //informs us if a card is already selected
let firstSelectedCard = null       //saves the object of the first card selected so we can modify its properties later
let nRightMoves = 0                 

let nMoves = document.querySelector(".n-moves")
let allCards = document.querySelectorAll(".card")
allCards.forEach((cardSelected,index) => 
{
    cardSelected.addEventListener("click",(event) => 
    {
        event.target.style.transform = "rotateY(180deg)" //flips the card selected    
        setTimeout((function(){
            //gives to the card an icon and another color  
            cardSelected.innerHTML = listIcons[index] 
            event.target.style.backgroundColor = "rgb(207, 66, 23)"

            if(alreadySelectedCard == false)
            {
                firstSelectedCard = cardSelected
                alreadySelectedCard = true
            }
            else
            {                
                nMoves.innerHTML++
                if(cardSelected.innerHTML != firstSelectedCard.innerHTML) //if icons don't match
                {
                    setTimeout(() => 
                    {
                        event.target.style.transform = firstSelectedCard.style.transform = "rotateY(0deg)" //flips back to initial position 
                        setTimeout((function(){                      
                            event.target.style.backgroundColor = firstSelectedCard.style.backgroundColor = "rgb(145, 48, 18)" //back to initial color
                            cardSelected.innerHTML = firstSelectedCard.innerHTML = "" //"hides" the icon          
                        }),100) //flip animation time
                    }, reflexionTime);           
                }
                else //if icons match
                {
                    nRightMoves = nRightMoves + 1
                    if(nRightMoves == 1)
                    {
                        setTimeout((function()
                        {
                            var player = prompt("Félicitaion ! Vous avez remporté la partie 🥳🎉 \nScore : " + nMoves.innerHTML + " coups \nEntrez votre nom pour sauvegarder votre score :")

                            if(player != null)     
                            {
                                var encryptedPlayer = btoa(player.charAt(0).toUpperCase() + player.slice(1))
                                var encryptedScore = btoa(nMoves.innerHTML)
                                window.location.replace(`highscore.php?player=${encryptedPlayer}&score=${encryptedScore} `)
                            }
                            else{
                                window.location.replace(`index.html`)
                            }
                        }),reflexionTime)
                    }                                
                }
                alreadySelectedCard = false               
            } 
        }),200) //flip animation time                  
    })
})