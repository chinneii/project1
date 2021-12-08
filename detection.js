accuracy = 10;
let plannedLocations = [];
let data;

retrieveLSData(LISTKEY)

function getLocation() {
    navigator.geolocation.getCurrentPosition(checker);
}
let interval = setInterval(getLocation, 5000);

function checker(position) {
    let long = position.coords.longitude;
    let lat = position.coords.latitude;
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
            //alert(`user has checked into ${savedLocation._trip[0][i].name} at ${time}`)
        checkedIn.innerHTML=`user has checked into ${savedLocation._trip[0][i]._name} at ${time}`
            savedLocation._trip.splice(i, 1)
        }
    }
}