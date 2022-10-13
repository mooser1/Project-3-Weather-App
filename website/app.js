/* Global Variables */

// Personal API Key for OpenWeatherMap API
const baseUrl = 'https://api.openweathermap.org/data/2.5/weather?';
const apiKey = 'd6158a73dcefb0e94b4ac0af2b27790c&units=imperial';

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getDate() + '.' + (d.getMonth() + 1) + '.' + d.getFullYear();
//
let zip = ''; //Default (Melrose Place)
//let feeling = '';
//Event Listeners
document.getElementById('generate').addEventListener('click', performAction);

//Helper Functions
function weatherUrl(){
    return baseUrl + 'zip=' + zip + '&appid=' + apiKey;
}

//Main Functions

//Async GET
const getData = async (url='') =>{
    const req = await fetch(url);
    try {
        const newData = await req.json();
        return newData;
    }
    catch(error) {
        console.log('error', error);
    }
}

//Async POST
const postData = async ( url = '', data = {})=>{
    const res = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    try {
        const newData = await res.json();
        return newData;
    }
    catch (error){
        console.log('error', error);
    }
}

//Callback Function
function performAction(){
    const feeling = document.getElementById('feelings').value;
    const zipCode = document.getElementById('zip').value;
    if (zipCode !== ''){
        zip = zipCode;
    }
    if (zipCode == ''){
        window.alert("PLEASE ENTER YOUR ZIP CODE");
    }
    if (feeling == ''){
        window.alert("PLEASE SAY HOW YOU'RE FEELING TODAY");
    }
    getData(weatherUrl())
    .then(function(data){
        //console.log(data);
        postData('/add', {zip_code: zipCode, temperature: data.main.temp, date: newDate, userResponse: feeling})
    })
    .then(
        updateUI
    )
}

//Dynamically Update the UI
async function updateUI() {
    const req = await fetch('/all');
    try {
        const allData = await req.json();
        const lastIndex = allData.length - 1;
        //console.log(allData);
        document.getElementById('date').innerHTML = "Today's Date: " + allData[lastIndex].date;
        document.getElementById('location').innerHTML = "Location: " + allData[lastIndex].zip_code;
        document.getElementById('temp').innerHTML = "Temperature: " + Math.round(allData[lastIndex].temperature) + ' ' + 'degrees';
        document.getElementById('content').innerHTML = "How are you felling today?: " + allData[lastIndex].userResponse;
    }
    catch (error) {
        console.log("error", error);
    }
}