export const displayMap = locations => {
    //mapboxgl.accessToken = 'pk.eyJ1Ijoiamhvbm5hdGFuc2QiLCJhIjoiY2tqeDYxZTN4MDE5YTJ2azdwZWc1cHpkeCJ9.hmU0jpW1fVz3OqtR5V31Eg';
    mapboxgl.accessToken = 'pk.eyJ1Ijoiamhvbm5hdGFuc2QiLCJhIjoiY2tqeDZhNXkwMDBnODJ3bzhpZzk0d241ZiJ9.YzWkIYXSs2eSQ0gMnlKTtw';
    var map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/jhonnatansd/ckjxd7rvt031717r3gebfiixb',
        scrollZoom: false
    });

    const bounds = new mapboxgl.LngLatBounds();

    locations.forEach(loc => {
        //Create marker
        const el = document.createElement('div');
        el.className = 'marker';

        //Add marker
        new mapboxgl.Marker({
            element: el,
            anchor: 'bottom'
        }).setLngLat(loc.coordinates).addTo(map);

        //Add popup
        new mapboxgl.Popup({
            offset: 30
        }).setLngLat(loc.coordinates).setHTML(`<p>Day ${loc.day}: ${loc.description}</p>`).addTo(map);

        //Extend map bounds to include current location
        bounds.extend(loc.coordinates);
    });

    map.fitBounds(bounds, {
        padding: {
            top: 200,
            botton: 150,
            left: 100,
            right: 100
        }
    });
};

