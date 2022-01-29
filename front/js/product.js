
//récupérer les paramètres d’URL 
let str = window.location.href;
let url = new URL(str);
let idProduct = url.searchParams.get("id");
console.log(idProduct);
let article = "";

const colorPicked = document.querySelector("#colors");
const quantityPicked = document.querySelector("#quantity");

getArticle();

// Récupération des articles de l'API
function getArticle() {
    fetch("http://localhost:3000/api/products/" + idProduct)
    .then((res) => {
        return res.json();
    })
//les donnees dans le dom
    .then(async function (resultatAPI) {
        article = await resultatAPI;
        console.table(article);
        if (article){
            getPost(article);
        }
    })
    .catch((error) => {
        console.log("Erreur de la requete API");
    })
}
//insertion image
function getPost(article){
    let productImg = document.createElement("img");
    document.querySelector(".item__img").appendChild(productImg);
    productImg.src = article.imageUrl;
    productImg.alt = article.altTxt;

//titre h1
let productName = document.getElementById('title');
productName.innerHTML = article.name;
//prix
let productPrice = document.getElementById('price');
productPrice.innerHTML = article.price;
//description
let productDescription = document.getElementById('description');
productDescription.innerHTML = article.description;
//choix couleur
for (let colors of article.colors){
    console.table(colors);
    let productColors = document.createElement("Option")
    document.querySelector('#colors').appendChild(productColors);
    productColors.value = colors;
    productColors.innerHTML = colors;
}
addToCart(article);
}


//--------------BOUTTON PANIER ----------------------


//selection de l'id du formulaire
const idForm = document.querySelector('#addToCart');
console.log(idForm);

//selection du bouton ajouter l'article du panier
const btn_envoyerPanier = document.querySelector('#addToCart')
console.log(btn_envoyerPanier);

//ecouter le bouton et envoyer le panier
btn_envoyerPanier.addEventListener("click", (event)=>{
    event.preventDefault();

//choix de l'utulisateur
const choixForm = colorPicked.value;
const ChoixForm = quantityPicked.value;


console.log(ChoixForm);


//recuperer des valeurs du formulaire
let optionsProduit = {
    idProduit: idProduct,
    couleurProduit: choixForm,
    quantiteProduit: Number(ChoixForm),
    nomProduit: article.name,
    
    descriptionProduit: article.description,
    imgProduit: article.imageUrl,
    altImgProduit: article.altTxt,
}

console.log("christel", optionsProduit);


//----------LOCAL STORAGE----


//STOCKER LA RECUP DES VALEURS DU FORMULAIRE DS LE LS-----


 //declaration

 let produitEnrgDansLeLocaleStorage = JSON.parse(localStorage.getItem("produit"));
 //Pour convertir les données au format json quis ont dans le local storage en obj js
 console.log(produitEnrgDansLeLocaleStorage);


 //fonction fenetre popup
const popupConfirmation = () =>{
    if(window.confirm(`${article.name} option: ${choixForm} a bien été ajouté au panier
    Consultez le panier OK ou revenir à l'accueil Annuler`)){
window.location.href = "cart.html";
    }else{
        window.location.href = "index.html";
    }

}

 //Importation dans le local storage
    //Si le panier comporte déjà au moins 1 article
   if (produitEnrgDansLeLocaleStorage) {
       const resultFind = produitEnrgDansLeLocaleStorage.find(
           (el) => el.idProduit === idProduct && el.couleurProduit === choixForm);
           //Si le produit commandé est déjà dans le panier
           if(resultFind){
               let newQuantite=
               parseInt(optionsProduit.quantiteProduit) + parseInt(resultFind.quantiteProduit);
               resultFind.quantiteProduit =newQuantite;
               localStorage.setItem("produit", JSON.stringify(produitEnrgDansLeLocaleStorage));
               console.table(produitEnrgDansLeLocaleStorage);
               popupConfirmation();
      //Si le produit commandé n'est pas dans le panier 
   }else{
       produitEnrgDansLeLocaleStorage.push(optionsProduit);
       localStorage.setItem("produit", JSON.stringify(produitEnrgDansLeLocaleStorage));
       console.log("ici" , produitEnrgDansLeLocaleStorage);
       popupConfirmation();
          //Si le panier est vide
   }} else {
       produitEnrgDansLeLocaleStorage = [];
       produitEnrgDansLeLocaleStorage.push(optionsProduit);
       localStorage.setItem("produit", JSON.stringify(produitEnrgDansLeLocaleStorage));
       console.log("la" , produitEnrgDansLeLocaleStorage);
       popupConfirmation();
   }
});
