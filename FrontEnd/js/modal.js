import { addDisplayWork } from "./fetch-work.js";

// Création des éléments de la modal

export const modalDialog = document.createElement("dialog");
modalDialog.className = "modal__dialog";
modalDialog.id = "modaldialog";

const closeArrow = document.createElement("span");
closeArrow.className = "close";
closeArrow.innerHTML = "&times;";

const closeDiv = document.createElement("div");
closeDiv.className = "close__div";

const closeArrowDiv = document.createElement("div");
closeArrowDiv.className = "close__arrow__div";

export const closeArrowAdd = document.createElement("span");
closeArrowAdd.className = "close__add";
closeArrowAdd.innerHTML = "&times;";

export const backArrow = document.createElement("span");
backArrow.className = "back__arrow";
backArrow.innerHTML = "←";

const modalDivAdd = document.createElement("div");
modalDivAdd.className = "modal__div__add";
modalDivAdd.id = "modaldivadd";

const modalTitleAdd = document.createElement("h1");
modalTitleAdd.className = "modal__title__add";
modalTitleAdd.innerText = "Ajout photo";

const modalAddPictureDiv = document.createElement("div");
modalAddPictureDiv.className = "add__picture__div";
modalAddPictureDiv.id = "addpicturediv";

const modalLandscape = document.createElement("i");
modalLandscape.className = "fa-regular fa-image";
modalLandscape.id = "faimageland";

const modalAddBtn = document.createElement("label");
modalAddBtn.className = "modal__add__btn";
modalAddBtn.innerText = "+ Ajouter photo";
modalAddBtn.id = "modaladdbtn";

const modalAddFile = document.createElement("input");
modalAddFile.className = "modal__add__file";
modalAddFile.id = "addfile";
modalAddFile.type = "file";
modalAddFile.accept = "image/*"

const modalAddTxt = document.createElement("p");
modalAddTxt.className = "modal__add__txt";
modalAddTxt.innerText = "jpg, png : 4mo max";
modalAddTxt.id = "modaladdtxt";

const addPictureForm = document.createElement("form");
addPictureForm.className = "add__picture__form";
addPictureForm.method = "post";
addPictureForm.id = "addpictureform";

const addLabelTitle = document.createElement("label");
addLabelTitle.className = "add__label";
addLabelTitle.innerText = "Titre";

const addTitle = document.createElement("input");
addTitle.className = "add__title";
addTitle.id = "addtitle";
addTitle.type = "text";

const addLabelCategory = document.createElement("label");
addLabelCategory.className = "add__label";
addLabelCategory.innerText = "Catégorie";

const addCategory = document.createElement("select");
addCategory.className = "add__category";
addCategory.id = "addcategory";

const categoryAddObjects = document.createElement("option");
categoryAddObjects.innerText = "Objets";
categoryAddObjects.value = "1";

const categoryAddAppartments = document.createElement("option");
categoryAddAppartments.innerText = "Appartements";
categoryAddAppartments.value = "2";

const categoryAddHotels = document.createElement("option");
categoryAddHotels.innerText = "Hôtels & restaurants";
categoryAddHotels.value = "3";

const modalLineAdd = document.createElement("hr");
modalLineAdd.className = "modal__line";

const addButton = document.createElement("button");
addButton.className = "add__button__greyed";
addButton.innerText = "Valider";

window.addEventListener('click', function (e) {
    const modal = document.getElementById("modaldialog");
    if (e.target === modal) {
        document.getElementById("modaldialog").close();
    }
});


let storedToken = sessionStorage.getItem("storedtoken");

if (sessionStorage) {
    createModal();
}

async function fetchWork() {
    const response = await fetch("http://localhost:5678/api/works");
    let works = await response.json();

    works.map(function (work) {
        displayWork(work);
    })

}
fetchWork();

closeArrow.addEventListener("click", () => { modalDialog.close() });
closeArrowAdd.addEventListener("click", () => { modalDialog.close() });


function createModal() {


    const bodyTag = document.getElementsByTagName("body")[0];

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

    modalButton.addEventListener("click", () => {
        modalDiv.style.display = "none";
        modalDivAdd.style.display = "flex";
        closeArrow.style.display = "none";
        closeArrowDiv.style.display = "flex";
    })

    backArrow.addEventListener("click", () => {
        modalDivAdd.style.display = "none";
        closeArrowDiv.style.display = "none";
        closeArrow.style.display = "flex";
        modalDiv.style.display = "flex";
        resetForm();
    })

    const modalDelete = document.createElement("p");
    modalDelete.className = "modal__delete";
    modalDelete.innerText = "Supprimer la galerie";

    bodyTag.appendChild(modalDialog);
    modalDialog.appendChild(modalDiv);
    modalDialog.prepend(closeDiv);
    closeDiv.appendChild(closeArrow);
    modalDiv.appendChild(titleModal);
    modalDiv.appendChild(modalGallery);
    modalDiv.appendChild(modalLine);
    modalDiv.appendChild(modalButton);
    modalDiv.appendChild(modalDelete);

    // Création de la modal pour ajouter des photos

    modalDialog.appendChild(modalDivAdd);
    modalDialog.prepend(closeArrowDiv);
    closeArrowDiv.appendChild(backArrow);
    closeArrowDiv.appendChild(closeArrowAdd);
    modalDivAdd.appendChild(modalTitleAdd);
    modalAddPictureDiv.appendChild(modalLandscape);
    modalAddPictureDiv.appendChild(modalAddBtn);
    modalAddBtn.appendChild(modalAddFile);
    modalAddPictureDiv.appendChild(modalAddTxt);
    modalDivAdd.appendChild(addPictureForm);
    addPictureForm.appendChild(modalAddPictureDiv)
    addPictureForm.appendChild(addLabelTitle);
    addPictureForm.appendChild(addTitle);
    addPictureForm.appendChild(addLabelCategory);
    addPictureForm.appendChild(addCategory);

    // Ajout des différentes options de catégories

    addCategory.appendChild(categoryAddObjects);
    addCategory.appendChild(categoryAddAppartments);
    addCategory.appendChild(categoryAddHotels);
    modalDivAdd.appendChild(modalLineAdd);
    modalDivAdd.appendChild(addButton);

}

function displayWork(work) {
    // Affichage des travaux dans la div modal__gallery

    const figureModal = document.createElement("figure");
    figureModal.className = "modal__figure";
    figureModal.id = "figure" + work.id;
    const figureImage = document.createElement("img");
    figureImage.className = "modal__img";
    figureImage.src = work.imageUrl;
    const figureTitle = document.createElement("figcaption");
    figureTitle.className = "modal__caption";
    figureTitle.innerText = "éditer";

    const trashIcon = document.createElement("i");
    trashIcon.className = "fa-solid fa-trash-can";
    trashIcon.id = work.id;

    trashIcon.addEventListener("click", (event) => {
        event.preventDefault()
        let result = window.confirm("Êtes-vous sûr de vouloir supprimer ce projet ?");
        if (result === true) {
            deleteWork(trashIcon.id)
            document.getElementById(figureModal.id).remove()
            document.getElementById("figuregallery" + work.id).remove()
        }
    });

    const arrowsIcon = document.createElement("i");
    arrowsIcon.className = "fa-solid fa-arrows-up-down-left-right";
    arrowsIcon.style.display = "none";

    figureImage.addEventListener("mouseover", (event) => { arrowsIcon.style.display = "flex" });
    figureImage.addEventListener("mouseout", (event) => { arrowsIcon.style.display = "none" });

    const modalGallery = document.getElementsByClassName("modal__gallery")[0];
    modalGallery.appendChild(figureModal);
    figureModal.appendChild(figureImage);
    figureModal.appendChild(trashIcon);
    figureModal.appendChild(arrowsIcon);
    figureModal.appendChild(figureTitle);
}

async function deleteWork(workId) {
    const response = await fetch("http://localhost:5678/api/works/" + workId, {
        method: 'DELETE',
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${storedToken}`,
        },
    })


};

async function addWork(titleName, filePath, categoryValue) {
    const formData = new FormData();
    formData.append("title", titleName);
    formData.append("image", filePath);
    formData.append("category", categoryValue);
    console.log(formData);

    const response = await fetch("http://localhost:5678/api/works/", {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${storedToken}`,
        },
        body: formData
    })
    const work = await response.json();
    displayWork(work);
    addDisplayWork(work);
    modalDivAdd.style.display = "none";
    closeArrowDiv.style.display = "none";
    closeArrow.style.display = "flex";
    document.getElementById("modaldiv").style.display = "flex";
};

addButton.addEventListener("click", () => {
    const titleName = document.getElementById("addtitle").value;
    const filePath = document.getElementById("addfile").files[0];
    const categoryValue = document.getElementById("addcategory").value;

    if (!titleName || !filePath || !categoryValue) {
        alert("Veuillez remplir tous les champs.")
    } else {
        addWork(titleName, filePath, categoryValue);
        resetForm();
    }
});

const selectedImg = document.getElementById("addfile");
const previewImg = document.getElementById("addpicturediv");

selectedImg.addEventListener("change", function () {
    addButton.className = "add__button";
    getImgData();
})

function getImgData() {
    const files = selectedImg.files[0];
    if (files) {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(files);
        fileReader.addEventListener("load", function () {
            document.getElementById("faimageland").style.display = "none";
            document.getElementById("modaladdbtn").style.display = "none";
            document.getElementById("modaladdtxt").style.display = "none";
            const previewDiv = document.createElement("div");
            previewDiv.className = "preview__div";
            previewDiv.id = "previewdiv";
            previewImg.appendChild(previewDiv);
            previewDiv.innerHTML = '<img src="' + this.result + '" />';
        });
    }
}

export function resetModal() {
    modalDivAdd.style.display = "none";
    closeArrowDiv.style.display = "none";

    const modalDiv = document.getElementById("modaldiv");
    modalDiv.style.display = "flex";
    closeArrow.style.display = "flex";
}

function resetForm() {
    let addForm = document.getElementById("addpictureform");
    addForm.reset();
    document.getElementById("faimageland").style.display = "flex";
    document.getElementById("modaladdbtn").style.display = "flex";
    document.getElementById("modaladdtxt").style.display = "flex";
    document.getElementById("previewdiv").remove();
    addButton.className = "add__button__greyed";
}

