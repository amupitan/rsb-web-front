import deepFreeze from './deepFreeze';

export const loadScript = (src, { async = true, name = '' } = {}) => (
    new Promise((resolve, reject) => {
        const ref = window.document.getElementsByTagName("script")[0];
        if (!ref) return; // happens during test

        const script = window.document.createElement("script");
        script.src = src;
        script.async = async;
        script.onload = resolve;
        script.onerror = reject;
        script.dataset.name = name;
        ref.parentNode.insertBefore(script, ref);
    })
);

// removes a script from the page that meets [condition]
export const removeScript = ({ name, condition = (script) => name === script.dataset.name, } = {}) => {

    // get script that meets condition
    const allScripts = document.getElementsByTagName('script'),
        scriptElement = [].find.call(allScripts, condition);

    // remove script
    if (scriptElement) {
        scriptElement.remove();
        return true;
    }

    return false;
};

export default deepFreeze({
    load: loadScript,
    remove: removeScript,
});