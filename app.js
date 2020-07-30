require('dotenv').config()
const express = require("express");
const https = require("https");
const bodyParser  =require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({extended: true}))

app.get("/", function(req, res) {

  res.sendFile(__dirname + "/index.html");

});


app.post("/", function(req, res) {
  console.log(req.body.cityName)
  const query  = req.body.cityName;
  const apiKey  = process.env.API_KEY;
  const unit = "metric"
  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey +"&units=" + unit
  https.get(url, function(response){
    console.log(response.statusCode);
    response.on("data", function(data) {
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      const description = weatherData.weather[0].description;
      const icon = weatherData.weather[0].icon;
      const iconUrl = "https://openweathermap.org/img/wn/" + icon + "@2x.png"
      console.log(temp);
      console.log(description);
      res.write("<h1>" + query +" temp is " + temp + " degrees celcius </h1>");
      res.write("the weather is " + description);
      res.write("<img src='" + iconUrl +"'/>");
      res.send();
    })
  });


})








app.listen(3000, function(){
  console.log("server started at port 3000");
});
