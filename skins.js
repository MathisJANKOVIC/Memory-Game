import {getCookie,setCookie} from "./cookies_functions.js";
let iconTheme = getCookie("icon-theme");

if(iconTheme !== null) //if the iconTheme exists
{
    var radioButton = document.querySelector('input[value="' + iconTheme + '"]'); //selects the input radio which has cookie as value
    if(radioButton){
        radioButton.checked = true;
    }
}
else //if the cookie doesn't exist
{
    var radioButton = document.querySelector('input[value="shapes"]'); //selects the input radio which has "shapes" as value (default value)
    if(radioButton){
        radioButton.checked = true;
    }
}

const allRadioButton = document.querySelectorAll('input[type=radio]');
for(const radioButton of allRadioButton) 
{
    radioButton.addEventListener('change', (event) => { //whenever the button radio check changes 
        setCookie("icon-theme",event.target.value)  //modifies the cookie with radio button value
    })
}
