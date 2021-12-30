 
 //décalration de la variable ds laquelle on met les keys et values
 let produitEnrgDansLeLocaleStorage = JSON.parse(localStorage.getItem("produit"));
 //JSON sert a convertir les donnéees au format jspn qui sont ds le local storage
console.log(produitEnrgDansLeLocaleStorage);

//afffcihage pdt ds le panier

//selection de la classe ou je vais injincter le code html

const positionElement1 = document.querySelector("#cart__items");
console.log(positionElement1)

//si le panier est vide afficher panier vide

if(produitEnrgDansLeLocaleStorage === null){
const panierVide = `<p> Votre panier est vide </p>`;
positionElement1.innerHTML = panierVide;
} else { 
    //si panier pas vide mettre les article en local storage
    //insertion de l'élément article
    let structureProduitPanier = [];

    for(k = 0; k < produitEnrgDansLeLocaleStorage.length; k++ ){
        
        structureProduitPanier = structureProduitPanier + `
        
                <div class="cart__item__img"${produitEnrgDansLeLocaleStorage[k].imgProduit}>
                </div>
                <div class="cart__item__content">
                  <div class="cart__item__content__description">
                    <h2>Nom du produit ${produitEnrgDansLeLocaleStorage[k].nomProduit}</h2>
                    <p>Vert ${produitEnrgDansLeLocaleStorage[k].choixCouleur}</p>
                    <p>42,00 € ${produitEnrgDansLeLocaleStorage[k].prixProduit}</p>
                  </div>
                  <div class="cart__item__content__settings">
                    <div class="cart__item__content__settings__quantity">
                      <p>Qté : ${produitEnrgDansLeLocaleStorage[k].quantiteProduit}</p>
                      <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="42">
                    </div>
                    <div class="cart__item__content__settings__delete">
                      <p class="deleteItem">Supprimer</p>
                    </div>
                  </div>
                </div>
        `;}

        if(k=== produitEnrgDansLeLocaleStorage.length){
        positionElement1.innerHTML = structureProduitPanier;
    }
    }