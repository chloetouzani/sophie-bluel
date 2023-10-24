"use strict";

// ******************** CONSTANTS ********************
const backEnd = await fetch("http://localhost:5678/api/works");
const works 	= await backEnd.json();

const objectsButton = document.querySelector(".object-btn");
const allButton     = document.querySelector(".all-btn");
const ApartButton   = document.querySelector(".Apart-btn");
const HotelsButton  = document.querySelector(".Hotels-btn");

console.log(works);
// ******************** VARIABLES ********************

// ******************** FUNCTIONS ********************
function generateWorks (works) {
  for (let i = 0; i < works.length; i++) {
    const worksDiv    = document.querySelector(".gallery");
    const FIGURE      = document.createElement("figure");
    const IMG         = document.createElement("img");
    const FIGCAPTION  = document.createElement("figcaption");

    IMG.src               = works[i].imageUrl;
    IMG.alt               = works[i].title;
    FIGCAPTION.innerText  = works[i].title;

    worksDiv.appendChild(FIGURE);
    FIGURE.appendChild(IMG);
    FIGURE.appendChild(FIGCAPTION);
  }
}

function filters (works) {
  allButton.addEventListener("click", () => {
    document.querySelector(".gallery").innerHTML = "";
    generateWorks(works);
  })

  objectsButton.addEventListener("click", () => {
    const filteredObjects = works.filter((work) => {
      return work.category.name === "Objets";
    })
    document.querySelector(".gallery").innerHTML = "";
    generateWorks(filteredObjects);
  })

  ApartButton.addEventListener("click", () => {
    const filteredApart = works.filter ((work) => {
      return work.category.name === "Appartements";
    })
    document.querySelector(".gallery").innerHTML = "";
    generateWorks(filteredApart);
  })

  HotelsButton.addEventListener("click", () => {
    const filteredHotels = works.filter( (works) => {
      return works.category.name === "Hotels & restaurants";
    })
    document.querySelector(".gallery").innerHTML = "";
    generateWorks(filteredHotels);
})}
// ******************** MAIN ********************
generateWorks(works);
filters(works);
