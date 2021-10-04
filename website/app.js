/* Global Variables */
const generate = document.getElementById('generate');
const zip = document.getElementById('zip');
const feelings = document.getElementById("feelings")
// Create a regular expression variable
const regx = /^\d{5}([-]|\s*)?(\d{4})?$/;
// API variables
const baseUrl = "https://api.openweathermap.org/data/2.5/weather?zip=";
const apiKey = "&appid=a39ca5bd5bc845f48f5df7f643ebe4db&units=metric";
// Absolute url
const absoluteUrl = "http://localhost:3000"

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getDate()+'/'+(d.getMonth()+1)+'/'+d.getFullYear();

// Start healper functions

// Check the value of the zip input
function validateZip(){
    if(regx.test(zip.value)){
        return true
    }else{
        return false
    }
}

// End helper functions

// Start main functions
// TO DO
// 1- Create a function to get data from API
const geatWeatherData = async (url='')=>{
    const request = await fetch(url);
    if(!(request.status === 200)){
        alert("City not found")
    }
    try {
        const data = await request.json();
        return data
    } catch (error) {
        console.log('error', error);
    }
}

// 2- Create a POST function to send the data to server side
const postWeatherData = async (url='', data='')=>{
    const response = await fetch(url,{
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(data)
    });

    try {
        const newData = await response.json();
        return newData;
    } catch (error) {
        console.log('error', error);
    }
}

// 3- Create a function to update the UI

const updateUi = async (url)=>{
    // Get elements to ubdate
    const temp = document.getElementById('temp');
    const status = document.getElementById('status');
    const cityName = document.getElementById('city-name');
    const date = document.getElementById('date');
    const content = document.querySelector('.content');

    const entryHolder = document.querySelector('.entryHolder');

    const request = await fetch(url);
    console.log(request);
    try {
        const data = await request.json();
        console.log(data);
        temp.innerHTML = data.temp;
        status.innerHTML = data.desc;
        cityName.innerHTML = data.cityName;
        date.innerHTML = data.date;
        content.innerHTML = feelings.value;

        entryHolder.style.transform = "translateY(0)"
        return data
    } catch (error) {
        console.log('error', error);
    }
}

// Handel all functions on click
function perfomAction(e){
    e.preventDefault()
    if(validateZip()){
        geatWeatherData(baseUrl+zip.value+apiKey)
        .then((data)=>{
            postWeatherData(`${absoluteUrl}/addWeatherData`, {
                temp: data.main.temp,
                desc: data.weather[0].description,
                cityName: data.name,
                date: newDate
            });
            updateUi(`${absoluteUrl}/all`)
        })
    }else{
        alert("Please enter a vaild zip code")
    }
}

// End main functions

// Add event listners
generate.addEventListener('click', perfomAction)