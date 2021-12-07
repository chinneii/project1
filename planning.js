const MAPBOX_KEY = "pk.eyJ1IjoiZmx1b3J5eW54IiwiYSI6ImNrdGQ3cTk4MDI2ZXIydnBjcGN6dmd6czMifQ.BkiIeD2HP_SDraF8qMy3qQ";
const OPENCAGE_KEY = "88e2b03df71b4f9b85c4f9e549503b1e";

mapboxgl.accessToken = MAPBOX_KEY;

marker = new mapboxgl.Marker({
    draggable: true
})

//display map
map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [144.9648731, -37.8182711],
    zoom: 13
})
map.addControl(new mapboxgl.NavigationControl());

function search() {
    let address = document.getElementById("searchAddress").value;
    if (address === "") {
      alert("please enter a location!");
      return;
    }
    else {
      sendWebServiceRequestForForwardGeocoding(address, "showLngLat");
    }
  }
  let tempArraySearch = []

  function showLngLat(data) {
    let lat = data.results[0].geometry.lat;
    let lng = data.results[0].geometry.lng;
    map.setCenter([lng, lat]);
  
    let marker = new mapboxgl.Marker();
    marker.setLngLat([lng, lat]);
    marker.addTo(map);
  
    let poiType = data.results[0].components._type;
    let poiAddressName = data.results[0].components[poiType];
    let poiAddress = data.results[0].formatted;
    let poiAddressLat = lat;
    let poiAddressLng = lng;
    let poiCoordinate = [poiAddressLng, poiAddressLat];
  
    let poiLocation = new Point(poiAddressLat,poiAddressLng,poiAddressName);
    tempArraySearch.push(poiLocation)
  
    let popup = new mapboxgl.Popup({ offset: 45 });
    popup.setHTML(`Name: ${poiAddressName} <br> Address: ${poiAddress}`);
    // Attach the popup to the marker
    marker.setPopup(popup);
    // Add the popup to the map
    popup.addTo(map);
  }

  function displayTable() {
    let poiListRef = document.getElementById("PoiList");
    let display = "";
    let itemTable = `
          <table class="mdl-data-table mdl-js-data-table" style=width:200px>
          <tr>
          <th>No.</th>
          <th>POI address</th>
          <th>Actions</th>
          </tr> `;
    for (let i = 1; i < plannedLocations.length; i++) {
      itemTable += "<tr>";
      itemTable += `<td>${i}</td>
              <td>${plannedLocations[i].name}</td>
              <td> <button class="mdl-button mdl-js-button mdl-button--icon mdl-button--colored" onclick=deletePOI(${i})>  <i class="material-icons">delete</i> </button>
               </td>
              </tr>`
    }
    itemTable += "</table>";
    display += `${itemTable}`;
    poiListRef.innerHTML = display;
  }

  function newPOI2() {
    //let coordinate = tempArraySearch[tempArraySearch.length - 1].locationCoordinate
    let marker = new mapboxgl.Marker()
    marker.setLngLat(tempArraySearch.poiAddressLat,tempArraySearch.poiAddressLng)
    marker.addTo(map)
    let popup = new mapboxgl.Popup({ offset: 45 });
    plannedLocations.push(tempArraySearch[tempArraySearch.length - 1])
  
    popup.setHTML(`Name: ${tempArraySearch[tempArraySearch.length - 1].name}`)
    marker.setPopup(popup);
    temparray = [];
    tempArraySearch = [];
    displayTable();
  }
  
//delete poi
let deleteIndex = 0

/**
 * deletePOI function
 * runs when the user clicks the delete icon
 * use to remove POI from the list 
 * @param {*} index 
 */
function deletePOI(index) {
  deleteIndex = index
  plannedLocations.splice(index, 1);
  displayTable()
}


function cancelPlan() {
    if (confirm(`By clicking this, your progress will not be saved and you will be directed back to the home page. Are you sure you want to cancel? `)) {
      window.location = "home.html"
    }
  }


  function confirmSaveVacation() {
    if (plannedLocations.length == 1) {
      alert('Your POI list is empty. Please click cancel and add at least one POI to the list.')
      return
    } 
    let vacationDateRef = document.getElementById("vacationDate");
    let vacationDate = vacationDateRef.value;
  
    vacation.vacationDate = vacationDate;
    if(vacation.vacationDate==""){
      alert('date must be filled in')
      return
    }
    if (confirm(`Clicking this will save your planned location and direct you to List of Planned Vacation page. Are you sure you want to save and continue? `)) {
      plannedVacation.allPlan.push(vacation)
      console.log(plannedVacation)
      updateLSData(KEY, plannedVacation)
      dialog2.close()
      window.location = "list.html"
    }
  }