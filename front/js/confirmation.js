let str = window.location.href;
const url = new URL(str);
const orderId = url.searchParams.get("orderId");
const orderNumber = document.getElementById("orderId");
orderNumber.innerHTML += `${orderId}`;

localStorage.clear();
console.log(url.searchParams.values());
console.log(orderId);