//TODO: rename this class
export function isObject(item) {
    return (item && typeof item === 'object' && !Array.isArray(item));
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

export default {
    mergeDeep: mergeDeep,
    //toTitleCase returns the string with the first letter in uppercase e.g toTitleCase('wings') -> Wings
    toTitleCase: str => str.replace(/\w\S*/g, function (txt) { return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(); }),
}; 