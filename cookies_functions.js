export function setCookie(name,value,expirationDay) 
{
    var date = new Date()
    var currentTime = date.getTime()
    var expirationTime = expirationDay * 24 * 60 * 60 * 1000 //converts expirationDay from days to ms
    var expirationDate = currentTime + expirationTime
    date.setTime(expirationDate)
    document.cookie = encodeURIComponent(name) + "=" + encodeURIComponent(value) + ";" + "expires="+date.toUTCString() + ";path=/"
    //builds the cookie by encode strings to URL format and converting date to UTC format
}

export function getCookie(name) 
{
    name = name + "="
    var decodedCookies = decodeURIComponent(document.cookie) //gets string with all cookies
    var cookies = decodedCookies.split(";") //convert cookies string to a list of cookies

    for(var i = 0 ; i < cookies.length ; i++) 
    {
        var cookie = cookies[i]
        while(cookie.charAt(0) == " ") //suppress spaces
        {
            cookie = cookie.substring(1)
        }
        if(cookie.indexOf(name) == 0) //if starts with the noun of cookie researched
        {
            return cookie.substring(name.length,cookie.length) //return the value of the cookie starting after the name and finishing after cookie's lenght
        }
    }
    return null
}