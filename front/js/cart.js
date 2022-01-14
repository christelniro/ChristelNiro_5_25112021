 //décalration de la variable ds laquelle on met les keys et values
 let produitEnrgDansLeLocaleStorage = JSON.parse(localStorage.getItem("produit"));
 //JSON sert a convertir les donnéees au format jspn qui sont ds le local storage
console.log(produitEnrgDansLeLocaleStorage);

//------------------------------------afffcihage pdt du panier-----------------------------------

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
                  <button id="decrement" > - </button>
                  <p id="number">Qté : ${produitEnrgDansLeLocaleStorage[k].quantiteProduit}</p>
                  <button id="increment" > + </button>    
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

    //-----------------------fin affichage pdt du panier------------------------------------------

    //------------------------gestion btn panier-----------------------------------------------------------
    //selection des ref du btn supprime

    let btn_supprimer = document.querySelectorAll(".deleteItem")
    console.log(btn_supprimer);


    for (let l = 0; l < btn_supprimer.length; l++){
        btn_supprimer[l].addEventListener("click" , (event) =>{
            event.preventDefault();
//selection de l id du pdt qui va etre supprimer en cliquant sur le btn
            
            let idDelete = produitEnrgDansLeLocaleStorage[l].idProduit;
            let colorDelete = produitEnrgDansLeLocaleStorage[l].couleurProduit;

//av la methode filtre je selectionne les élements à garder et je sup l élement pi le btn su^^àa été cliqué


produitEnrgDansLeLocaleStorage = produitEnrgDansLeLocaleStorage.filter( 
    el => el.idProduit !== idDelete || el.couleurProduit !== colorDelete );
//envoi de la variable ds le local storage
//la transformation en format JSON et l'envoyer ds la key pdt du localstorage
localStorage.setItem("produit", JSON.stringify(produitEnrgDansLeLocaleStorage));

//Alerte produit supprimé et refresh
alert("Ce produit a bien été supprimé du panier");
location.reload();


        })
    }
// button incrément + et décrémenté -

let add = document.getElementById('increment');
let remove = document.getElementById('decrement');

let int = document.getElementById('number');
let integer = 0;

add.addEventListener('click', function(){
integer += 1;
int.innerHTML = integer;
})
remove.addEventListener('click', function(){
    integer -= 1;
    int.innerHTML = integer;
    })

//-----------------------------------------------------------------------------------

     //----------------------- Récupération du total des quantités----------------------


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
    document.querySelectorAll(".itemQuantity").forEach(quantiteProduit => {
        quantiteProduit.addEventListener("change", (e) => {
            Basket.changeQuantity({
                quantity: parseInt(choixForm),
                color: e.target.closest(".cart__item").dataset.color,
                _id: e.target.closest(".cart__item").dataset.id
            });
            if (parseInt(e.target.value) == 0) {
                e.target.closest(".cart__item").remove();
            }
            displayTotal();
        });
    })

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

//----------------------------------------------------formulaire---------------------------------


//selection du button envoyer le formulaire

const envoieFormulaire = document.querySelector("#order");


//addenveslistener-----

envoieFormulaire.addEventListener("click", (e)=>{e.preventDefault();


    //création def d'un class pr fabriquer l'objt ds lequel iront les values du formulaire


    class Formulaire{
        constructor (){
            this.prenom = document.querySelector("#firstName").value;
            this.nom = document.querySelector("#lastName").value;
            this.address = document.querySelector("#address").value;
            this.city = document.querySelector("#city").value;
            this.email = document.querySelector("#email").value;
        }
    }

//appel de l'instance de class formulaire pr creer l'obj formulaireValue

const formulaireValues = new Formulaire();
console.log(formulaireValues);
console.log("formulaireValues")



//-------gestion validation formulaire

const regExPrenomNomCity = (value) => {
    return/^([A-Za-z]{0,20})?([-]{0,1})?([A-Za-z]{0,20})$/.test(value);
}
const regexEmail =  (value) => {
    return/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value);
 }

const regexAdresse =  (value) => {
    return/^[A-Za-z0-9\s]{5,60}$/.test(value);
}

function prenomControle() {
//---------controle de la validité du prenom  regex
const lePrenom = formulaireValues.prenom;
if(regExPrenomNomCity(lePrenom)){
    console.log("ok");
    return true;
}else{
    console.log("ko");
    alert ('chiffre et les caractére speciaux non autorisé prénom 20 caractère possible');
    return false;
};
}

function nomControle() {
    //---------controle de la validité du prenom  regex
const nom = formulaireValues.nom;
if(regExPrenomNomCity(nom)){
    console.log("ok");
    return true;
}else{
    console.log("ko");
    alert ('chiffre et les caractére speciaux non autorisé prénom 20 caractère possible');
    return false;
};
}

function villeControle() {
    //---------controle de la validité du prenom  regex
const ville = formulaireValues.city;
if(regExPrenomNomCity(ville)){
    console.log("ok");
    return true;
}else{
    console.log("ko");
    alert ('chiffre et les caractére speciaux non autorisé prénom 20 caractère possible');
    return false;
};
}
function adresseControle() {
    //---------controle de la validité du prenom  regex
const adresse = formulaireValues.address;
if(regexAdresse(adresse)){
    console.log("ok");
    return true;
}else{
    console.log("ko");
    alert (" l'adresse ne doit contenir que des lettres et chiffre");
    return false;
};
}

function emailControle() {
        //---------controle de la validité du prenom  regex
const email = formulaireValues.email;
 if(regexEmail(email)){
     return true;
console.log("ok")
}else{
console.log("ko")
alert('Email non valide')
return false;
 };
}




if (prenomControle() && nomControle() && villeControle() && emailControle() && adresseControle()) {
    //mettre l'obj ds "formulaire values" ds le local storage

    localStorage.setItem("formulaireValues", JSON.stringify(formulaireValues));
    console.log(prenomControle());
}else{
    console.log(prenomControle());
    alert("veuillez bien remplir le formulaire");
}

//----------fin gestion validation du formulaire--------------------------

//mettre la values du formulaire et mettre les pdt selectionnés ds un objt a envoyer vers le serveur
const aEnvoyer = {
    produitEnrgDansLeLocaleStorage, formulaireValues
}

console.log(aEnvoyer)

// envoi de l'obj  "aenvoyer " vers le serveur

const contact = {
    firstName: document.getElementById("firstName").value,
    lastName: document.getElementById("lastName").value,
    address: document.getElementById("address").value,
    city: document.getElementById("city").value,
    email: document.getElementById("email").value
  };

 let products = [];
 for (product of produitEnrgDansLeLocaleStorage) {
   products.push(product.idProduit);
   
 }

 console.log(contact)
 console.log(products)

 // fetch url envoi des données au serveur 
 const promise01 = fetch(`http://localhost:3000/api/products/order`, {
     method: "POST",
     // envoi de l'objet contact et de la variable products en "POST"
     body: JSON.stringify({           contact,
        products
    }),
     headers: {
         "Content-Type": "application/json",
     },
 });

 promise01.then(async (data) => {
     try {


         const contenu = await data.json();
         // puis récupérer dans la réponse le numéro de commande "orderId"
         console.log("yoyo", contenu)
         orderId = contenu.orderId;
         // constitution de l'objet "order" contenant les données contact products et l'orderId
         const order = {
             contact: contenu.contact,
             products: contenu.products,
             orderId: contenu.orderId
         }
         // envoi au localStorage des données 
         localStorage.setItem("order", JSON.stringify(order));
         localStorage.setItem("orderId", JSON.stringify(orderId));
         // redirection de l'utilisateur vers la page confirmation.html
         window.location.href = `./confirmation.html`;

     } catch (e) {}
 });







});