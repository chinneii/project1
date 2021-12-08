
accuracy = 0.001;

var x = document.getElementById("spot");

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(checker);
    } else {
        x.innerHTML = "Geolocation is not supported by this browser.";
    }
}
let interval = setInterval(getLocation, 5000);
// function showPosition(position) {
//     x.innerHTML = "Latitude: " + position.coords.latitude +
//         "<br>Longitude: " + position.coords.longitude;
// }


function checker(position) {
    let long = position.coords.longitude;
    let lat = position.coords.latitude;
    console.log(long)
    console.log(lat)
    for (let i in plannedLocations) {
        let longCheck = Math.abs(long - plannedLocations[i].long);
        let latCheck = math.abs(lat - plannedLocations[i].lat);
        if (longCheck < accuracy && latCheck < accuracy) {
            alert("user has checked into the destined location")
            plannedLocations.splice(i, 1)
        } else {

        }
    }
}