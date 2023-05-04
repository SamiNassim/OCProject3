function logged() {

    const editBanner = document.createElement("div");
    editBanner.className = "edit__banner";
    const squarePen = document.createElement("i");
    squarePen.className = "fa-light fa-pen-to-square";
    const editText = document.createElement("p");
    editText.innerText = "Mode édition";
    const editPublish = document.createElement("button")
    editPublish.className = "publish__button";

    const bodyTag = document.getElementsByTagName("body")[0];
    const h1Tag = document.getElementsByTagName("h1")[0];

    bodyTag.insertBefore(editBanner, bodyTag.firstChild);

};