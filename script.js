const COHORT = "2407-FTB-ET-WEB-FT";
const API_URL = `https://fsa-crud-2aa9294fe819.herokuapp.com/api/${COHORT}/events`;

const state = {
  parties: [],
};

const partiesList = document.querySelector("#parties");

const addPartyForm = document.querySelector("#addParty");
addPartyForm.addEventListener("submit", addParty);

//  sync state with API and rerender

async function render() {
  await getParties();
  renderParties();
}
render();

// Fetch is used correctly to GET party data from the API.

async function getParties() {
  try {
    const response = await fetch(API_URL);
    const json = await response.json();
    state.parties = json.data;
    console.log(state);
  } catch (error) {
    console.error(error);
  }
}

// Fetch is used correctly to POST a new party to the API.

async function addParty(event) {
  event.preventDefault();

  await createParty(
    addPartyForm.title.value,
    addPartyForm.date.value,
    // addPartyForm.time.value,
    addPartyForm.location.value,
    addPartyForm.description.value
  );
}

async function createParty(title, date, location, description) {
  try {
    console.log(title);
    console.log(date);
    
    console.log(location);
    console.log(description);
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: title, date: new Date(date), location, description }),
    });
    const json = await response.json();
    console.log(json);
  } catch (error) {
    console.error(error);
  }
}

// Fetch is used correctly to DELETE a party from the API.

async function deleteParty(id) {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });
  } catch (error) {
    if (!response.ok) {
      partiesList.innerHTML =
        /*html*/
        `<li>Party could not be deleted </li>`;
    }
  }
}

// render
function renderParties() {
  if (!state.parties.length) {
    partiesList.innerHTML =
      /*html*/
      `<li>No party found.</li>`;
    return;
  }
  const partyCards = state.parties.map((party) => {
    const partyCard = document.createElement("li");
    partyCard.classList.add("party");
    partyCard.innerHTML = /*html*/ `
      <h2>${party.title}</h2>
      <p>${party.date}</p>
      <p>${party.time}</p>
      <p>${party.location}</p>
      <p>${party.description}</p>
    `;

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete Party";
    partyCard.append(deleteButton);

    deleteButton.addEventListener("click", () => deleteParty(party.id));

    return partyCard;
  });
    partiesList.replaceChildren(...partyCards);

}


// }

// The app contains a list of the names, dates, times, locations, and descriptions of all parties.
// Each party in the list has a delete button which removes the party when clicked.
// The app contains a form that allows a user to enter information about a party and add it to the list.
// The DOM is dynamically rendered according to data stored in state.
// The data stored in state is updated to stay in sync with the API.
