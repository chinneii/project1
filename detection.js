accuracy = 0.001;
let plannedLocations = [];
let data;

retrieveLSData(LISTKEY)

function getLocation() {
    navigator.geolocation.getCurrentPosition(checker);
}
let interval = setInterval(getLocation, 5000);
let x = document.getElementById("spot");
let y = document.getElementById("spot1")

function checker(position) {
    let long = position.coords.longitude;
    let lat = position.coords.latitude;
    console.log(long)
    console.log(lat)
    let time = new Date(position.timestamp)
    x.innerHTML = `${long},${lat},${time}`

    for (let i in plannedLocations) {
        let longCheck = Math.abs(long - plannedLocations[i].long);
        let latCheck = Math.abs(lat - plannedLocations[i].lat);

        if (longCheck < accuracy && latCheck < accuracy) {
            console.log(1)
            alert(`user has checked into ${plannedLocations[i].name} at ${time}`)
            plannedLocations.splice(i, 1)
        } else {
            console.log(2)
            y.innerHTML = `No marked destinations reached`
        }
    }
}