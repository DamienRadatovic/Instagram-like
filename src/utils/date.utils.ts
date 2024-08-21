import { DateTime } from 'luxon';

const getDate = (date: string): string => {
    const dateToCheck = DateTime.fromISO(date);
    const now = DateTime.now();

    const diffInHours = now.diff(dateToCheck, 'hours').hours;

    if (diffInHours < 24) {
        const diffInMinutes = now.diff(dateToCheck, 'minutes').minutes;
        if (diffInMinutes < 60) {
            return `${Math.floor(diffInMinutes)} mins ago`;
        }
        return `${Math.floor(diffInHours)} hrs ago`;
    }

    const diffInDays = now.diff(dateToCheck, 'days').days;

    if (diffInDays < 30) {
        return `${Math.floor(diffInDays)} days ago`;
    }
    return dateToCheck.toFormat('LLLL dd yyyy');
};

export {
    getDate,
};