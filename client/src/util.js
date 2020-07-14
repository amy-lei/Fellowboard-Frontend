/**
 * Given a date, convert to a integer number of days from now.
 * @param {String or Date} date 
 */
export const getDateDifference = (date) => {
    let dateObj = date;
    if (!(date instanceof Date)) {
        dateObj = new Date(date);
    }
    const present = new Date();
    const differenceInTime = dateObj.getTime() - present.getTime();
    console.log(differenceInTime / (1000 * 3600 * 24));
    return Math.floor(Math.abs(differenceInTime) / (1000 * 3600 * 24));
}

/**
 * Hashes strings to a hexcolor. Followed this guide:
 * https://www.designedbyaturtle.co.uk/convert-string-to-hexidecimal-colour-with-javascript-vanilla/
 *
 * @param {String} text: string to hash  
 */
export const toHexColor = (text) => {
    // convert to int
    let hash = 0;
    for (let i = 0; i < text.length; i++) {
        hash = text.charCodeAt(i) + ((hash << 5) - hash);
    }

    // convert to the hex
    let hex = ((hash>>24)&0xFF).toString(16) +
            ((hash>>16)&0xFF).toString(16) +
            ((hash>>8)&0xFF).toString(16) +
            (hash&0xFF).toString(16);
    hex += '000000'; // pad in case not long enough
    return hex.substring(0,6); 
}