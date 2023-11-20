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
const modifyPopup   = document.querySelector("main article");
const loginLink     = document.querySelector("#loginLink")

const popup           = document.createElement("section");
const crossButton     = document.createElement("i");
const backArrowButton = document.createElement("i");
const buttons         = document.createElement("nav");
const popupTitle      = document.createElement("h2");
const mainText        = document.createElement("div");
const modifyBtn       = document.createElement("button");

const formAddPicture          = document.createElement("form");
const fieldsetImg     = document.createElement("fieldset");
const imgPreview      = document.createElement("img");

// ******************** VARIABLES ********************
let isGalleryModified = false;
let isPictureForm     = false;
// ******************** FUNCTIONS ********************

  //**** HTML GENERATION FUNCTIONS ****\\
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

  }
}

function generateModifyPopup() {
  mainText.classList.add("edit-gallery");
  popup.classList.add("popup");

  crossButton.innerHTML   = "<i class=\"fa-solid fa-xmark fa-lg\"></i>";
  backArrowButton.innerHTML = "<i class=\"fa-solid fa-arrow-left\"></i>";
  popupTitle.innerText    = "Galerie photo";
  modifyBtn.innerText = "Ajouter une photo";

  backArrowButton.id = "back-arrow";
  backArrowButton.classList.add("hidden");

  modifyPopup.appendChild(popup);
  popup.appendChild(buttons);
  buttons.appendChild(backArrowButton);
  buttons.appendChild(crossButton);
  popup.appendChild(popupTitle);
  popup.appendChild(mainText);
  popup.appendChild(modifyBtn);
}

function generateGalleryModified(){
  for (let i = 0; i < works.length; i++) {
    const modifyGallery = document.querySelector(".edit-gallery");
    const figure        = document.createElement("figure");
    const img           = document.createElement("img");
    const trashImg      = document.createElement("i");

    img.src               = works[i].imageUrl;
    img.alt               = works[i].title;
    img.id                = works[i].id;

    trashImg.innerHTML          = "<i class=\"fa-solid fa-trash-can\"></i>";

    modifyGallery.appendChild(figure);
    figure.appendChild(img);
    figure.appendChild(trashImg);
  }
}

function PictureForm() {
  const editGallery   = document.querySelector(".edit-gallery");
  const logoImg       = document.createElement("i");
  const inputImg      = document.createElement("input");
  const labelImg      = document.createElement("label");
  const imgFormat     = document.createElement("p");

  fieldsetImg.id = "add-picture-form";
  logoImg.innerHTML = "<i class=\"fa-regular fa-image fa-2xl\"></i>";

  inputImg.type = "file";
  inputImg.name = "image-input";
  inputImg.accept = "image/*";
  inputImg.id = "image-input";

  labelImg.htmlFor = "image-input";
  labelImg.innerText = "+ Ajouter photo";
  labelImg.id = "label-img";

  imgFormat.innerText = "jpg, png : 4mo max";

  imgPreview.id = "image-preview";
  imgPreview.src = "#";
  imgPreview.alt = "Apperçu de l'image";
  imgPreview.classList.add("display-none");

  editGallery.appendChild(formAddPicture);
  formAddPicture.appendChild(fieldsetImg);
  fieldsetImg.appendChild(logoImg);
  fieldsetImg.appendChild(inputImg);
  fieldsetImg.appendChild(labelImg);
  fieldsetImg.appendChild(imgFormat);
  fieldsetImg.appendChild(imgPreview);
}

function titleAndCategoryForm() {
  const fieldsetTexts    = document.createElement("fieldset");
  const inputTitle       = document.createElement("input");
  const selectCategory   = document.createElement("select");
  const defaultOption    = document.createElement("option");
  const optionCategory1  = document.createElement("option");
  const optionCategory2  = document.createElement("option");
  const optionCategory3  = document.createElement("option");
  const labelTitle       = document.createElement("label");
  const labelCategory    = document.createElement("label");

  fieldsetTexts.classList.add("text-fieldset");
  inputTitle.classList.add("input");
  inputTitle.classList.add("width-100");
  selectCategory.classList.add("input");
  selectCategory.classList.add("width-100");


  inputTitle.type       = "text";
  inputTitle.name       = "title";
  inputTitle.id         = "title";
  labelTitle.htmlFor    = "title";
  labelTitle.innerText  = "Titre";

  selectCategory.name       = "category";
  selectCategory.id         = "category";
  defaultOption.value       = "";
  defaultOption.innerText   = "";
  defaultOption.disabled    = true;
  optionCategory1.value     = "1";
  optionCategory1.innerText = "Objets";
  optionCategory2.value     = "2";
  optionCategory2.innerText = "Appartements";
  optionCategory3.value     = "3";
  optionCategory3.innerText = "Hôtels & restaurants";
  labelCategory.htmlFor     = "category";
  labelCategory.innerText   = "Catégorie";

  formAddPicture.appendChild(fieldsetTexts);
  fieldsetTexts.appendChild(labelTitle);
  fieldsetTexts.appendChild(inputTitle);
  fieldsetTexts.appendChild(labelCategory);
  fieldsetTexts.appendChild(selectCategory);
  selectCategory.appendChild(defaultOption);
  selectCategory.appendChild(optionCategory1);
  selectCategory.appendChild(optionCategory2);
  selectCategory.appendChild(optionCategory3);
  selectCategory.selectedIndex = -1;
}

  //**** OTHER FUNCTIONS ****\\
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
function removeHidden() {
  if(userToken !== null) {
    document.querySelector("#modify-btn").classList.remove("hidden");
    document.querySelector("#editor").classList.remove("hidden")
    document.querySelector("header").classList.add("margin-top-109");
    document.querySelector("#portfolio ul").classList.add("hidden");
    document.querySelector("#portfolio header").classList.add("margin-bot-0");
    loginLink.innerText = "logout"
  }
}

function modifyGallery() {
  const crossButton  = document.querySelector(".fa-xmark");
    crossButton.addEventListener("click", () => {
      const editGallery = document.querySelector(".edit-gallery");
      editGallery.innerHTML = "";
      modifyPopup.innerHTML = "";
      modifyPopup.id = "";
      isGalleryModified = false;
})}

function deleteWork() {
  const galleryImgs = document.querySelectorAll(".edit-gallery img");
  galleryImgs.forEach((img) => {
    img.addEventListener("click", (event) => {
    event.preventDefault();
    const workID = event.target.id;

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
  })

}

function backArrow() {
  const editGallery = document.querySelector(".edit-gallery");
  const backArrow = document.querySelector(".fa-arrow-left");
  backArrow.addEventListener("click", () => {
    if (!isGalleryModified) {
      editGallery.innerHTML = "";
      popupTitle.innerText = "Galerie photo";
      modifyBtn.innerText = "Ajouter une photo";
      generateGalleryModified(works);
      isGalleryModified = true;
      isPictureForm = false;
      backArrowButton.classList.add("hidden");
  }
  })
}

function displayNewImg() {
  const imageInputContainer = document.querySelector("#add-picture-form");
  const inputImage = document.querySelector("#image-input");
  const previewLabel = document.querySelector("#label-img");
  const imagePreview = document.querySelector("#image-preview");
  
  inputImage.addEventListener("change", function() {
    // Vérifier si un fichier a été sélectionné
    if (inputImage.files && inputImage.files[0]) {
      imageInputContainer.innerHTML = "";
      imagePreview.classList.remove("display-none");
      imageInputContainer.appendChild(imagePreview);

      const reader = new FileReader();
  
      reader.onload = function(e) {
        imagePreview.src = e.target.result;
      };
  
      // Lire le contenu du fichier en tant que data URL
      reader.readAsDataURL(inputImage.files[0]);
  
      // Mettre à jour le texte du label avec le nom du fichier
      previewLabel.textContent = inputImage.files[0].name;
    } else {
      // Réinitialiser l'aperçu de l'image et le texte du label
      imagePreview.src = "#";
      previewLabel.textContent = "+ Ajouter photo";
    }
  });
  }

  //**** EVENT LISTENERS FUNCTIONS ****\\
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

function modifyPopupEventListener() {
  const modifyButton = document.querySelector("#modify-btn");

  modifyButton.addEventListener("click", () => {
    modifyPopup.id = "modify";
    generateModifyPopup();

    if (!isGalleryModified) {
      if (isPictureForm) {
        const editGallery =  document.querySelector(".edit-gallery");
        editGallery.innerHTML = "";
        generateGalleryModified(works);
        isGalleryModified = true;
        isPictureForm = false;
      } else {
        generateGalleryModified(works);
        isGalleryModified = true;
      }
    }

  modifyGallery();
  deleteWork(); 
  addPictureListener();
  })
}

function addPictureListener() {
  const editGallery = document.querySelector(".edit-gallery");
  const addBtn      = document.querySelector(".popup button");

  addBtn.addEventListener("click", () => {
    backArrowButton.classList.remove("hidden");
    backArrow();

    if (!isPictureForm) {
      editGallery.innerHTML = "";
      fieldsetImg.innerHTML = "";
      formAddPicture.innerHTML = "";
      popupTitle.innerText = "Ajout photo";
      modifyBtn.innerText = "Valider";
      PictureForm();
      titleAndCategoryForm();
      isGalleryModified = false;
      isPictureForm = true;
  }
  displayNewImg();
  })
}

// ******************** MAIN ********************

generateWorks(works);
addListeners(works);
modifyPopupEventListener();
removeHidden();

