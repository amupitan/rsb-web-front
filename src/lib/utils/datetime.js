const dateOptions = {
    weekday: "long", year: "numeric", month: "short",
    day: "numeric", hour: "2-digit", minute: "2-digit"
};

const _getCurrentTime = (dateString) => {
    const d = dateString ? new Date(dateString) : new Date();
    const hh = d.getHours(), mm = d.getMinutes();
    return [
        (hh > 9 ? '' : '0') + hh,
        (mm > 9 ? '' : '0') + mm,
    ].join(':');
};

const DateUtils = Object.seal({
    getReadableTime: (time, { locale = 'en-us' } = {}) => (new Date(time)).toLocaleTimeString(locale, dateOptions),

    getCurrentTime: _getCurrentTime,

    getTimeAfter: ({ dateString, minutes = 15 } = {}) => {
        const d = dateString ? new Date(dateString) : new Date();
        return _getCurrentTime(new Date(d.setMinutes(d.getMinutes() + minutes)).toISOString());
    },

    yyyymmdd: ({ dateString, delimeter = '-' } = {}) => {
        const d = dateString ? new Date(dateString) : new Date();
        const mm = d.getMonth() + 1, dd = d.getDate();
        return [d.getFullYear(),
        (mm > 9 ? '' : '0') + mm,
        (dd > 9 ? '' : '0') + dd,
        ].join(delimeter);
    },

    hhmm: ({ timeString, delimeter = ':' } = {}) => {
        const t = timeString.split(':');
        const hh = t[0], mm = t[1];
        return [(hh > 9 ? '' : '0') + hh,
        (mm > 9 ? '' : '0') + mm,
        ].join(delimeter);
    },


    toDateString: (dateString) => (dateString ? new Date(dateString) : new Date()).toDateString(),

    convertToTimes: (date, duration) => {
        const gameDate = new Date(date);

        //creates a new date object based on the duration of the game
        const newDate = new Date(gameDate.getTime() + duration * 60000);
        const endHours = newDate.getHours() + "";
        const endMinutes = newDate.getMinutes() + "";
        const endFormat = endHours + ':' + endMinutes;

        const year = gameDate.getFullYear() + "";
        const month = (gameDate.getMonth() + 1) + "";
        const day = gameDate.getDate() + "";
        const hours = gameDate.getHours() + "";
        const minutes = gameDate.getMinutes() + "";
        const dateFormat = year + "-" + month + "-" + day;
        let startFormat = hours + ':' + minutes;

        const dateAndTimes = {
            gameDate: dateFormat,
            startTime: startFormat,
            endTime: endFormat,
        }
        return dateAndTimes;
    },

});

export default DateUtils;