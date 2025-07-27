import { formatInTimeZone } from 'date-fns-tz';

export function getCurrentDate() {
    const timeZone = 'Asia/Kolkata';
    // Format: DD-MM-YYYY_hh-mm-ss_AM/PM
    return formatInTimeZone(new Date(), timeZone, "dd-MM-yyyy_hh-mm-ss_a");
}