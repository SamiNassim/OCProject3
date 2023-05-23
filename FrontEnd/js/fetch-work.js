async function fetchData() {
    const list = fetch("http://localhost:5678/api/works")
        .then(response => response.json())
        .then(works => {
            console.log(works)
            return works


        })
        .catch(err => console.log('Request failed', err));

    return list;
}


export function addDisplayWork(work) {
    const figure = document.createElement("figure");
    figure.id = "figuregallery" + work.id;
    const figureImage = document.createElement("img");
    figureImage.src = work.imageUrl;
    const figureTitle = document.createElement("figcaption");
    figureTitle.innerText = work.title;

    const figureGallery = document.getElementsByClassName("gallery")[0];
    figure.appendChild(figureImage);
    figure.appendChild(figureTitle);
    figureGallery.appendChild(figure);

}

async function displayAllWorks() {
    const works = await fetchData();
    console.log(works);
    works.forEach(function (work) {

        console.log(work)
        addDisplayWork(work);

    })
}

displayAllWorks();

// Création d'un lien "projets" dans le menu qui renvoie vers la page d'accueil

const projectsLink = document.getElementsByTagName("li")[0];
const projectsAnchor = document.createElement("a");
projectsAnchor.className = "menu__link";
projectsLink.parentNode.replaceChild(projectsAnchor, projectsLink);
projectsAnchor.appendChild(projectsLink);
projectsAnchor.href = "./index.html";
