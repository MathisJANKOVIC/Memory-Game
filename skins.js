import {getCookie,setCookie} from "./cookies_functions.js";

var cookieValue = getCookie("iconType");
if (cookieValue) {
  var radiosButton = document.querySelector('input[value="' + cookieValue + '"]');
  if (radiosButton) {
    radiosButton.checked = true;
  }
}

const radioButton = document.querySelectorAll('input[type=radio]');

for(const button of radioButton) 
{
    button.addEventListener('change', (event) => {
        setCookie("iconType",event.target.value,30)
        alert(event.target.value)     
    });
}



