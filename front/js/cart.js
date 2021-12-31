 
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

            let id_selectionner_supression = produitEnrgDansLeLocaleStorage[l].idProduit;
            console.log("id_selectionner_supression");
            console.log(id_selectionner_supression);

produitEnrgDansLeLocaleStorage = produitEnrgDansLeLocaleStorage.filter(
    el => el.idProduit !== id_selectionner_supression);
console.log(produitEnrgDansLeLocaleStorage);

localStorage.setItem("produit", JSON.stringify(produitEnrgDansLeLocaleStorage));

//Alerte produit supprimé et refresh
alert("Ce produit a bien été supprimé du panier");
location.reload();


        })
    }