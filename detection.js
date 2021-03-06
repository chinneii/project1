
accuracy = 0.01;
let plannedLocations = [];
let data;

function getLocation() {
    navigator.geolocation.getCurrentPosition(checker);
}

let interval = setInterval(getLocation, 5000);

function showAddress(data) {
    let currentAddress= data.results[0].formatted;
    
    updateLSData(CURRENT_ADDRESS_KEY,currentAddress)
    console.log(currentAddress)
}

let today = new Date();
let dd = String(today.getDate()).padStart(2, '0');
let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
let yyyy = today.getFullYear();

today = yyyy + '-' + mm + '-' + dd;

function checker(position) {
    console.log(position);
    let long = position.coords.longitude;
    let lat = position.coords.latitude;
    sendWebServiceRequestForReverseGeocoding(lat, long, 'showAddress')
    console.log(long)
    console.log(lat)
    let time = new Date(position.timestamp)

    for (let i = 0; i < savedLocation._trip[0].length; i++) {
        retrieveLSData(SAVED_LOCATIONS_KEY);
        let longCheck = Math.abs(long - savedLocation._trip[0][i]._longitude);
        let latCheck = Math.abs(lat - savedLocation._trip[0][i]._latitude);

        checkedIn = document.getElementById(`checkin${i}`)

        let link = document.getElementById(`link${i}`)
        if (longCheck < accuracy && latCheck < accuracy && today==savedLocation._trip[0][i]._date ) 
        {
            savedLocation._trip[0][i]._status='checkedin';
            updateLSData(SAVED_LOCATIONS_KEY, savedLocation)
        }

        if (savedLocation._trip[0][i]._status=='checkedin')
        {
            //change here for the id shit and stuff
            //alert(`user has checked into ${savedLocation._trip[0][i].name} at ${time}`)
            checkedIn.innerHTML = `<font  color="green"> user has checked into ${savedLocation._trip[0][i]._name} at ${time} </font>`
            link.innerHTML = `<font color="blue"><u>https:/thisisadummylink.com/id=?1&ja124sW</u></font>`
           // savedLocation._trip[0].splice(i, 1)
        }
    }
}
