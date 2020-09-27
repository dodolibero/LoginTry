
function maIlTempo(){ 
    let lat, lon;
    if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition(async position => {
        lat = position.coords.latitude;
        lon = position.coords.longitude;
        document.getElementById('latitude').textContent = lat
        document.getElementById('longitude').textContent = lon;
        

        const url= `/weather/${lat}/${lon}`
        const response = await fetch(url)
        const json = await response.json()
        
        const tempo_desc = json.weather[0].description;
        document.getElementById("tempo").textContent = tempo_desc;
        
        console.log(json)
    })



    }else{console.log("i'm sowwwwy")}}