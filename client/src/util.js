import { TAG_COLORS } from "./constants";

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
    return Math.floor(Math.abs(differenceInTime) / (1000 * 3600 * 24));
}

/**
 * Hashes strings to a hexcolor. Chosen from a predetermined list of colors.
 *
 * @param {String} text: string to hash  
 */
export const toHexColor = (text) => {
    // convert to int
    let hash = 0;
    for (let i = 0; i < text.length; i++) {
        hash += text.charCodeAt(i) + i; // just so order matters
    }

    hash = hash % TAG_COLORS.length; // get it in range
    hash = (hash + TAG_COLORS.length) % TAG_COLORS.length; // keep it positive
    return '#' + TAG_COLORS[hash];
}