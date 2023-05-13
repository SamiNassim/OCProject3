import { modalDialog } from "./modal.js";
import { closeArrow } from "./modal.js";
import { closeArrowAdd } from "./modal.js";

let storedToken = sessionStorage.getItem("storedtoken");
console.log(storedToken);

if (storedToken) {
    displayAdmin();
}

// Création de la page de login

const loginDiv = document.createElement("div");
loginDiv.className = "login__container";

const loginTitle = document.createElement("h1");
loginTitle.className = "login__title"
loginTitle.innerText = "Log In";

const loginForm = document.createElement("form");
loginForm.className = "login__form";
loginForm.id = "loginForm";
loginForm.method = "post";

const labelMail = document.createElement("label")
labelMail.className = "label__mail";
labelMail.innerText = "E-mail";

const loginMail = document.createElement("input");
loginMail.className = "login__mail";
loginMail.id = "loginMail";
loginMail.type = "email";

const labelPassword = document.createElement("label");
labelPassword.className = "label__password";
labelPassword.innerText = "Mot de passe";

const loginPassword = document.createElement("input");
loginPassword.className = "login__password";
loginPassword.id = "loginPassword";
loginPassword.type = "password";

const loginButton = document.createElement("button");
loginButton.className = "login__button";
loginButton.innerText = "Se connecter";
loginButton.addEventListener("click", (event) => {
    event.preventDefault()
    login()
});

const loginPassReset = document.createElement("p");
loginPassReset.className = "pass__reset"
loginPassReset.innerText = "Mot de passe oublié";

loginDiv.style.display = "none";

const mainTag = document.getElementsByTagName("main")[0];

mainTag.before(loginDiv);
loginDiv.appendChild(loginTitle);
loginDiv.appendChild(loginForm);
loginForm.appendChild(labelMail);
loginForm.appendChild(loginMail);
loginForm.appendChild(labelPassword);
loginForm.appendChild(loginPassword);
loginForm.appendChild(loginButton);
loginDiv.appendChild(loginPassReset);


function loginPage() {

    mainTag.style.display = "none";
    loginDiv.style.display = "flex";

}

// Crée un lien login dans le menu qui renvoie à la page login

const loginLink = document.getElementsByTagName("li")[2];
loginLink.className = "list__link";
loginLink.addEventListener("click", loginPage, false)

async function login() {


    let user = {
        email: document.getElementById("loginMail").value,
        password: document.getElementById("loginPassword").value,
        // email: "sophie.bluel@test.tld",
        // password: "S0phie"
    };

    try {

        const response = await fetch("http://localhost:5678/api/users/login", {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(user)
        })

        if (response.status === 200) {
            let result = await response.json();
            sessionStorage.setItem("storedtoken", result.token)
            window.location.replace("./index.html")
        }

        if (response.status === 404) {
            alert("Nom d'utilisateur ou mot de passe incorrect.")
        }

        console.log(response);
    }
    catch (error) {
        console.log(error)
    }

}

function logoutUser() {
    sessionStorage.removeItem("storedtoken");
    window.location.replace("./index.html");
}

function displayAdmin() {


    // Masquer la barre des filtres quand l'utilisateur est connecté

    const buttonsDiv = document.getElementById("buttons");
    buttonsDiv.style.display = "none";

    // Remplacer le lien login dans le menu par un lien logout

    const logoutLink = document.getElementsByTagName("li")[2];
    logoutLink.className = "list__link";
    logoutLink.innerText = "logout";
    logoutLink.addEventListener("click", logoutUser, false);

    // Ajout de la bannière d'édition en haut de la page
    const editBanner = document.createElement("div");
    editBanner.className = "edit__banner";
    const squarePen = document.createElement("i");
    squarePen.className = "fa-regular fa-pen-to-square";
    const editText = document.createElement("p");
    editText.className = "edit__text";
    editText.innerText = "Mode édition";
    const editPublish = document.createElement("button")
    editPublish.className = "publish__button";
    editPublish.innerText = "publier les changements"

    squarePen.addEventListener("click", () => { modalDialog.showModal() }, false);
    editText.addEventListener("click", () => { modalDialog.showModal() }, false);

    const bodyTag = document.getElementsByTagName("body")[0];

    bodyTag.insertBefore(editBanner, bodyTag.firstChild);
    editBanner.appendChild(squarePen);
    editBanner.appendChild(editText);
    editBanner.appendChild(editPublish);

    const modifyDiv = document.createElement("div");
    modifyDiv.className = "modify__div";
    const modifyIcon = document.createElement("i");
    modifyIcon.className = "fa-regular fa-pen-to-square modify__icon";
    const modifyText = document.createElement("p");
    modifyText.className = "modify__text";
    modifyText.innerText = "modifier";

    modifyIcon.addEventListener("click", () => { modalDialog.showModal() }, false);
    modifyText.addEventListener("click", () => { modalDialog.showModal() }, false);

    closeArrow.addEventListener("click", () => { modalDialog.close() });
    closeArrowAdd.addEventListener("click", () => { modalDialog.close() });

    modalDialog.addEventListener('click', function (e) {
        if (!e.target.closest('div')) {
            e.target.close();
        }
    });


    const portfolioSection = document.getElementById("portfolio");
    const myProjectsTitle = document.getElementsByTagName("h2")[1];
    portfolioSection.prepend(modifyDiv);
    modifyDiv.appendChild(myProjectsTitle);
    modifyDiv.appendChild(modifyIcon);
    modifyDiv.appendChild(modifyText);

}