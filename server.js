const { response } = require('express')
const express = require('express')
const fetch = require("node-fetch")
require("dotenv").config();

const Datastore = require("nedb")
const database = new Datastore("database.db");
database.loadDatabase();

const app = express()
const port = process.env.PORT


app.listen(port, () => console.log(`Example app listening on port ${port}!`))
app.use(express.static("public"));
app.use(express.json( {limit: "1mb" } ));


app.get("/weather/:lat/:lon",async (request,response)=>{
    
    const lat = request.params.lat
    const lon = request.params.lon
    const apiKey = process.env.API_KEY
    const url=`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`;
    const Fresponse = await fetch(url)
    const json = await Fresponse.json()
    response.json(json)
    const quando = new Date().toString();
    database.insert({"ora":quando,"tempo":json})
    console.log(json)



})