import 'whatwg-fetch';

import { scriptHandler } from '../utils';

const googleScriptName = 'rsb-google-maps';

export const googleApiKey = 'AIzaSyABplRWPbn89WsMUko7bMI83SXCiWVTHLY';
export const googleApiVersion = '3.28';


// returns the street address of a location using Google API
export async function getAddress({ lng, lat }) {
    const path = `http://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&sensor=true`;
    try {
        const res = await fetch(path, { method: 'GET', });
        if (res.status !== 200) {
            console.error(res.text());
            console.error('Status was not 200');
            return { error: 'An unexpected external error occurred. Please try again later' };
        }

        const address = await res.json();
        return { address: address.results[0].formatted_address };

    } catch (err) {
        console.error(err);
        return { error: 'Cannot fetch at the moment' };
    }
}

export const loadGoogleMaps = () => scriptHandler.load(`https://maps.googleapis.com/maps/api/js?v=${googleApiVersion}&key=${googleApiKey}&libraries=places`, { async: true, name: googleScriptName });

export const removeGoogleMaps = () => {
    scriptHandler.remove({ name: googleScriptName });
    delete window.google.maps;
    delete window.google;
}