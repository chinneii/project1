// Storage Keys
const LISTKEY = "plannedlist"


//Class for all the points saved for the location
class Point {
    constructor(longitude = '', latitude = '', name = '') {
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

class PlannedTrip {
    constructor() {
        this._trip = [];
    }
    get trip() {
        return this._trip;
    }
    point(newPoint) {
        this._trip.push(newPoint)
    }
    fromData(data) {
        for (let i in data.trip) {
            let point = new Point();
            point.fromData(data.trip[i])
            this._trip.push(point)
        }
    }
}
/**
 * checkLSData function
 * Used to check if any data in LS exists at a specific key
 * @param {string} key LS Key to be used
 * @returns true or false representing if data exists at key in LS
 */
function checkLSData(key) {
    if (localStorage.getItem(key) != null) {
        return true;
    }
    return false;
}

/**
 * retrieveLSData function
 * Used to retrieve data from LS at a specific key. 
 * @param {string} key LS Key to be used
 * @returns data from LS in JS format
 */
function retrieveLSData(key) {
    let data = localStorage.getItem(key);
    try {
        data = JSON.parse(data);
    } catch (err) {} finally {
        return data;
    }
}

/**
 * updateLSData function
 * Used to store JS data in LS at a specific key
 * @param {string} key LS key to be used
 * @param {any} data data to be stored
 */
function updateLSData(key, data) {
    let json = JSON.stringify(data);
    localStorage.setItem(key, json);
}