const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended:true}));


app.get("/",function(req,res){
    res.sendFile(__dirname+"/index.html");
})

app.post("/",function(req,res){
    const queary = req.body.CityName;
    const apiKey = "5bb53357db3a30af89837317fce50557";
    const unite = "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+queary+"&units="+unite+"&appid="+apiKey;

    https.get(url, function(response){
        console.log(response.statusCode);

        response.on("data",function(data){
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const weatherDescription = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const imageurl =  "http://openweathermap.org/img/wn/"+icon+"@2x.png";
            res.write("<p>the weather condition is: "+weatherDescription+ "<p>");
            res.write("<h1>the temperature in "+queary+" is: "+temp+" degree Celcius</h1>");
            res.write("<img src="+imageurl+">");
            res.send()
        })
    })
})



app.listen(3000,function(){
    console.log("Server is running on port 3000.");

})