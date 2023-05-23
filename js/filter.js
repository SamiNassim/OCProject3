import { addDisplayWork } from "./fetch-work.js";

function displayButtonFilters() {

    // Créer 2 const correspondantes à la div gallery et la section portfolio
    const figureGallery = document.getElementsByClassName("gallery")[0];
    const portfolio = document.getElementById("portfolio");

    // Créer une const buttons qui sera notre div qui contiendra les boutons, applique une classe à cette div
    const buttons = document.createElement("div");
    buttons.className = "buttons";
    buttons.id = "buttons";
    // Et l'insert avant les éléments de la gallerie
    portfolio.insertBefore(buttons, figureGallery)

    // Créations des boutons de filtrage, application du texte correspondant et positionnement dans la div buttons créée précédemment
    const buttonAll = document.createElement("button");
    buttonAll.className = "button__filter";
    buttonAll.innerText = "Tous";

    const buttonObjects = document.createElement("button");
    buttonObjects.className = "button__filter";
    buttonObjects.innerText = "Objets";

    const buttonAppartments = document.createElement("button");
    buttonAppartments.className = "button__filter";
    buttonAppartments.innerText = "Appartements";

    const buttonHotels = document.createElement("button");
    buttonHotels.className = "button__filter";
    buttonHotels.innerText = "Hôtels & restaurants";

    buttons.appendChild(buttonAll);
    buttons.appendChild(buttonObjects);
    buttons.appendChild(buttonAppartments);
    buttons.appendChild(buttonHotels);

    // Création des liens des boutons qui feront appel à la fonction d'affichage de filtre en fonction de l'id de catégorie

    buttonAll.addEventListener("click", () => { displayFilter(0) }, false)
    buttonObjects.addEventListener("click", () => { displayFilter(1) }, false)
    buttonAppartments.addEventListener("click", () => { displayFilter(2) }, false)
    buttonHotels.addEventListener("click", () => { displayFilter(3) }, false)

}
displayButtonFilters();

async function displayFilter(idCategory) {

    const response = await fetch("http://localhost:5678/api/works");
    let works = await response.json();

    if (idCategory > 0) {
        works = works.filter(work => work.category.id === idCategory);
    }

    const figureGallery = document.getElementsByClassName("gallery")[0];
    while (figureGallery.firstChild) {
        figureGallery.removeChild(figureGallery.firstChild)
    };

    works.forEach(function (work) {
        addDisplayWork(work);
    });

}