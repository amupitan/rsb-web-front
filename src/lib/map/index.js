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
        } else {
            //TODO: log the unknown error   
        }
    }

    return position;
}

const _getCurrentLocation = () => {
    return new Promise(function (resolve, reject) {
        //TODO: check if browser supports navigator.geolocation
        navigator.geolocation.getCurrentPosition(resolve, reject);
    });
}
