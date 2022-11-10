"use strict";

/* Elementos que usamos en el HTML */
const newFormElement = document.querySelector(".js-new-form");
const listElement = document.querySelector(".js-list");
const searchButton = document.querySelector(".js-button-search");
const buttonAdd = document.querySelector(".js-btn-add");
const buttonCancelForm = document.querySelector(".js-btn-cancel");
const inputDesc = document.querySelector(".js-input-desc");
const inputPhoto = document.querySelector(".js-input-photo");
const inputName = document.querySelector(".js-input-name");
const linkNewFormElememt = document.querySelector(".js-button-new-form");
const labelMesageError = document.querySelector(".js-label-error");
const input_search_desc = document.querySelector(".js_in_search_desc");
const input_search_race = document.querySelector(".js_in_search_race");
const inputRace = document.querySelector(".js-input-race");

//Objetos con cada gatito
const kittenData_1 = {
  image: "https://ychef.files.bbci.co.uk/976x549/p07ryyyj.jpg",
  name: "Anastacio",
  desc: "Ruiseño, juguetón, le guta estar tranquilo y que nadie le moleste. Es una maravilla acariciarle!",
  race: "British Shorthair",
};
const kittenData_2 = {
  image:
    "https://media-cldnry.s-nbcnews.com/image/upload/t_nbcnews-fp-1200-630,f_auto,q_auto:best/newscms/2019_39/3021711/190923-cat-pet-stock-cs-1052a.jpg",
  name: "Fiona",
  desc: "Juguetón, le guta estar tranquilo y que nadie le moleste. Es una maravilla acariciarle!",
  race: "Callejero",
};
const kittenData_3 = {
  image:
    "https://images.emedicinehealth.com/images/article/main_image/cat-scratch-disease.jpg",
  name: "Cielo",
  desc: "Ruiseño, juguetón, le guta estar tranquilo y que nadie le moleste. Es una maravilla acariciarle!",
  race: "Europeo común",
};

/* let kittenDataList = [kittenData_1, kittenData_2, kittenData_3]; */

//Funciones
/* function renderKitten(kittenData) {
  const kitten = `<li class="card">
    <article>
      <img
        class="card_img"
        src=${kittenData.image}
        alt="gatito"
      />
      <h3 class="card_title">${kittenData.name}</h3>
      <h3 class="card_race">${kittenData.race}</h3>
      <p class="card_description">
      ${kittenData.desc}
      </p>
    </article>
    </li>`;
  return kitten;
} */

function renderKitten(kittenData) {
  
  const liElement = document.createElement("li");
  liElement.classList.add('card');
  const articleElement = document.createElement("article");
  const imgElem = document.createElement("img");
  const titleNameElement = document.createElement("h3");
  const titleRaceElement = document.createElement("h3");
  const descElement = document.createElement("p");

  const textNameElement = document.createTextNode(kittenData.name);
  const textRaceElement = document.createTextNode(kittenData.race);
  const textDescElement = document.createTextNode(kittenData.desc);
  imgElem.setAttribute("src", kittenData.image);
  imgElem.setAttribute("alt", "Imagen gatito");
  imgElem.classList.add('card_img');

  titleNameElement.appendChild(textNameElement);
  titleRaceElement.appendChild(textRaceElement);
  descElement.appendChild(textDescElement);

  articleElement.appendChild(imgElem);
  articleElement.appendChild(titleNameElement);
  articleElement.appendChild(titleRaceElement);
  articleElement.appendChild(descElement);

  liElement.appendChild(articleElement);
  console.log(liElement);
  const kitten = liElement;
  return kitten;
  

}

function renderKittenList(kittenDataList) {
  
  for (const kittenData of kittenDataList) {
    listElement.appendChild(renderKitten(kittenData));
   /*  listElement.innerHTML = renderKitten(kittenData); */
    console.log(kittenDataList);
  }
}

/* function renderKittenList(kittenDataList) {
  listElement.innerHTML = "";
  for (const kittenItem of kittenDataList) {
    listElement.innerHTML += renderKitten(kittenItem);
  }
} */

//Mostrar/ocultar el formulario
function showNewCatForm() {
  newFormElement.classList.remove("collapsed");
}
function hideNewCatForm() {
  newFormElement.classList.add("collapsed");
}

function handleClickNewCatForm(event) {
  event.preventDefault();
  if (newFormElement.classList.contains("collapsed")) {
    showNewCatForm();
  } else {
    hideNewCatForm();
  }
}
function resetNewKitten() {
  inputDesc.value = "";
  inputPhoto.value = "";
  inputName.value = "";
  inputRace.value = "";
}

//Adicionar nuevo gatito
/*
function addNewKitten(event) {
  event.preventDefault();
  const valueDesc = inputDesc.value;
  const valuePhoto = inputPhoto.value;
  const valueName = inputName.value;
  const valueRace = inputRace.value;
  
  if (valueDesc === '' && valuePhoto === '' && valueName === '') {
    labelMesageError.innerHTML = 'Debe rellenar todos los valores';
  } else {
    if (valueDesc !== '' && valuePhoto !== '' && valueName !== '') {
      labelMesageError.innerHTML = '';
    }
  }
  //2.11 Agregar un nuevo gatito al listado
  const newKittenDataObject = {
    image: valuePhoto,
    name: valueName,
    desc: valueDesc,
    race: valueRace,
  };
  kittenDataList.push(newKittenDataObject);
  console.dir(kittenDataList);
  renderKittenList(kittenDataList);
  resetNewKitten();
  labelMesageError.innerHTML = 'Mola! Un nuevo gatito en Adalab!';
}
*/

function addNewKitten(event) {
  event.preventDefault();
  const newDesc = inputDesc.value;
  const newPhoto = inputPhoto.value;
  const newName = inputName.value;
  const newRace = inputRace.value;

  if (newDesc === "" && newPhoto === "" && newName === "") {
    labelMesageError.innerHTML = "Debe rellenar todos los valores";
  } else {
    const newKittenDataObject = {
      image: newPhoto,
      name: newName,
      desc: newDesc,
      race: newRace,
    };

    fetch(`https://dev.adalab.es/api/kittens/${GITHUB_USER}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newKittenDataObject),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          //Completa y/o modifica el código:
          //Agrega el nuevo gatito al listado
          kittenDataList.push(newKittenDataObject);
          //Guarda el listado actualizado en el local stoarge
          localStorage.setItem("kittensList", JSON.stringify(kittenDataList));
          //Visualiza nuevamente el listado de gatitos
          renderKittenList(kittenDataList);
          //Limpia los valores de cada input
          resetNewKitten();
          labelMesageError.innerHTML = "Mola! Un nuevo gatito en Adalab!";
        } else {
          //muestra un mensaje de error.
          console.log("error");
        }
      });
  }
}

//2.11 Agregar un nuevo gatito al listado

//Cancelar la búsqueda de un gatito
function cancelNewKitten(event) {
  event.preventDefault();
  newFormElement.classList.add("collapsed");
  inputDesc.value = "";
  inputPhoto.value = "";
  inputName.value = "";
  inputRace.value = "";
}

//Filtrar por descripción
function filterKitten(event) {
  event.preventDefault();
  const descrSearchText = input_search_desc.value.toLowerCase();
  const raceSearchText = input_search_race.value.toLowerCase();
  listElement.innerHTML = "";

  const kittenFiltered = kittenDataList
    .filter((kittenItem) =>
      kittenItem.desc.toLowerCase().includes(descrSearchText)
    )
    .filter((kittenItem) =>
      kittenItem.race.toLowerCase().includes(raceSearchText)
    );

  console.log(kittenFiltered);

  for (const kittenItem of kittenFiltered) {
    listElement.innerHTML += renderKitten(kittenItem);
  }
}

//Mostrar el listado de gatitos en ell HTML
/* renderKittenList(kittenDataList); */

const GITHUB_USER = "CeciPeriquet";
const SERVER_URL = `https://dev.adalab.es/api/kittens/${GITHUB_USER}`;

let kittenDataList = [];
const kittenListStored = JSON.parse(localStorage.getItem("kittensList"));

if (kittenListStored !== null) {
  //si existe el listado de gatitos en el local storage
  // vuelve a pintar el listado de gatitos
  kittenDataList = kittenListStored;
  renderKittenList(kittenDataList);
} else {
  //sino existe el listado de gatitos en el local storage
  //haz la petición al servidor
  fetch(SERVER_URL, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  })
    .then((response) => response.json())
    .then((data) => {
      kittenDataList = data.results;
      localStorage.setItem("kittensList", JSON.stringify(kittenDataList));
      renderKittenList(kittenDataList);
    })
    .catch((error) => {
      console.error(error);
    });
}

//Eventos
linkNewFormElememt.addEventListener("click", handleClickNewCatForm);
searchButton.addEventListener("click", filterKitten);
buttonAdd.addEventListener("click", addNewKitten);
buttonCancelForm.addEventListener("click", cancelNewKitten);
