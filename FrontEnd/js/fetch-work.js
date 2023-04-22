fetch("http://localhost:5678/api/works")
    .then(response => response.json())
    .then(works => {
        console.log(works)

        // Récupérer un seul travail contenu  dans un tableau avec plusieurs travaux en le parcourant

        works.map(function (work) {


            console.log(work)
            addDisplayWork(work);

        })

    })
    .catch(err => console.log('Request failed', err));



function addDisplayWork(work) {
    const figure = document.createElement("figure");
    const figureImage = document.createElement("img");
    figureImage.src = work.imageUrl;
    const figureTitle = document.createElement("figcaption");
    figureTitle.innerText = work.title;

    const figureGallery = document.getElementsByClassName("gallery")[0];
    console.log(figureGallery);
    figure.appendChild(figureImage);
    figure.appendChild(figureTitle);
    figureGallery.appendChild(figure);
}

async function workFetch() {

    const response = await fetch("http://localhost:5678/api/works");
    const work = await response.json();
    console.log(work);

    // Filtrer les travaux de la catégorie Appartements et les stocker dans une const
    const categoryApartments = work.filter(work => work.category.name === "Appartements");
    console.log(categoryApartments);

    // Filtrer les travaux de la catégorie Objets et les stocker dans une const
    const categoryObjects = work.filter(work => work.category.name === "Objets");
    console.log(categoryObjects);

    // Filtrer les travaux de la catégorie Hôtels & restaurants et les stocker dans une const
    const categoryHotels = work.filter(work => work.category.name === "Hotels & restaurants");
    console.log(categoryHotels);


    // Créer 2 const correspondantes à la div gallery et la section portfolio
    const figureGallery = document.getElementsByClassName("gallery")[0];
    const portfolio = document.getElementById("portfolio");

    // Créer une const buttons qui sera notre div qui contiendra les boutons, applique une classe à cette div
    const buttons = document.createElement("div");
    buttons.className = "buttons";
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

    // Création des fonctions qui vont supprimer les travaux affichés et afficher les nouveaux travaux

    function filterAll() {
        while (figureGallery.firstChild) {
            figureGallery.removeChild(figureGallery.firstChild)
        };

        work.map(function (work) {
            addDisplayWork(work);
        });
    }

    function filterObjects() {
        while (figureGallery.firstChild) {
            figureGallery.removeChild(figureGallery.firstChild)
        };

        categoryObjects.map(function (work) {
            addDisplayWork(work);
        });
    }

    function filterAppartments() {
        while (figureGallery.firstChild) {
            figureGallery.removeChild(figureGallery.firstChild)
        };

        categoryApartments.map(function (work) {
            addDisplayWork(work);
        });
    }

    function filterHotels() {
        while (figureGallery.firstChild) {
            figureGallery.removeChild(figureGallery.firstChild)
        };

        categoryHotels.map(function (work) {
            addDisplayWork(work);
        });
    }

    // Création des liens des boutons qui feront appel aux fonctions précédemment créée

    buttonAll.addEventListener("click", filterAll, false)
    buttonObjects.addEventListener("click", filterObjects, false)
    buttonAppartments.addEventListener("click", filterAppartments, false)
    buttonHotels.addEventListener("click", filterHotels, false)

}

// Création d'une fonction qui supprime le contenu de main et affiche la page de login

function loginPage() {

    const mainTag = document.getElementsByTagName("main")[0];

    while (mainTag.firstChild) {
        mainTag.removeChild(mainTag.firstChild)
    };

    const loginDiv = document.createElement("div");
    loginDiv.className = "login__container";

    const loginTitle = document.createElement("h1");
    loginTitle.className = "login__title"
    loginTitle.innerText = "Log In";

    const labelMail = document.createElement("label")
    labelMail.className = "label__mail";
    labelMail.innerText = "E-mail";

    const loginMail = document.createElement("input");
    loginMail.className = "login__mail";
    loginMail.type = "email";

    const labelPassword = document.createElement("label");
    labelPassword.className = "label__password";
    labelPassword.innerText = "Mot de passe";

    const loginPassword = document.createElement("input");
    loginPassword.className = "login__password";
    loginPassword.type = "password";

    const loginButton = document.createElement("button");
    loginButton.className = "login__button";
    loginButton.innerText = "Se connecter";

    const loginPassReset = document.createElement("p");
    loginPassReset.className = "pass__reset"
    loginPassReset.innerText = "Mot de passe oublié";


    mainTag.appendChild(loginDiv);
    loginDiv.appendChild(loginTitle);
    loginDiv.appendChild(labelMail);
    loginDiv.appendChild(loginMail);
    loginDiv.appendChild(labelPassword);
    loginDiv.appendChild(loginPassword);
    loginDiv.appendChild(loginButton);
    loginDiv.appendChild(loginPassReset);

}

// Crée un lien login dans le menu qui renvoie à la page login

const loginLink = document.getElementsByTagName("li")[2];
loginLink.addEventListener("click", loginPage, false)

console.log(workFetch());
