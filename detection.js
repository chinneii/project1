accuracy = 0.01;
let plannedLocations = [];
let data;
//let currentAddress="";

function getLocation() {
    navigator.geolocation.getCurrentPosition(checker);
}

let interval = setInterval(getLocation, 5000);

function showAddress(data) {
    //let startAddress = data.results[0].formatted;
    let currentAddress= data.results[0].formatted;
    
    updateLSData(CURRENT_ADDRESS_KEY,currentAddress)
    console.log(currentAddress)
}

function checker(position) {
    console.log(position);
    let long = position.coords.longitude;
    let lat = position.coords.latitude;
    sendWebServiceRequestForReverseGeocoding(lat, long, 'showAddress')
    console.log(retrieveLSData(CURRENT_ADDRESS_KEY));
    console.log(long)
    console.log(lat)
    let time = new Date(position.timestamp)

    for (let i = 0; i < savedLocation._trip[0].length; i++) {
        let longCheck = Math.abs(long - savedLocation._trip[0][i]._longitude);
        let latCheck = Math.abs(lat - savedLocation._trip[0][i]._latitude);
        console.log(longCheck)
        checkedIn=document.getElementById(`checkin${i}`)
        if (longCheck < accuracy && latCheck < accuracy) {
            //change here for the id shit and stuff
        checkedIn.innerHTML=`<font  color="green"> user has checked into ${savedLocation._trip[0][i]._name} at ${time} </font>`
            savedLocation._trip.splice(i, 1)
        }
    }
}