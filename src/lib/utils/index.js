const dateOptions = {
    weekday: "long", year: "numeric", month: "short",
    day: "numeric", hour: "2-digit", minute: "2-digit"
};

//TODO: rename this class
export function isObject(item) {
    return (item && typeof item === 'object' && !Array.isArray(item));
}

export const isObjectString = (item) => {
    return (item && ((item.startsWith('{') && item.endsWith('}')) || (item.startsWith('[') && item.endsWith(']'))));
    //TODO: use JSON.parse
}

// mergeDeep recursively merges source into a copy of target and returns it
const mergeDeep = (target, source) => {
    let output = Object.assign({}, target);
    if (isObject(target) && isObject(source)) {
        Object.keys(source).forEach(key => {
            if (isObject(source[key])) {
                if (!(key in target))
                    Object.assign(output, { [key]: source[key] });
                else
                    output[key] = mergeDeep(target[key], source[key]);
            } else {
                Object.assign(output, { [key]: source[key] });
            }
        });
    }
    return output;
};

// Converts a callback function to a promise function
export function promisify(func) {
    return (...args) =>
        new Promise((resolve, reject) => {
            const callback = (data, err) => err ? reject(err) : resolve(data)

            func.apply(this, [...args, callback])
        })
}

export const DateUtils = Object.seal({
    getTime: (time, { locale = 'en-us' }) => (new Date(time)).toLocaleTimeString(locale, dateOptions),

    yyyymmdd: ({ dateString, delimeter = '-' } = {}) => {
        const d = dateString ? new Date(dateString) : new Date();
        const mm = d.getMonth() + 1, dd = d.getDate();
        return [d.getFullYear(),
        (mm > 9 ? '' : '0') + mm,
        (dd > 9 ? '' : '0') + dd,
        ].join(delimeter);
    }
});

export const getTime = (time, { locale = 'en-us' }) => (new Date(time)).toLocaleTimeString(locale, dateOptions);

export default {
    mergeDeep: mergeDeep,
    //toTitleCase returns the string with the first letter in uppercase e.g toTitleCase('wings') -> Wings
    toTitleCase: str => str.replace(/\w\S*/g, function (txt) { return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(); }),
}; 