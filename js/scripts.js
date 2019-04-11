/*
TREEHOUSE FS JAVASCRIPT PROJECT 5
PAT BARTON, 04/07/2019
*/

const url = "https://randomuser.me/api/?results=12&"; //random API url

//global variables to be manipulated locally within function starting on line 19
let eeTile;
let eeModal
let eeTilesArray = []
let eeModalArray = []
let myJson

fetch(url)                    //fetch API
  .then(function(response) {
    return response.json()    //returns JSON
  }).then(function(myJson) {  //from here below repeats 12 times so that data from 12 random employees are pulled from API
  for (let i=0;i<12; i++){
    //pulls necessart elements needed for Tile & Modal from JSON obkect
    eeImage = myJson.results[i].picture.large;    //all data points needed for employee tile and modal pulled
    eeEmail = myJson.results[i].email;
    eeStreet = myJson.results[i].location.street;
    eeCity = myJson.results[i].location.city;
    eeState = myJson.results[i].location.state;
    eeZip = myJson.results[i].location.postcode;
    eeFirstName = myJson.results[i].name.first;
    eeLastName = myJson.results[i].name.last;
    eePhone = myJson.results[i].cell;
      eeYear = myJson.results[i].dob.date.match(/[0-9]{4}/);      //regex for year/month/day
      eeMonth = myJson.results[i].dob.date.match(/[0-9]{2}/g)[2];
      eeDay = myJson.results[i].dob.date.match(/[0-9]{2}/g)[3];
    eeDOB = eeMonth + "/" + eeDay + "/" + eeYear;

    let gallery = document.querySelector("#gallery");
    eeTile = document.createElement('DIV');
    gallery.appendChild(eeTile);                        //creates & appends new DIV (the directory employee tile) to gallery

    //uses template literal to set HTML of the directory tile & interpolation to add in above employee data elements from API
    eeTile.innerHTML = `<div class="card">
          <div class="card-img-container">
              <img class="card-img" src= "${eeImage}" alt="profile picture">
          </div>
          <div class="card-info-container">
              <h3 id="name" class="card-name cap">${eeFirstName} ${eeLastName}</h3>
              <p class="card-text">${eeEmail}</p>
              <p class="card-text cap">${eeCity}, ${eeState}</p>
          </div>
      </div>`
      eeTilesArray.push(eeTile)   //employee directory tiles are pushed & stored into an array which is used later to sync
                                  //(cont.)accompanying employee modals.
      //lines 55 - 69 accompanying employee modals for each tile are created but not appended.
      eeModal = document.createElement('DIV')
      eeModal.innerHTML = `<div class="modal-container">
          <div class="modal">
              <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
              <div class="modal-info-container">
                  <img class="modal-img" src="${eeImage}" alt="profile picture">
                  <h3 id="name" class="modal-name cap">${eeFirstName} ${eeLastName}</h3>
                  <p class="modal-text">${eeEmail}</p>
                  <p class="modal-text cap">${eeCity}</p>
                  <hr>
                  <p class="modal-text">${eePhone}</p>
                  <p class="modal-text">${eeStreet}, ${eeCity}, OR ${eeZip}</p>
                  <p class="modal-text">Birthday: ${eeDOB}</p>
              </div>
          </div>`

        eeModalArray.push(eeModal)    //employee modals are pushed & stored in array whch is used later to add to corresponing
                                      //(cont.) employee tile when it is cilcked.

        eeTilesArray[i].addEventListener("click", (e) => {  //event listener is added to each employee tile for click
            eeTilesArray[i].parentNode.parentNode.appendChild(eeModalArray[i])    //now the modal is appended, upon click of tiles
                                                                                  //i index used to match the corresponding modal
            eeModalArray[i].style.display = "block";           //modal is visable when clicked as the event listener on line 75
                                                              //(cont.) hides the modal when the "X" out button is clicked
            eeModalArray[i].firstElementChild
                            .firstElementChild
                              .firstElementChild.addEventListener("click", () => {
                                  eeModalArray[i].style.display = "none"
                                })
                              })
      }})

      /*for loop on line 19 does executes all this 12 times, on each of the 12 users fetched from the API, creating &
          appending the employee tiles with data points, creating the employee modals with event listener
          to the tile so when clicked the modal is appended and visable, and closed when the x-out button clicked*/
