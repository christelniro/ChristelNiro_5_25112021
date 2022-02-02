
//recuperation des articles
async function tableau() {
    let response = await fetch('http://localhost:3000/api/products')
    return response.json();
}
tableau()
produitSection()

// Répartition des données de l'API dans le DOM

async function produitSection() {
    let result = await tableau()
        .then(function (resultatApi) {
            const articles = resultatApi;


            for (let article in articles) {

                // Insertion de l'élément "a"
                let productLink = document.createElement("a");
                document.querySelector(".items").appendChild(productLink);
                productLink.href = `product.html?id=${resultatApi[article]._id}`;

                // Insertion de l'élément "article"
                let productArticle = document.createElement("article");
                productLink.appendChild(productArticle);

                // Insertion de l'image
                let productImg = document.createElement("img");
                productArticle.appendChild(productImg);
                productImg.src = resultatApi[article].imageUrl;
                productImg.alt = resultatApi[article].altTxt;

                // Insertion du titre "h3"
                let productName = document.createElement("h3");
                productArticle.appendChild(productName);
                productName.classList.add("productName");
                productName.innerHTML = resultatApi[article].name;

                // Insertion de la description "p"
                let productDescription = document.createElement("p");
                productArticle.appendChild(productDescription);
                productDescription.classList.add("productName");
                productDescription.innerHTML = resultatApi[article].description;
            }
        })
        .catch(function (error) {
            return error;
        });
}