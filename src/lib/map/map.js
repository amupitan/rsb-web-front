import { showError } from '../../mixins/notifiable';
import redirect from '../navigator';

export async function getCurrentLocation() {
    let position = {};
    try {
        const { coords } = await _getCurrentLocation();
        position = {
            lat: coords.latitude,
            lng: coords.longitude,
        }
    } catch (err) {
        position = Promise.resolve({ lat: 42.41315919699359, lng: -92.42620756015623 });

        // if err.code === 1 that means the user refused to let us get their location
        if (err.code === 1) {
            //notify the user that we need their location
            showError({ title: 'Location not found', message: 'You might have disabled location services on your browser. This app works best with location turned on' })
        } else {
            //TODO: log the unknown error   
            showError('An unknown error has occurred');
        }
        redirect();
    }

    return position;
}

// calculates the distance between tow points
// returns the result in km if units='metric'
// defaults to imperial which returns the results in miles
export const getDistanceBetweenTwoPoints = ({ origin = {}, dest, unit = 'imperial' }) => {
    const lat1 = origin.lat, lng1 = origin.lng,
        lat2 = dest.lat, lng2 = dest.lng;

    const R = 6371; // Radius of the earth in km
    const dLat = deg2rad(lat2 - lat1);  // deg2rad below
    const dLon = deg2rad(lng2 - lng1);
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2)
        ;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c; // Distance in km
    if (unit === 'metric')
        return d;
    return d * 0.62137119; // in miles
}

const deg2rad = (deg) => {
    return deg * (Math.PI / 180);
}

const _getCurrentLocation = () => {
    return new Promise(function (resolve, reject) {
        //TODO: check if browser supports navigator.geolocation
        navigator.geolocation.getCurrentPosition(resolve, reject);
    });
};