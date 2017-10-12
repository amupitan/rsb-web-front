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
    getReadbaleTime: (time, { locale = 'en-us' } = {}) => (new Date(time)).toLocaleTimeString(locale, dateOptions),

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
    }
});

export default DateUtils;