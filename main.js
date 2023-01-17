let allBoxes = document.querySelectorAll(".box")
// let listCardValues = ["⭕","🟥","💖","🔷","🍕","🔺","⭕","🟥","💖","🔷","🍕","🔺"]
let listCardValues = ["🦢","🐘","🦎","🦋","🐕","🐳","🦢","🐘","🦎","🦋","🐕","🐳"]
oneCardAlreadySelected = false 
let firstCardSelected = null
let nRightMove = 0 
let nMove = 0

allBoxes.forEach((box,key) => 
{
    listCardValues = listCardValues.sort((a,b) => 0.5 - Math.random())
    
    box.addEventListener("click",(event) => 
    {
        //event.target.style.transform = "rotateY(180deg)"

        box.innerHTML = listCardValues[key]
        event.target.style.backgroundColor = "rgb(207, 66, 23)"
        
        if(oneCardAlreadySelected == false)
        {
            firstCardSelected = box
            oneCardAlreadySelected = true
        }
        else
        {
            nMove++
            if(box.innerHTML != firstCardSelected.innerHTML)
            {
                setTimeout((function(){
                    event.target.style.backgroundColor = "rgb(145, 48, 18)"
                    box.innerHTML = ""
                    firstCardSelected.innerHTML = ""
                    firstCardSelected.style.backgroundColor = "rgb(145, 48, 18)"
                    
                }),200)             
            }
            else
            {
                nRightMove = nRightMove + 1
                if(nRightMove == 6)
                {
                    setTimeout((function(){
                    alert("Félicitaion, vous avez gagné en " + nMove + " coups")
                    return           
                }),1000)
                }               
                
            }
            oneCardAlreadySelected = false

        } 
        
    })
})

 