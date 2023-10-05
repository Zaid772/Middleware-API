export const writeCookie = (key, value, days) => {
    // Key = The name of the cookie
    // value = jwt_token
    // days = how long until the cookie expires

    let date = new Date()

    days = days || 365 

    // setting the date plus the number of days we want the cookie to last for
    date.setDate(date.getDate() + days)

    let cookie = document.cookie = key + "=" + value + "; expires=" + date.toGMTString() + "; path=/"
    console.log(cookie)
}

export const getCookie = (cookieName) => {
    const re = new RegExp(`(?<=${cookieName}=)[^;]*`) // pattern to find a cookie

    try {
        let cookie = document.cookie.match(re)[0]
        console.log(cookie)
        // try and find a cookie matching 
        // the pattern in the regular expression, in this case the cookie name
        // if cookie isn't found, this will raise an error and throw it to the catch block
        return cookie
    } catch (error) {
        return false
    }
}