
function maPiove(){
    maIlTempo()
    


}

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
        console.log(json.weather[0].main)
        if (json.weather[0].main=="Rain"){
            document.getElementById('SIoNO').textContent = "SI"
        }else{document.getElementById('SIoNO').textContent = "no,direi di no" }})



    }else{document.getElementById('SIoNO').textContent = "Boh,non lo so" }}