// Setup empty JS object to act as endpoint for all routes
projectData = [];

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

const bodyParser = require('body-parser');
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

// Setup Server
const port = 3000;
const server = app.listen(port, listening);
function listening(){
    console.log('server');
    console.log(`running on localhost: ${port}`);
}

//GET route
app.get('/all', function(req, res){
    res.send(projectData);
})

//POST route
app.post('/add', function(req, res){
    try{
        const data = {
            zip_code: req.body.zip_code,
            temperature: req.body.temperature,
            date: req.body.date,
            userResponse: req.body.userResponse,
        }
        projectData.push(data)
        console.log(data)
    }catch (error){
        console.log("Error: ", error)
    }
})