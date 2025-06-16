// ==== Sélections ====
const elements = {
    selectNames: document.querySelector("#names"),
    selectQuantity: document.querySelector("#quantity"),
    inputFood: document.querySelector("#food"),
    btnAddFood: document.querySelector(".btn-add-food"),
    zoneFood: document.querySelector(".zone-food"),
}

// ==== Variables ====
const list = [];

// ==== Fonctions utilitaires ====
// Le but est d'automatiser la création d'élément HTML
// Fonction pour créer une balise, lui ajouter une classe et du contenu (les trois paramètres respectivement) 
function createElement(tag, className, content) {
    const element = document.createElement(tag);
    
    if (className) {
        element.className = className;
    }
    if (content) {
        element.innerHTML = content;
    }

    return element;
}
// Fonction pour ajouter une balise créée dans le HTML, l'enfant (params child) va dans le parent (params parent)
function appendElement(parent, child) {
    parent.append(child);
}

// ==== Fonctions ====
// Obtenir les données utilisateurs
function getUserData() {
    return {
        name: elements.selectNames.value,
        quantity: elements.selectQuantity.value,
        food: elements.inputFood.value,
    }
}

// Stocker les données utilisateurs
function stockUserData() {
    list.push(getUserData())
}

// Afficher les données utilisateurs
function renderUserData() {
    // On vide la zone d'affichage avant d'afficher les données
    elements.zoneFood.innerHTML = "";

    // Afficher les éléments (itération sur le tableau + index pour suppression el)
    list.forEach((element, index) => {
        // Création des éléments
        const card = createElement("div", "card", "");
        const cardName = createElement("div", "card__name", `[${element.name}]`);
        const cardQuantity = createElement("div", "card__quantity", `${element.quantity}x`);
        const cardFood = createElement("div", "card__food", `${element.food}`);

        // Insertion HTML
        appendElement(elements.zoneFood, card);
        appendElement(card, cardName);
        appendElement(card, cardQuantity);
        appendElement(card, cardFood);

        // Ajout d'un bouton delete
        const btnDeleteElement = createElement("button", "delete-element", `🗑`)
        appendElement(card, btnDeleteElement);
        // Ajout d'un écouteur d'événement sur le bouton delete
        btnDeleteElement.addEventListener("click", function (event) {
            event.preventDefault();
            // Supprimer du tableau
            list.splice(index, 1);

            // Vérifier si le tableau est vide et afficher un phrase si c'est le cas sinon afficher les éléments du tableau
            if(list.length === 0) {
                elements.zoneFood.innerHTML = "La liste est vide."
            } else {
                // Réafficher la nouvelle liste
                renderUserData()
            }
        })
    })
}

// ==== Evénements ====
elements.btnAddFood.addEventListener("click", function (event) {
    event.preventDefault();

    getUserData();
    stockUserData();
    renderUserData();
})