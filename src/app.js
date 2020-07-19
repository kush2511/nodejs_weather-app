//Require all here
const path = require('path');
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();

//Customize/Change directory 
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views")
const partialsPath = path.join(__dirname, "../templates/partials")

//to tell express to use above directory
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

//to show static content
app.use(express.static(publicDirectoryPath));

//All paths here
app.get("/", (req, res)=>{
    res.render("index", {title: "Weather"});
});

app.get("/about", (req, res)=>{
    res.render("about", {title: "About us"});
});

app.get("/help", (req,res)=>{
    res.render("help", {title: "Help",message: "You need a little help..??"})
});

app.get("/weather", (req,res)=>{
    const address = req.query.address;
    if(!address){
        return res.send({ error : "Please enter location."});
    }
    geocode(address, (error, {longitude, latitude, location} = {}) => {
        if(error){
           return res.send({error});
        } 
        forecast(latitude, longitude, (error, forecastData) => {
            if(error){
              return read.send({error});
            }
                res.send({
                    forecast : forecastData,
                    location,
                    address
                })
          });
    });
})

app.get("/help/*", (req, res)=>{
    res.render("error", {title: "404", message: "Help article not found!"});
});

app.get("*", (req, res)=>{
    res.render("error", {title: "404",message: "Page not found!"});
});

app.listen(3000, ()=> {
    console.log("Server is started..!");
})