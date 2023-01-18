let listIcons = ["🦢","🐘","🦎","🦋","🐪","🐳","🐠","🐌"] //All Icons to match
const reflexionTime = 500 //ms

console.log("List of pairs to match :")
listIcons.forEach(element => {
    console.log(element)
});

listIcons = [].concat(listIcons,listIcons) //duplication of the array of icons to make pairs
listIcons = listIcons.sort((a,b) => 0.5 - Math.random()) //random sort of listIcon

let oneCardAlreadySelected = false //to notify us if a card is already selected
let firstCardSelected = null       //to save the value of the first card selected so we can modify its properties later
let nRightMove = 0                 


let nMove = document.querySelector(".nMove")
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

            if(oneCardAlreadySelected == false)
            {
                firstCardSelected = cardSelected
                oneCardAlreadySelected = true
            }
            else
            {                
                nMove.innerHTML++
                if(cardSelected.innerHTML != firstCardSelected.innerHTML) //if icons don't match
                {
                    setTimeout(() => {
                        event.target.style.transform = firstCardSelected.style.transform = "rotateY(0deg)" //flip back to initial position 
                        setTimeout((function(){                      
                            event.target.style.backgroundColor = firstCardSelected.style.backgroundColor = "rgb(145, 48, 18)"
                            cardSelected.innerHTML = firstCardSelected.innerHTML = ""             
                        }),100)  
                    }, reflexionTime);           
                }
                else
                {
                    nRightMove = nRightMove + 1
                    if(nRightMove == listIcons.length/2)
                    {
                    setTimeout((function(){
                        var input = prompt("Félicitaion, vous avez gagné en " + nMove.innerHTML + " coups 🎉🥳 \nEntrez votre nom pour sauvegarder votre score")
                        if(input === null || input === ""){
                            return
                        } 
                        else{
                            window.location.href = `scores.php?name=${input}&nMoves=${nMove.innerHTML}`
                        }          
                    }),reflexionTime)
                    }                                
                }
                oneCardAlreadySelected = false
                
            } 
        }),200) 
                  
    })
})

 