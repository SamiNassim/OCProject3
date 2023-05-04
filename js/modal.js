export const modalDialog = document.createElement("dialog");
modalDialog.className = "modal__dialog";
modalDialog.id = "modaldialog";

export const closeArrow = document.createElement("span");
closeArrow.className = "close";
closeArrow.innerHTML = "&times;";

if (sessionStorage) {
    createModal();
}
async function fetchWork() {
    const response = await fetch("http://localhost:5678/api/works");
    let works = await response.json();
    console.log(works);

    works.map(function (work) {
        displayWork(work);
    })

}
fetchWork();

function createModal() {


    const bodyTag = document.getElementsByTagName("body")[0];

    /*     const openModal = document.createElement("button");
        openModal.innerText = "Ouvrir la modal"; */


    const modalDiv = document.createElement("div");
    modalDiv.className = "modal__div";
    modalDiv.id = "modaldiv";

    const modalGallery = document.createElement("div");
    modalGallery.className = "modal__gallery";

    const titleModal = document.createElement("h1");
    titleModal.className = "modal__title";
    titleModal.id = "modaltitle";
    titleModal.innerText = "Galerie photo";

    const modalLine = document.createElement("hr");
    modalLine.className = "modal__line";

    const modalButton = document.createElement("button");
    modalButton.className = "modal__button";
    modalButton.innerText = "Ajouter une photo";

    const modalDelete = document.createElement("p");
    modalDelete.className = "modal__delete";
    modalDelete.innerText = "Supprimer la galerie";

    bodyTag.appendChild(modalDialog);
    modalDialog.appendChild(modalDiv);
    modalDialog.prepend(closeArrow);
    modalDiv.appendChild(titleModal);
    modalDiv.appendChild(modalGallery);
    modalDiv.appendChild(modalLine);
    modalDiv.appendChild(modalButton);
    modalDiv.appendChild(modalDelete);

}

function displayWork(work) {
    // Affichage des travaux dans la div modal__gallery

    const figure = document.createElement("figure");
    figure.className = "modal__figure";
    const figureImage = document.createElement("img");
    figureImage.className = "modal__img";
    figureImage.src = work.imageUrl;
    const figureTitle = document.createElement("figcaption");
    figureTitle.className = "modal__caption";
    figureTitle.innerText = "éditer";

    const modalGallery = document.getElementsByClassName("modal__gallery")[0];
    modalGallery.appendChild(figure);
    figure.appendChild(figureImage);
    figure.appendChild(figureTitle);
}