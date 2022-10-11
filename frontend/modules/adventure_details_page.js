import config from "../conf/index.js";

//Implementation to extract adventure ID from query params
function getAdventureIdFromURL(search) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Get the Adventure Id from the URL
  const params = new URLSearchParams(search);

  // Place holder for functionality to work in the Stubs
  return params.get("adventure");
}
//Implementation of fetch call with a paramterized input based on adventure ID
async function fetchAdventureDetails(adventureId) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Fetch the details of the adventure by making an API call
  try {
    let data = await fetch(
      config.backendEndpoint + `/adventures/detail?adventure=${adventureId}`
    );
    return await data.json();
  } catch (error) {
    return null;
  }

  // Place holder for functionality to work in the Stubs
  // return null;
}

//Implementation of DOM manipulation to add adventure details to DOM
function addAdventureDetailsToDOM(adventure) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the details of the adventure to the HTML DOM
  let name_tag = document.getElementById("adventure-name");
  name_tag.innerHTML = adventure.name;
  let subtitle_tag = document.getElementById("adventure-subtitle");
  subtitle_tag.innerHTML = adventure.subtitle;
  let photo_tag = document.getElementById("photo-gallery");
  adventure["images"].forEach((ele) => {
    photo_tag.innerHTML += `<div>
                    <img src="${ele}" alt="${adventure.name}" class="activity-card-image">
                </div>`;
  });
  let content_tag = document.getElementById("adventure-content");
  content_tag.innerHTML = adventure.content;
}

//Implementation of bootstrap gallery component
function addBootstrapPhotoGallery(images) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the bootstrap carousel to show the Adventure images
  let photo_tag = document.getElementById("photo-gallery");
  photo_tag.innerHTML = `
  <div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="carousel">
    <div class="carousel-indicators">
      <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
      <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
      <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
    </div>
    <div class="carousel-inner" id="inner">
    </div>
    <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Previous</span>
    </button>
    <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
      <span class="carousel-control-next-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Next</span>
    </button>
  </div>
  `;
  let inner_tag = document.getElementById("inner");
  let i = 0;
  images.forEach((ele, i) => {
    if (i == 0) {
      inner_tag.innerHTML += `<div class="carousel-item active">
                              <img src="${ele}" class="d-block w-100" alt="image" height="400px">
                            </div>`;
      i++;
    } else {
      inner_tag.innerHTML += `<div class="carousel-item">
                              <img src="${ele}" class="d-block w-100" alt="image" height="400px">
                            </div>`;
    }
  });
}

//Implementation of conditional rendering of DOM based on availability
function conditionalRenderingOfReservationPanel(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If the adventure is already reserved, display the sold-out message.
  let sold_out = document.getElementById("reservation-panel-sold-out");
  let reservation = document.getElementById("reservation-panel-available");
  if (adventure.available) {
    reservation.style.display = "block";
    sold_out.style.display = "none";
    let reserve_cost = document.getElementById("reservation-person-cost");
    reserve_cost.innerHTML = adventure.costPerHead;
  } else {
    sold_out.style.display = "block";
    reservation.style.display = "none";
  }
}

//Implementation of reservation cost calculation based on persons
function calculateReservationCostAndUpdateDOM(adventure, persons) {
  // TODO: MODULE_RESERVATIONS
  // 1. Calculate the cost based on number of persons and update the reservation-cost field
  let res = adventure.costPerHead * persons;
  let reserve_cost = document.getElementById("reservation-cost");
  reserve_cost.innerHTML = res;
}

//Implementation of reservation form submission
function captureFormSubmit(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. Capture the query details and make a POST API call using fetch() to make the reservation
  // 2. If the reservation is successful, show an alert with "Success!" and refresh the page. If the reservation fails, just show an alert with "Failed!".
  let form = document.getElementById("myForm");
  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    let data = {
      name: form.elements["name"].value,
      date: form.elements["date"].value,
      person: form.elements["person"].value,
      adventure: adventure.id,
    };
    let res = await fetch(config.backendEndpoint + "/reservations/new", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
    if (res) {
      alert("Success!");
      location.reload();
    } else {
      alert("Ffailed!");
    }
  });
}

//Implementation of success banner after reservation
function showBannerIfAlreadyReserved(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If user has already reserved this adventure, show the reserved-banner, else don't
  let reserved_banner = document.getElementById("reserved-banner");
  if (adventure.reserved) {
    reserved_banner.style.display = "block";
  } else {
    reserved_banner.style.display = "none";
  }
}

export {
  getAdventureIdFromURL,
  fetchAdventureDetails,
  addAdventureDetailsToDOM,
  addBootstrapPhotoGallery,
  conditionalRenderingOfReservationPanel,
  captureFormSubmit,
  calculateReservationCostAndUpdateDOM,
  showBannerIfAlreadyReserved,
};
