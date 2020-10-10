let key
fetch("/map_key")
  .then(response =>{
    return response.text()
}).then(text => init(text))





function init(Key){
    mapboxgl.accessToken = Key;
    var map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v11', // stylesheet location
        center: [10.64729690551758, 45.279393577205305], // starting position [lng, lat]
        zoom: 9 // starting zoom
    })
    fetch("/getdb")
    .then(response =>{
        return response.json()
    }).then(json =>{ 
        console.log(json);
        markerDB(json)});
    function markerDB(db){
        let markerlist =[]
        for (item of db){
            console.log(item.dove)

            markerlist+=[new mapboxgl.Marker()
                .setLngLat([item.dove.lon, item.dove.lat])
                .addTo(map)
            ];
        }}
console.log("initMappa")}

            


