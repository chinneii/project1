//Class for all the points saved for the location
class Point {
    constructor(longitude, latitude, name) {
        this._name = name;
        this._longitude = longitude;
        this._latitude = latitude;

    }
    get name() {
        return this._name;
    }
    get longitude() {
        return this._longitude;
    }
    get latitude() {
        return this._latitude;
    }
    set name(name) {
        this._name = name;
    }
    set longitude(longitude) {
        this._longitude = longitude;
    }
    set latitude(latitude) {
        this._latitude = latitude;
    }

    fromData(data) {
        this._name = data.name;
        this._longitude = data.longitude;
        this._latitude = data.latitude;
    }
}

accuracy = 0.001;
plannedLocations = [];



var x = document.getElementById("spot");

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(checker);
    } else {
        x.innerHTML = "Geolocation is not supported by this browser.";
    }
}
let interval = setInterval(getLocation, 5000);

function timeConverter(time) {

}

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