// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

/* Middleware*/
const bodyParser = require('body-parser')
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');

app.use(cors())

// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
const port = 3000;

const server = app.listen(port, runServer);

function runServer (){
    console.log(`run on local server: ${port}`);
}

// Create a POST route

app.post('/addWeatherData',(req,res)=>{
    const newData = {
        temp: req.body.temp,
        desc: req.body.desc,
        cityName: req.body.cityName,
        date: req.body.date
    };

    projectData = newData;
    res.send(projectData);
    console.log(projectData);
})

app.get('/all', (req,res)=>{
    res.send(projectData)
})
