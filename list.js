const MAPBOX_KEY = "pk.eyJ1IjoiZmx1b3J5eW54IiwiYSI6ImNrdGQ3cTk4MDI2ZXIydnBjcGN6dmd6czMifQ.BkiIeD2HP_SDraF8qMy3qQ";
const OPENCAGE_KEY = "88e2b03df71b4f9b85c4f9e549503b1e";
savedLocation = retrieveLSData(SAVED_LOCATIONS_KEY);
let currentAddress2=retrieveLSData(CURRENT_ADDRESS_KEY);
function pageLoad() {
	let vacationList = document.getElementById("vacationList");
	let vacationListInnerHTML = "";
	for (let i in savedLocation._trip) {

        let display2 = "";
        let itemTable2 = `
              <table class="locationsTable" style=width:200px>
              <tr>
              <th>No.</th>
              <th>Name of location</th>
              <th>Latitude</th>
              <th>Longitude</th>
              <th>Checked in? </th>
              </tr> `;
        for (let j = 0; j < savedLocation._trip[i].length; j++) {
            itemTable2 += "<tr>";
            itemTable2 += `<td>${j+1}</td>
                  <td>${savedLocation._trip[i][j]._name}</td>
                  <td>${savedLocation._trip[i][j]._latitude}</td>
                  <td>${savedLocation._trip[i][j]._longitude}</td>
                  <td></td>
                  <td id="checkin${j}"> 
                   </td>
                  </tr>`
        }
        itemTable2 += "</table>";
        display2 += `${itemTable2}`;

		vacationListInnerHTML += `
		<div class="mdl-cell mdl-cell--12-col mdl-cell--8-col-tablet mdl-cell--4-col-phone" >
								<h5>Current location: ${currentAddress2} </h5>
								<div class="mdl-card">
									<div class="mdl-card__supporting-text">
										<b>Date: ${savedLocation._trip[i][i]._date}
                                        <b>${itemTable2}
									</div>
									<div class="mdl-card__actions mdl-card--border">
									</div>
								</div>
							</div>	`
	}
	vacationList.innerHTML = vacationListInnerHTML;
}

pageLoad();
