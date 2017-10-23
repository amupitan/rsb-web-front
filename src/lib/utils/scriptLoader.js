const loadScript = (src, { async = true } = {}) => (
    new Promise((resolve, reject) => {
        const ref = window.document.getElementsByTagName("script")[0];
        const script = window.document.createElement("script");
        script.src = src;
        script.async = async;
        script.onload = resolve;
        script.onerror = reject;
        ref.parentNode.insertBefore(script, ref);
    })
);

export default loadScript;