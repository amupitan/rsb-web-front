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

export const removeScript = ({ name, condition = (script) => name === script.dataset.name, } = {}) => {

    const allScripts = document.getElementsByTagName('script'),
        scriptElement = [].find.call(allScripts, condition);

    if (scriptElement) scriptElement.remove();
};

export default deepFreeze({
    load: loadScript,
    remove: removeScript,
});