// Storage Keys
const LISTKEY = "plannedlist"
const SAVED_LOCATIONS_KEY = "dhbiwjngmokbl";

//Class for all the points saved for the location
class Point {
    constructor(longitude = '', latitude = '', name = '', date = '') {
        this._name = name;
        this._longitude = longitude;
        this._latitude = latitude;
        this._date = date

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
    get date() {
        return this._date
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
    set date(newDate) {
        this._date = newDate;
    }

    fromData(data) {
        this._name = data.name;
        this._longitude = data.longitude;
        this._latitude = data.latitude;
        this._date = data.date;
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

let savedLocation = new PlannedTrip();
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

class Profile {
    constructor(name = "", age = "", id = "") {
        this._name = name;
        this._age = age;
        this._id = id;
    }
    get name() {
        return this._name;
    }
    get age() {
        return this._age;
    }
    get id() {
        return this._id;
    }
    set name(newName) {
        if (typeof newName == 'String') {
            this._name = newName;
        }
    }
    set age(newAge) {
        if (typeof newAge == 'number') {
            this._age = newAge;
        }
    }
    set id(newId) {
        this._id = newId
    }
    fromData(data) {
        this._id = data._id;
        this._name = data._name;
        this._age = data._age;
    }

}