 
 //décalration de la variable ds laquelle on met les keys et values
 let produitEnrgDansLeLocaleStorage = JSON.parse(localStorage.getItem("produit"));
 //JSON sert a convertir les donnéees au format jspn qui sont ds le local storage
console.log(produitEnrgDansLeLocaleStorage);

//------------------------------------afffcihage pdt du panier

//selection de la classe ou je vais injincter le code html

const positionElement1 = document.querySelector("#cart__items");
console.log(positionElement1)

//si le panier est vide afficher panier vide

if(produitEnrgDansLeLocaleStorage === null || produitEnrgDansLeLocaleStorage == 0){
const panierVide = `<p> Votre panier est vide </p>`;
positionElement1.innerHTML = panierVide;
} else { 
    //si panier pas vide mettre les article en local storage
    
    let structureProduitPanier = [];

    for(k = 0; k < produitEnrgDansLeLocaleStorage.length; k++ ){
        
        structureProduitPanier = structureProduitPanier + `
        
                <div class="cart__item__img">
<img src=${produitEnrgDansLeLocaleStorage[k].imgProduit} alt=${produitEnrgDansLeLocaleStorage[k].imgProduit.altImgProduit}>
                </div>
                </div>
                <div class="cart__item__content">
                  <div class="cart__item__content__description">
                    <h2>Nom du produit ${produitEnrgDansLeLocaleStorage[k].nomProduit}</h2>
                    <p>${produitEnrgDansLeLocaleStorage[k].couleurProduit}</p>
                    <p> € ${produitEnrgDansLeLocaleStorage[k].prixProduit}</p>
                  </div>
                  <div class="cart__item__content__settings">
                  <p>Qté : ${produitEnrgDansLeLocaleStorage[k].quantiteProduit}</p>
                      
                    </div>
                    <div class="cart__item__content__settings__delete">
                      <button class="deleteItem"> Supprimer </button>
                    </div>
                  </div>
                </div>
        `;}
        if (k == produitEnrgDansLeLocaleStorage.length){
            //injection html dans la page panier
        positionElement1.innerHTML = structureProduitPanier;
    }
    }

    //fin affichage pdt du panier------------------------------------------

    //-----gestion btn panier---
    //selection des ref du btn supprime

    let btn_supprimer = document.querySelectorAll(".deleteItem")
    console.log(btn_supprimer);


    for (let l = 0; l < btn_supprimer.length; l++){
        btn_supprimer[l].addEventListener("click" , (event) =>{
            event.preventDefault();
//selection de l id du pdt qui va etre supprimer en cliquant sur le btn
            let id_selectionner_supression = produitEnrgDansLeLocaleStorage[l].idProduit;
            console.log("id_selectionner_supression");
            console.log(id_selectionner_supression);
//av la methode filtre je selectionne les élements à garder et je sup l élement pi le btn su^^àa été cliqué
produitEnrgDansLeLocaleStorage = produitEnrgDansLeLocaleStorage.filter(
    el => el.idProduit !== id_selectionner_supression);
console.log(produitEnrgDansLeLocaleStorage);
//envoi de la variable ds le local storage
//la transformation en format JSON et l'envoyer ds la key pdt du localstorage
localStorage.setItem("produit", JSON.stringify(produitEnrgDansLeLocaleStorage));

//Alerte produit supprimé et refresh
alert("Ce produit a bien été supprimé du panier");
location.reload();


        })
    }

     // Récupération du total des quantités----------------------


     //declaration de la variable pr pouvoir y mettre les prix ds le panier

let prixTotalDuPanier = [];

for (let m = 0; m < produitEnrgDansLeLocaleStorage.length; m++){
    let prixProduitDansLePanier = produitEnrgDansLeLocaleStorage[m].prixProduit;
// 
    prixTotalDuPanier.push(prixProduitDansLePanier)

    console.log(prixTotalDuPanier);
}

//declaration de la variable pr pouvoir y mettre la quantité  ds le panier
let quantiteTotalDupanier = [];

for (let a = 0; a < produitEnrgDansLeLocaleStorage.length; a++){
    let quantiteTotalDanslepanier = produitEnrgDansLeLocaleStorage[a].quantiteProduit;

   quantiteTotalDupanier.push(quantiteTotalDanslepanier)

    console.log(quantiteTotalDupanier);
}


//adddition des prix qu'il ya ds le tableau de la variable "prixtotalcal" av la methode .reduce
    const reducer = (accumulator, currentValue) => accumulator + currentValue;
    const prixTotal = prixTotalDuPanier.reduce(reducer);

    console.log(prixTotal);
//adddition des quantité qu'il ya ds le tableau de la variable "prixtotalcal" av la methode .reduce
    const reducere = (accumulator, currentValue) => accumulator + currentValue;
    const quantiteProduit = quantiteTotalDupanier.reduce(reducere);

    console.log(quantiteTotalDupanier);

    //le code html du prix total à afficher et quantité total

    const affichePrixHtml = `
    <div class="cart__price">
              <p>Total (<span id="totalQuantity">${quantiteProduit}</span> articles) : <span id="totalPrice">${prixTotal}</span> €</p>
            </div>
    
    `
positionElement1.insertAdjacentHTML("beforeend", affichePrixHtml);
//fin panier-------------------------------

//-----------formulaire---------------------------------


//selection du button envoyer le formulaire

const envoieFormulaire = document.querySelector("#order");


//addenveslistener-----

envoieFormulaire.addEventListener("click", (e)=>{e.preventDefault();

//recuperation des valeur du formulaire pour les mettre  dans le locale storage 
localStorage.setItem("firstName", document.querySelector("#firstName").value);
localStorage.setItem("lastName", document.querySelector("#lastName").value);
localStorage.setItem("address", document.querySelector("#address").value);
localStorage.setItem("city", document.querySelector("#city").value);
localStorage.setItem("email", document.querySelector("#email").value);


const Formulaire = {
    prenom: localStorage.getItem('firstName'),
    nom: localStorage.getItem('lastName'),
    adresse: localStorage.getItem('address'),
    ville: localStorage.getItem('city'),
    email:localStorage.getItem('email'),   
}
console.log(Formulaire);




})
