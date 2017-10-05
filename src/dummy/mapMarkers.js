const mapMarkers = [
    {
        title: 'Ames Soccer Club',
        name: 'Ames Soccer Club',
        position: { lat: 42.0308, lng: -93.6319 },
    },
    {
        title: 'Iowa Boys',
        name: 'Iowa Boys',
        position: { lat: 42.1, lng: -93.6319 },
    },
    {
        title: 'Iowa State Soccer Club',
        name: 'Iowa State Soccer Club',
        position: { lat: 42.06802802333066, lng: -93.62943649291992 },
    },
    {
        title: 'Iowa Girls',
        name: 'Iowa girls',
        position: { lat: 42.009892074937525, lng: -93.61827850341797 },
    },
    {
        title: 'Iowa Women',
        name: 'Iowa Women',
        position: { lat: 41.75761135905978, lng: -91.55731201171875 },
    },
    {
        title: 'Iowa Men',
        name: 'Iowa Men',
        position: { lat: 41.658677502799534, lng: -91.55113220214844 },
    },
    {
        title: 'Waterloo blackhawks',
        name: 'Waterloo blackhawks',
        position: { lat: 42.492786, lng: -92.3425775 },
    },
    {
        title: 'Packers',
        name: 'Packers',
        position: { lat: 42.46057356449916, lng: -92.38420486450195 },
    },
    {
        title: 'Ginger men',
        name: 'ginger Men',
        position: { lat: 42.490960223200396, lng: -92.37030029296875 },
    },
    {
        title: 'Stick men',
        name: 'Stick Men',
        position: { lat: 41.6611277, lng: -91.53016830000001 },
    },
];

let getMarkers = postion => {
    return mapMarkers.filter((marker) => {
        return marker.position.lat <= postion.lat + 0.4 && marker.position.lat > postion.lat - 0.4 &&
            marker.position.lng <= postion.lng + 0.4 && marker.position.lng > postion.lng - 0.4;
    });
};

export default getMarkers;
