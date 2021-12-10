 let productName = document.querySelector(".productName");
 console.log(productName)
 let photoApi = document.querySelector(".photoApi");
 console.log(photoApi)


 fetch('http://localhost:3000/api/products').then((response) => {
    return response.json().then(function(tableau) {
        // traitement du tableau
        console.log(tableau)
       
        tableau.forEach(element => {
            //productName.innerHTML
            console.log(element.name)
        });
      });
}) ;