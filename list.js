
savedLocation = retrieveLSData(SAVED_LOCATIONS_KEY);

function pageLoad() {
	let vacationList = document.getElementById("vacationList");
	let vacationListInnerHTML = "";
	for (let i in savedLocation) {
		vacationListInnerHTML += `
		<div class="mdl-cell mdl-cell--12-col mdl-cell--8-col-tablet mdl-cell--4-col-phone" >
								<h5>Plan ${Number(i) + 1} <button onclick="detail(${i})" class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect">More information </button> </h5>
								<div class="mdl-card">
									<div class="mdl-card__supporting-text">
										<b>Date:</b> ${savedLocation[i].date}
									</div>
									<div class="mdl-card__actions mdl-card--border">
									</div>
								</div>
							</div>	`
	}
	vacationList.innerHTML = vacationListInnerHTML;
}

pageLoad();
