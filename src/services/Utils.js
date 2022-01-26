import {DateTime} from "luxon";

function isStringNullOrBlank(string) {
    return (typeof string === "undefined" ||
        string === null ||
        typeof string !== "string" ||
        string.length === 0 ||
        string.trim().length === 0);
}

/**
 *  Formats a date into the given format. Assumes the date is a Luxon Date, if it is not a Luxon date it will attempt
 *      to convert it into a Luxon date, depending on whether it is a Number (milliseconds since epoch) or a native JS
 *      Date. Will throw an error if unable to convert.
 *
 * @param {Date|DateTime|Number} date The date to format.
 * @param {string} formatString The format to output the date in, defaults to yyyy-MM-dd HH:mm:ss
 * @returns {string} The formatted date, or empty string if date was null/undefined.
 */
function formatDateTime(date, formatString) {
    if (typeof date === "undefined" || null == date) {
        return "";
    }
    if (!DateTime.isDateTime(date)) {
        if (date instanceof Date) {
            date = DateTime.fromJSDate(date);
        }
        else if (date instanceof Number) {
            date = DateTime.fromMillis(date);
        }
        else {
            //Unable to determine the format of the date
            throw new Error("Unable to determine the type of this date!");
        }
    }

    if (typeof formatString === "undefined") {
        formatString = "yyyy-MM-dd HH:mm:ss";
    }

    return date.toFormat(formatString);
}

class Arrays {

    static remove(array, element) {
        let ind = array.indexOf(element);
        if (ind >= 0) {
            array.splice(ind, 1);
        }
    }
}

export {
    isStringNullOrBlank,
    formatDateTime,
    Arrays
}
