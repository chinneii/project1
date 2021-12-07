accuracy = 0.001;
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

    let time = new Date(position.timestamp)


    for (let i in plannedLocations) {
        let longCheck = Math.abs(long - plannedLocations[i].long);
        let latCheck = math.abs(lat - plannedLocations[i].lat);
        if (longCheck < accuracy && latCheck < accuracy) {
            alert(`user has checked into ${plannedLocations[i].name} at ${time}`)
            plannedLocations.splice(i, 1)
        }
    }
}