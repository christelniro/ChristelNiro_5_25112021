const orderId = JSON.parse(localStorage.getItem("orderId"));
const order = JSON.parse(localStorage.getItem("order"));
const orderNumber = document.getElementById("orderId");
orderNumber.innerHTML += `${orderId}`;

localStorage.clear();