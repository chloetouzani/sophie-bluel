"use strict";

// ******************** CONSTANTS ********************
const backEnd = await fetch("http://localhost:5678/api/works");
const works 	= await backEnd.json();

const userToken = window.localStorage.getItem("token");

const objectsButton = document.querySelector(".object-btn");
const allButton     = document.querySelector(".all-btn");
const apartButton   = document.querySelector(".apart-btn");
const hotelsButton  = document.querySelector(".hotels-btn");
const editGallery   = document.querySelector(".edit-gallery");

// ******************** VARIABLES ********************

// ******************** FUNCTIONS ********************

/**
 * Generates and appends HTML elements for a list of works.
 *
 * @param {Array} works - An array of work objects.
 */
function generateWorks (works) {
  for (let i = 0; i < works.length; i++) {
    const worksDiv    = document.querySelector(".gallery");
    const figure      = document.createElement("figure");
    const img         = document.createElement("img");
    const figcaption  = document.createElement("figcaption");

    img.src               = works[i].imageUrl;
    img.alt               = works[i].title;
    figcaption.innerText  = works[i].title;

    worksDiv.appendChild(figure);
    figure.appendChild(img);
    figure.appendChild(figcaption);

    console.log(works[i]);
  }
}

/**
 * Displays all categories on the gallery page.
 *
 * @param {Array} works - The array of works to generate.
 */
function showAllCategories(works) {
  document.querySelector(".gallery").innerHTML = "";
  generateWorks(works);
}

/**
 * Filters the given array of works and displays the filtered objects in the gallery.
 *
 * @param {Array} works - The array of works to be filtered.
 * @return {Boolean} - True if the filter was successful, false otherwise.
 */
function showObjectsCategory(works) {
  const filteredObjects = works.filter((work) => {

    return work.category.name === "Objets";
  })

  document.querySelector(".gallery").innerHTML = "";
  generateWorks(filteredObjects);
}

/**
 * Filters the given array of works and displays the filtered results in the gallery.
 *
 * @param {Array} works - The array of works to filter.
 * @return {Boolean} - True if the filter was successful, false otherwise.
 */
function showApartsCategory(works) {
  const filteredApart = works.filter ((work) => {

    return work.category.name === "Appartements";
  })

  document.querySelector(".gallery").innerHTML = "";
  generateWorks(filteredApart);
}

/**
 * Filters the given array of works to only include works with the category "Hotels & restaurants",
 * and generates the corresponding HTML elements to display them in the gallery.
 *
 * @param {Array} works - The array of works to filter.
 * @return {Boolean} - True if the filter was successful, false otherwise.
 */
function showHotelsCategory(works) {
  const filteredHotels = works.filter( (works) => {

    return works.category.name === "Hotels & restaurants";
  })
  
  document.querySelector(".gallery").innerHTML = "";
  generateWorks(filteredHotels);
}

/**
 * Adds event listeners to buttons and calls corresponding functions.
 *
 * @param {Array} works - An array of works.
 */
function addListeners(works) {
  allButton.addEventListener("click", () => {
    showAllCategories(works);
  })

  objectsButton.addEventListener("click", () => {
    showObjectsCategory(works);
  })

  apartButton.addEventListener("click", () => {
    showApartsCategory(works);
  })

  hotelsButton.addEventListener("click", () => {
    showHotelsCategory(works);
})}

function removeHidden() {
  if(userToken !== null) {
    document.querySelector("#modify-btn").classList.remove("hidden");
    document.querySelector("#editor").classList.remove("hidden")
    document.querySelector("header").classList.add("margin-top-109");
  }
}

function modifyGallery() {
  const modifyButton = document.querySelector("#modify-btn");
  const crossButton  = document.querySelectorAll("fa-xmark");
  modifyButton.addEventListener("click", () => {
    document.querySelector("#modify").classList.remove("hidden");
  })
  crossButton.addEventListener("click", () => {
    document.querySelector("#modify").classList.add("hidden");
  })
}

function generateGalleryModified(){
  for (let i = 0; i < works.length; i++) {
    const figure      = document.createElement("figure");
    const img         = document.createElement("img");
    const trashImg    = document.createElement("i");

    img.src               = works[i].imageUrl;
    img.alt               = works[i].title;
    img.id                = works[i].id;

    trashImg.innerHTML          = "<i class=\"fa-solid fa-trash-can\"></i>";

    editGallery.appendChild(figure);
    figure.appendChild(img);
    figure.appendChild(trashImg);
  }
}

function deleteWork() {
  const deletedWork = document.querySelector(".edit-gallery");
  deletedWork.addEventListener("click", (event) => {
    event.preventDefault();
    const workID = event.target.id;
    console.log(workID);

    fetch(`http://localhost:5678/api/works/${workID}`, 
    {method: "DELETE",
    headers: {
      "Authorization": `Bearer ${userToken}`
    }}).then ((response) => {
      if(response === 200) {
        console.log("Work deleted");
      }
    })
  })
}

function addWork() {
  const addBtn = document.querySelector("#popup button");
  const addPicture = document.querySelector("#add-picture");
  addBtn.addEventListener("click", (event) => {
    popup.classList.add("hidden");
    addPicture.classList.remove("hidden");
  })
}
// ******************** MAIN ********************

generateWorks(works);
addListeners(works);
generateGalleryModified(works);
deleteWork(works);
removeHidden();
modifyGallery();
addWork();
