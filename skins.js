import {getCookie,setCookie} from "./cookies_functions.js";
const iconTheme = getCookie("icon-theme");

let allOptions = document.querySelectorAll(".card")
let lastSelectedOption = null
if(iconTheme === null)
{
    var defaultSkin = document.querySelector(".emojis") //default theme
    defaultSkin.style.backgroundColor = "green" 
    lastSelectedOption = defaultSkin
}
for(const selectedOption of allOptions)
{
    
    if(selectedOption.classList[1] == iconTheme)
    {
        var a = document.querySelector("." + selectedOption.classList[1])
        console.log(a)
        a.style.backgroundColor = "green" 
        lastSelectedOption = a
    }
    selectedOption.addEventListener("click",(event) => //action when player clicks on a card
    {

        event.target.style.backgroundColor = "green" 
        if(lastSelectedOption != null)
        {
            lastSelectedOption.style.backgroundColor = "rgb(207, 66, 23)"
        }
        lastSelectedOption = selectedOption
        setCookie("icon-theme",selectedOption.classList[1])
                      
    })
}
