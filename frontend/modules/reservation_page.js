import config from "../conf/index.js";

//Implementation of fetch call to fetch all reservations
async function fetchReservations() {
  // TODO: MODULE_RESERVATIONS
  // 1. Fetch Reservations by invoking the REST API and return them
  try {
    let data = await fetch(config.backendEndpoint + '/reservations/');
    return await data.json();
  } catch (error) {
    return null;
  }
  // Place holder for functionality to work in the Stubs
  // return null;
}

//Function to add reservations to the table. Also; in case of no reservations, display the no-reservation-banner, else hide it.
function addReservationToTable(reservations) {
  // TODO: MODULE_RESERVATIONS
  // 1. Add the Reservations to the HTML DOM so that they show up in the table

  //Conditionally render the no-reservation-banner and reservation-table-parent
  let banner = document.getElementById('no-reservation-banner');
  let table_parent = document.getElementById('reservation-table-parent');
  if(reservations.length == 0){
    banner.style.display = 'block'
    table_parent.style.display = 'none';
  }
  else{
    table_parent.style.display = 'block';
    banner.style.display = 'none';
    let tbody = document.getElementById('reservation-table');
    reservations.forEach((ele) => {
      let link = `../detail/?adventure=${ele.adventure}`;
      let date = ele.date.split('-');
      
      tbody.innerHTML += `
                          <tr>
                            <td scope="col"><b>${ele.id}</b></td>
                            <td scope="col">${ele.name}</td>
                            <td scope="col">${ele.adventureName}</td>
                            <td scope="col">${ele.person}</td>
                            <td scope="col">${new Date(ele.date).toLocaleDateString('en-IN')}</td>
                            <td scope="col">${ele.price}</td>
                            <td scope="col">${new Date(ele.time).toLocaleString('en-IN', {day: "numeric", month: "long", year: "numeric"})}, ${new Date(ele.time).toLocaleTimeString('en-IN')}</td>
                            <td scope="col"><button class="reservation-visit-button" id='${ele.id}'><a href=${`../detail/?adventure=${ele.adventure}`}>Visit Adventure</a></button></td>
                          </tr>
                          `
    });
  }
  
  /*
    Iterating over reservations, adding it to table (into div with class "reservation-table") and link it correctly to respective adventure
    The last column of the table should have a "Visit Adventure" button with id=<reservation-id>, class=reservation-visit-button and should link to respective adventure page

    Note:
    1. The date of adventure booking should appear in the format D/MM/YYYY (en-IN format) Example:  4/11/2020 denotes 4th November, 2020
    2. The booking time should appear in a format like 4 November 2020, 9:32:31 pm
  */
  
}

export { fetchReservations, addReservationToTable };
