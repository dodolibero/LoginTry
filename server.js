const { response, json, request } = require('express')
const express = require('express')
const fetch = require("node-fetch");
const schedule = require("node-schedule")
require("dotenv").config();
const apiKey = process.env.API_KEY

const d= new Date().getHours()



const Kcoord={
   lat : 45.279393577205305,
   lon : 10.64729690551758
};


const Datastore = require("nedb")
const database = new Datastore("database.db");
database.loadDatabase();



const app = express()
const port = process.env.PORT


app.listen(port, () => console.log(`Example app listening on port ${port}!`))
app.use(express.static("public"));
app.use(express.json( {limit: "1mb" } ));


/*
const cheack_time = schedule.scheduleJob('0-4-8-12-16-20 * * *',async()=>{
    const url=`https://api.openweathermap.org/data/2.5/weather?lat=${Kcoord.lat}&lon=${Kcoord.lon}&appid=${apiKey}`;

    const date= new Date().getHours()
    request = {"ora": Date.now().getHours() }
    record.insert(request.body)
 });    
*/

app.get("/weather/:lat/:lon",async (request,response)=>{
    
    const coord={
        "lat" : request.params.lat,
        "lon" : request.params.lon
    } 
    
    const url=`https://api.openweathermap.org/data/2.5/weather?lat=${Kcoord.lat}&lon=${Kcoord.lon}&appid=${apiKey}`;
    
    const Fresponse = await fetch(url)
    const json = await Fresponse.json()
    response.json(json)
    
    
    
    const quando = new Date().toUTCString()
    database.insert({"ora":quando,"dove":coord,"tempo":json})
    console.log(json)

})

app.get("/map_key", (request, response) => {
    console.log("api key sended");
    
    response.send(process.env.MAP_API)
});

app.get("/getdb", (request, response) => {
    console.log("sending DB :");
    database.find({},(err, data)=>{
        response.json(data) 
     })
});