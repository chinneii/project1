// Storage Keys
const LISTKEY = "plannedlist"
const SAVED_LOCATIONS_KEY = "dhbiwjngmokbl";
const CURRENT_ADDRESS_KEY = "gvubhijnk";

const USERLIST_DATA_KEY = "userListLocalData";
const USER_DATA_KEY = "userLocalData";
const USER_INDEX_KEY = "selectedUserIndex";

//Class for all the points saved for the location
class Point {
    constructor(longitude = '', latitude = '', name = '', date = '',status='') {
        this._name = name;
        this._longitude = longitude;
        this._latitude = latitude;
        this._date = date;
        this._status=status;

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
        return this._date;
    }
    get status(){
        return this._status;
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
    set status(newStatus){
        this._status=newStatus;
    }

    fromData(data) {
        this._name = data.name;
        this._longitude = data.longitude;
        this._latitude = data.latitude;
        this._date = data.date;
        this._status=data.status;
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

class User {
    constructor(id, username, password) {
        this._id = id;
        this._username = username;
        this.password = password;
    }

    get id() {
        return this._id;
    }

    get username() {
        return this._username;
    }

    get password() {
        return this._password;
    }

    set username(username) {
        this._username = username;
    }

    set password(password) {
        this._password = password;
    }

    fromData(data) {
        this._id = data._id;
        this._username = data._username;
        this._password = data._password;
    }

}


class UserList {
   // Constructor
   constructor() {
       // Private attributes
       this._users = [];
   }

   // Accessors
   get users() {
       return this._users;
   }
   get count() {
       return this._users.length;
   }

   // Methods
   addUser(id, username, password) {
       let user = new User(id, username, password);
       this._users.push(user);
   }

   getUser(index) {
       return this._users[index];
   }

   fromData(data) {
       this._users = [];
       for (let i = 0; i < data._users.length; i++) {
           let user = new User();
           user.fromData(data._users[i]);
           this._users.push(user);
       }
   }
}

function checkForLocalStorage(key) {
   let data = localStorage.getItem(key);
   if (data !== null && data !== undefined && data !== ""){
       return true
   }
   else{
       return false
   }
}

function updateLocalStorage(key, data) {
    let dataString = JSON.stringify(data)
    localStorage.setItem(key, dataString)
}

function getDataLocalStorage(key) {
    let retrievedData = localStorage.getItem(key)
    let dataObject;
    try{
        dataObject = JSON.parse(retrievedData)
    }
    catch(e){
        console.log(e)
    }
    finally{
        return dataObject;
    }
}

let userList = new UserList();


if (typeof Storage !== "undefined")
{
   console.log("localStorage is available.");
   if (checkForLocalStorage(USERLIST_DATA_KEY)){
       let data = getDataLocalStorage(USERLIST_DATA_KEY)
       userList.fromData(data)
   }
   else{
       let newId = "001"
       userList.addUser(userId, "anonymous user", "")
       updateLocalStorage(USERLIST_DATA_KEY, userList)
   }

   if (!checkForLocalStorage(USER_INDEX_KEY)){
       let index = 0;
       updateLocalStorage(USER_INDEX_KEY, index)
   }

}
else
{
   console.log("localStorage is not supported by current browser.");
}