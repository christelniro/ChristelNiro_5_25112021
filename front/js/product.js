//récupérer les paramètres d’URL 
// let str = window.location.href;
// let url = new URL(str);
// let idProduct = url.searchParams.get("id");
// console.log(idProduct)

// let produitData = []
//récupérer les détails du produit et Récupération des articles de l'API

    // const recuperationProduit = async () => {
    //     await fetch(`http://localhost:3000/api/products/${idProduct}`)
    //     .then((res) => res.json())
    //     .then((promise) => {
    //        produitData = promise;
    //        console.log(produitData);
    //    });
    // }
  
    
    //affichage des produits et Répartition des données de l'API dans le DOM

    // const produitDisplay = async () => {
    //    await recuperationProduit();

    // document.getElementById("limitedWidthBlock").innerHTML = `<div id=item${produitData._id}>
    // <img class="item__img" src="${produitData.imageUrl}" 
    // alt="Photographie d'un canapé" ${produitData.name}/>
    // <div class="item__content__titlePrice"></div>
    // <h1 id="title"><${produitData.name}></h1>
    // <p id="price"><!-- 42 --></span>€</p>
    // `;
    // };

    
//produitData();

// (async function () {
//     const idProduct = getArticleId()
//     const produitData = await getProduitData(idProduct)
//     displayArticle(produitData)
    
// })
    
//  function getproduitData(idProduct){
//      return fetch ("http://localhost:3000/api/products/post/"+ idProduct)
//      .then(function(httpBodyResponse) {
//          return httpBodyResponse.json()
//      })
//      .then(function(article){
//          return article
//      })
//      .catch(function(error){
//          alert(error)
//      })
//  }   

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
addtocart(article)
}