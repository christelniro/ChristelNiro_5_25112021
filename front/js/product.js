 

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


//button


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
    prixProduit: article.price / 100,
    descriptionProduit: article.description,
    imgProduit: idProduct.imageUrl,
    altImgProduit: article.altTxt,
}

console.log(optionsProduit);
});


