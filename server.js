const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');



//**Listen part**//
const port = 8008;

//setup empty object
let projectData = {};

//start an instance of app
const app = express();



//**Middleware**//
//configuring express to use body-parser as Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//cors for cross origin allowance
app.use(cors());

//initialize the main project folder
app.use(express.static('website'));

//setup our server
app.listen(port, () => {
    console.log(`Server Running On: http://localhost:${port}`);
});


//POST
app.post('/add', async function (req, res) {
    const body = await req.body;
    projectData = body;
    console.log(projectData);
    res.status(200).send(projectData);
});

//GET
app.get('/all', async (req, res) => {
    res.send(projectData);
});