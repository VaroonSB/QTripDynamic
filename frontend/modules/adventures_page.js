import config from "../conf/index.js";

//Implementation to extract city from query params
function getCityFromURL(search) {
  // TODO: MODULE_ADVENTURES
  // 1. Extract the city id from the URL's Query Param and return it
  // console.log(search);
  const params = new URLSearchParams(search);
  // console.log(params.get('city'))
  return params.get('city');
}

//Implementation of fetch call with a paramterized input based on city
async function fetchAdventures(city) {
  // TODO: MODULE_ADVENTURES
  // 1. Fetch adventures using the Backend API and return the data
  // console.log(config.backendEndpoint + `/adventures?city=${city}`);
  try {
    let data = await fetch(config.backendEndpoint + `/adventures?city=${city}`);
    return await data.json();
  } catch (error) {
    return null;
  }
}

//Implementation of DOM manipulation to add adventures for the given city from list of adventures
function addAdventureToDOM(adventures) {
  // TODO: MODULE_ADVENTURES
  // 1. Populate the Adventure Cards and insert those details into the DOM
  adventures.forEach(element => {
    setToHTML(element.id, element.name, element.costPerHead, element.currency, element.image, element.duration, element.category);

  });
  function setToHTML(id, name, costPerHead, currency, image, duration, category) {
    let row_tag = document.getElementById('data');
    let dom_str = `
  <div class="col-lg-3 col-sm-6 col-6 mb-3">
    <a href="detail/?adventure=${id}" id="${id}">
      <div class="position-relative">
      <p class="category-banner">${category}</h4>
      <div class="activity-card mx-2">
        <img src="${image}" alt="${name}">
        <div class="card-body px-1 py-1">
          <div class="row ">
            <div class="col-lg-6 text-lg-start">
              <p>${name}</p>
            </div>
            <div class="col-lg-6 text-lg-end">
              <p>₹${costPerHead}</p>
            </div>
          </div>
          <div class="row">
            <div class="col-lg-6 text-lg-start">
              <p>Duration</p>
            </div>
            <div class="col-lg-6 text-lg-end">
            <p>${duration} hours</p>
            </div>
          </div>
        </div>
      </div>
      </div>
    </a>
  </div>
  `;
  row_tag.innerHTML += dom_str;
  }
  
}

//Implementation of filtering by duration which takes in a list of adventures, the lower bound and upper bound of duration and returns a filtered list of adventures.
function filterByDuration(list, low, high) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on Duration and return filtered list
  let res = [];
  list.forEach((ele) => {
    if(ele.duration >= low && ele.duration <= high){
      res.push(ele);
    }
  });
  return res;
}

//Implementation of filtering by category which takes in a list of adventures, list of categories to be filtered upon and returns a filtered list of adventures.
function filterByCategory(list, categoryList) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on their Category and return filtered list
  let res = []; 
  list.forEach((ele) => {
    if(categoryList.find((element) => {
      return element === ele.category;
    })){
      res.push(ele);
    }
  })
  // console.log(res);
  
  return res;
}

// filters object looks like this filters = { duration: "", category: [] };

//Implementation of combined filter function that covers the following cases :
// 1. Filter by duration only
// 2. Filter by category only
// 3. Filter by duration and category together

function filterFunction(list, filters) {
  // TODO: MODULE_FILTERS
  // 1. Handle the 3 cases detailed in the comments above and return the filtered list of adventures
  // 2. Depending on which filters are needed, invoke the filterByDuration() and/or filterByCategory() methods
  // console.log(filters['category'].length);
  // console.log(filters['category']);
  
  if(filters.hasOwnProperty('category') && filters['category'].length != 0 && filters['duration'].length == 0){
    let res = filterByCategory(list, filters.category);
    // console.log(res);
    return res;
  }
  if (filters.hasOwnProperty('duration') && filters['duration'].length != 0 && filters['category'].length == 0) {
    let low = filters['duration'].split('-')[0];
    let high = filters['duration'].split('-')[1];
    // console.log(low + high);
    let res = filterByDuration(list, low, high);
    return res;
  }
  if(filters['category'].length != 0 && filters['duration'].length != 0){
    let res1 = filterByCategory(list, filters.category);
    let low = filters['duration'].split('-')[0];
    let high = filters['duration'].split('-')[1];
    let res2 = filterByDuration(list, low, high);
    let res2_id = [];
    res2.forEach((ele) => {
      res2_id.push(ele.id);
    })
    // const filteredArray = array1.filter(value => array2.includes(value));
    let res = res1.filter((ele) => {
      return res2_id.includes(ele.id);
    });
    return res;
  }
  // Place holder for functionality to work in the Stubs
  return list;
}

//Implementation of localStorage API to save filters to local storage. This should get called everytime an onChange() happens in either of filter dropdowns
function saveFiltersToLocalStorage(filters) {
  // TODO: MODULE_FILTERS
  // 1. Store the filters as a String to localStorage
  localStorage.setItem('filters', JSON.stringify(filters));
  return true;
}

//Implementation of localStorage API to get filters from local storage. This should get called whenever the DOM is loaded.
function getFiltersFromLocalStorage() {
  // TODO: MODULE_FILTERS
  // 1. Get the filters from localStorage and return String read as an object
  return JSON.parse(localStorage.getItem('filters'));

  // Place holder for functionality to work in the Stubs
  // return null;
}

//Implementation of DOM manipulation to add the following filters to DOM :
// 1. Update duration filter with correct value
// 2. Update the category pills on the DOM

function generateFilterPillsAndUpdateDOM(filters) {
  // TODO: MODULE_FILTERS
  // 1. Use the filters given as input, update the Duration Filter value and Generate Category Pills
  document.getElementById("duration-select").value = filters.duration;
  let wrap_div = document.getElementById('category-list');
  filters.category.forEach((ele) => {
    wrap_div.innerHTML += `
    <div class="category-filter position-relative">
      ${ele}
    </div>
    `;
  });
}
export {
  getCityFromURL,
  fetchAdventures,
  addAdventureToDOM,
  filterByDuration,
  filterByCategory,
  filterFunction,
  saveFiltersToLocalStorage,
  getFiltersFromLocalStorage,
  generateFilterPillsAndUpdateDOM,
};
