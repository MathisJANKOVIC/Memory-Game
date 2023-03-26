import {getCookie,setCookie} from "./cookies_functions.js"
const iconTheme = getCookie("icon-theme")

const defaultColor = "rgb(190, 44, 0)" //color of unselected option
const selectionColor = "green"        //color of selected option
const defaultTheme = "emojis"        //default icon theme
let lastSelectedOption = null       //saves selected option so we can change it color after user selected another option

if(iconTheme === null) //if the cookie doesn't exist
{
    var defaultOption = document.querySelector("." + defaultTheme) //selects class of default theme
    defaultOption.style.backgroundColor = selectionColor
    lastSelectedOption = defaultOption
}

let allOptions = document.querySelectorAll(".card")
for(const option of allOptions)
{
    //selected options has 2 classes: "card" and [icon-theme] so we use the second
    if(option.classList[1] == iconTheme) //if selectedOption's second class matches with cookie value
    {
        var selectedOption = document.querySelector("." + option.classList[1]) //selects option which has the cookie as it class
        selectedOption.style.backgroundColor = selectionColor
        lastSelectedOption = selectedOption
    }
    option.addEventListener("click",(event) => //action when player clicks on a card
    {
        if(event.target.style.backgroundColor != selectionColor) //don't act if user clicks on the option already selected
        {
            event.target.style.backgroundColor = selectionColor
            lastSelectedOption.style.backgroundColor = defaultColor
            lastSelectedOption = option

            setCookie("icon-theme",option.classList[1])
        }
    })
}
