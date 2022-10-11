import config from "../conf/index.js";

async function init() {
  //Fetches list of all cities along with their images and description
  let cities = await fetchCities();
  console.log(config.backendEndpoint + '/cities');
  
  //Updates the DOM with the cities
  cities.forEach((key) => {
    addCityToDOM(key.id, key.city, key.description, key.image);
  });
}

//Implementation of fetch call
async function fetchCities() {
  // TODO: MODULE_CITIES
  // 1. Fetch cities using the Backend API and return the data
  try {
    let data = await fetch(config.backendEndpoint + '/cities');
    return await data.json();
  } catch (error) {
    return null;
  }
  let data = await fetch(config.backendEndpoint + '/cities');
  // console.log(await data.json());
  
}

//Implementation of DOM manipulation to add cities
function addCityToDOM(id, city, description, image) {
  // TODO: MODULE_CITIES
  // 1. Populate the City details and insert those details into the DOM
  // let col_div = document.createElement('div');
  // col_div.setAttribute('class', 'col');

  // let a_tag = document.createElement('a');
  // a_tag.setAttribute('href', `../pages/adventures/?city=${id}`);
  // a_tag.setAttribute('id', id);
  // let data_div = document.getElementById('data');
  // col_div.append(a_tag);
  // data_div.append(col_div)
  // let section_tag = document.createElement('section');
  // section_tag.setAttribute('class', 'tile');
  // a_tag.append(section_tag);
  
  // let img_tag = document.createElement('img');
  // img_tag.setAttribute('src', image);
  // img_tag.setAttribute('alt', city);
  // section_tag.append(img_tag);

  // let h3_tag = document.createElement('h3');
  // h3_tag.textContent = city;
  // h3_tag.setAttribute('class', 'tile-text');
  // section_tag.append(h3_tag);

  // let p_tag = document.createElement('p');
  // p_tag.textContent = description;
  // p_tag.setAttribute('class', 'tile-text');
  // section_tag.append(p_tag);
  let data_div = document.getElementById('data');
  let str = `
  <div class="col-12 col-sm-6 col-lg-3 mb-3">
    <a href="pages/adventures/?city=${id}" id="${id}">
      <section class="tile d-flex justify-content-center">
        <img src="${image}" alt="${city}" width="100%" height="410px">
        <h5 class="tile-text">${city}</h5>
        <p class="tile-caption">${description}</p>
      </section>
    </a>
  </div>
  `
  data_div.innerHTML += str;
}

export { init, fetchCities, addCityToDOM };
