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