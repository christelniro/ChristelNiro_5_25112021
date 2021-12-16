//récupérer les paramètres d’URL 
let str = window.location.href;
let url = new URL(str);
let idProduct = url.searchParams.get("id");
console.log(idProduct)

//récupérer les détails du produit

    const recuperationProduit = async () => {
        await fetch(`http://localhost:3000/api/products/${idProduct}`)
        .then((res) => res.json())
        .then((promise) => {
            console.log(promise);
        });
    }
    recuperationProduit();
    