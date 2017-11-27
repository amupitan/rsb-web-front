import datetime from "./datetime";
import _makeCancelable from './makeCancelable';
import scriptHandler from './scriptLoader';
import _deepFreeze from './deepFreeze';

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

export const DateUtils = datetime;

export const makeCancelable = _makeCancelable;

export { scriptHandler };

export const wait = ms => new Promise(resolve => setTimeout(resolve, ms));

export const deepFreeze = _deepFreeze;

/**
 * Deep clones an object and returns the clone.
 * It is unsafe because it does not handle function
 * or date objects correctly 
 * @param {Object} obj 
 * @returns {Object}
 */
export const unsafeCopy = obj => JSON.parse(JSON.stringify(obj));

export default {
    mergeDeep: mergeDeep,
    //toTitleCase returns the string with the first letter in uppercase e.g toTitleCase('wings') -> Wings
    toTitleCase: str => str.replace(/\w\S*/g, function (txt) { return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(); }),
}; 