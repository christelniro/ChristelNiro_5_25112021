 //décalration de la variable ds laquelle on met les keys et values
 let produitEnrgDansLeLocaleStorage = JSON.parse(localStorage.getItem("produit"));
 //JSON sert a convertir les donnéees au format jspn qui sont ds le local storage
// console.log(produitEnrgDansLeLocaleStorage);

//------------------------------------afffcihage pdt du panier-----------------------------------

//selection de la classe ou je vais injincter le code html

const positionElement1 = document.querySelector("#cart__items");
// console.log(positionElement1)

//si le panier est vide afficher panier vide

if (produitEnrgDansLeLocaleStorage === null || produitEnrgDansLeLocaleStorage == 0){
    const panierVide = `<p> Votre panier est vide </p>`;
    positionElement1.innerHTML = panierVide;
} else { 
    //si panier pas vide mettre les article en local storage
    
    let structureProduitPanier = [];


    async function getPrice(){
        try {
            const produit = fetch(`http://localhost:3000/api/products`)
            const response = await produit;
            const jsonResponse = await response.json();
            afficherProduits(jsonResponse)
            
            getTotalPrice()
            modifyQtt()
            supprimerProduit()
        } catch (error) {
            console.error(error);
        }
    }
    getPrice();

    function afficherProduits(produitsApi) { 
        console.table(produitsApi);
        
        const produits = produitEnrgDansLeLocaleStorage.map((produit) => {
            const produitFiltre = produitsApi.filter(produitApi => produitApi._id === produit.idProduit);
            console.log(produitFiltre[0].price);
            const price = produitFiltre[0].price;
            return `
            <article class="cart__item">
                <div>
                    <div class="cart__item__img">
                        <img src=${produit.imgProduit} alt=${produit.imgProduit.altImgProduit}>
                    </div>
                    <div class="cart__item__content">
                        <div class="cart__item__content__description">
                            <h2>Nom du produit ${produit.nomProduit}</h2>
                            <p>${produit.couleurProduit}</p>
                            <p id="product_price_${price}" class="product_price"> ${price} €</p>
                        </div>
                        <div class="cart__item__content__settings">
                            <div class="cart__item__content__settings__quantity">
                                <p id="numbers" >Qté : ${produit.quantiteProduit}</p>
                                <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${produit.quantiteProduit}">
                            </div>
                        </div>
                        <div class="cart__item__content__settings__delete">
                            <button class="deleteItem"> Supprimer </button>
                        </div>
                    </div>
                </div>
            </article>
            `
        });
        positionElement1.innerHTML = produits;
    }


    }
//recup du prix


    //-----------------------fin affichage pdt du panier------------------------------------------

    //------------------------gestion btn panier-----------------------------------------------------------   
   //selection des ref du btn supprime
function supprimerProduit() {
    let btn_supprimer = document.querySelectorAll(".deleteItem")
   
    for (let l = 0; l < btn_supprimer.length; l++){
        btn_supprimer[l].addEventListener("click" , (event) =>{
            event.preventDefault();
 
         //selection de l id du pdt qui va etre supprimer en cliquant sur le btn
            console.log(btn_supprimer);
 
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
}


//-----------------------------------------------------------------------------------

//----------------------- Récupération du total des quantités----------------------

function getTotalPrice() {
    const currentProductDansPanier = document.querySelectorAll('.product_price');
    let qttModif = document.querySelectorAll(".itemQuantity");
    console.log(qttModif)
    const tableauPrix = [...currentProductDansPanier].map(produit => parseInt(produit.innerText));
    const tableauQuantite = [...qttModif].map(quantite => parseInt(quantite.value));

    const reducer = (accumulator, currentValue) =>  accumulator + currentValue;
    let prixTotal = tableauPrix.reduce(reducer);
    const quantiteTotal = tableauQuantite.reduce(reducer);
    prixTotal *= quantiteTotal;

    const affichePrixHtml = `
        <div class="cart__price">
            <p>Total (<span id="totalQuantity">${quantiteTotal}</span> articles) : <span id="totalPrice">${prixTotal}</span> €</p>
        </div>
    `;
    positionElement1.insertAdjacentHTML("beforeend", affichePrixHtml);
}

//le button input
function modifyQtt() {
    let qttModif = document.querySelectorAll(".itemQuantity");
    console.log(qttModif);

    for (let h = 0; h < qttModif.length; h++){
        qttModif[h].addEventListener("change" , (event) => {
            event.preventDefault();

            //Selection de l'element à modifier en fonction de son id ET sa couleur
            let quantityModif = produitEnrgDansLeLocaleStorage[h].quantiteProduit;
            let qttModifValue = qttModif[h].valueAsNumber;
            
            const resultFind = produitEnrgDansLeLocaleStorage.find((el) => el.qttModifValue !== quantityModif);

            resultFind.quantiteProduit = qttModifValue;
            produitEnrgDansLeLocaleStorage[h].quantiteProduit = resultFind.quantiteProduit;

            localStorage.setItem("produit", JSON.stringify(produitEnrgDansLeLocaleStorage));
        
            // refresh rapide
            location.reload();
        })
    }
}
//le code html du prix total à afficher et quantité total


function getTotals(){

    // Récupération du total des quantités
    let elemsQtt = document.getElementsByClassName('itemQuantity');
    let myLength = elemsQtt.length,
    totalQtt = 0;

    for (var i = 0; i < myLength; ++i) {
        totalQtt += elemsQtt[i].valueAsNumber;
    }

    let productTotalQuantity = document.getElementById('totalQuantity');
    productTotalQuantity.innerHTML = totalQtt;
    console.log(totalQtt);

    // Récupération du prix total
    totalPrice = 0;

    for (var i = 0; i < myLength; ++i) {
        totalPrice += (elemsQtt[i].valueAsNumber * produitEnrgDansLeLocaleStorage[i].prixProduit);
    }

    let productTotalPrice = document.getElementById('totalPrice');
    productTotalPrice.innerHTML = totalPrice;
    console.log(totalPrice);
 }
// getTotals();

//fin panier-------------------------------

//----------------------------------------------------formulaire------------------------------------------------------------


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
    return false;
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
        'Accept': 'application/json', 
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

     } catch (e) { alert ("Problème avec fetch : " + err.message);}
 });

});