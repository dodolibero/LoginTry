const { response } = require('express')
const express = require('express')
const fetch = require("node-fetch")
const app = express()
const port = 3000


app.listen(port, () => console.log(`Example app listening on port port!`))
app.use(express.static("public"));
app.use(express.json( {limit: "1mb" } ));


app.get("/weather/:lat/:lon",async (request,response)=>{
    
    const lat = request.params.lat
    const lon = request.params.lon
    const url=`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=78e29f0e34ef18dffcab6f4c4cbdef72`;
    const Fresponse = await fetch(url)
    const json = await Fresponse.json()
    response.json(json)
    console.log(json)



})