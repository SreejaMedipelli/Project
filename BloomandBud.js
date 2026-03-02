// CART DATA
let cartItems = [];
let num = 0;

// Create Cart Overlay (Dynamically - No HTML changes)
let cartOverlay = document.createElement("div");
cartOverlay.style.position = "fixed";
cartOverlay.style.top = "0";
cartOverlay.style.right = "-100%";
cartOverlay.style.width = "400px";
cartOverlay.style.height = "100%";
cartOverlay.style.background = "#fff";
cartOverlay.style.boxShadow = "-5px 0 15px rgba(0,0,0,0.2)";
cartOverlay.style.padding = "20px";
cartOverlay.style.transition = "0.4s";
cartOverlay.style.zIndex = "9999";
cartOverlay.style.overflowY = "auto";
document.body.appendChild(cartOverlay);

// Open Cart
document.getElementById("cartLi").onclick = function () {
    cartOverlay.style.right = "0";
    renderCart();
};

// Close Button
let closeBtn = document.createElement("button");
closeBtn.innerText = "Close ✖";
closeBtn.style.marginBottom = "20px";
closeBtn.style.padding = "8px 12px";
closeBtn.style.border = "none";
closeBtn.style.background = "#f33";
closeBtn.style.color = "#fff";
closeBtn.style.cursor = "pointer";
closeBtn.onclick = function () {
    cartOverlay.style.right = "-100%";
};
cartOverlay.appendChild(closeBtn);

// CART FUNCTION
function cartCount() {

    let product = event.target.closest(".row");
    let title = product.querySelector("h4").innerText;
    let priceText = product.querySelector("h5").innerText;
    let price = parseFloat(priceText.replace("RS", ""));
    let img = product.querySelector("img").src;

    // Check if already in cart
    let existing = cartItems.find(item => item.title === title);

    if (existing) {
        existing.quantity++;
    } else {
        cartItems.push({
            title: title,
            price: price,
            img: img,
            quantity: 1
        });
    }

    num++;
    document.getElementById("countNum").innerText = num;
    document.getElementById("count").style.display = "flex";

    renderCart();
}

// RENDER CART
function renderCart() {

    cartOverlay.innerHTML = "";
    cartOverlay.appendChild(closeBtn);

    let heading = document.createElement("h2");
    heading.innerText = "Your Cart";
    cartOverlay.appendChild(heading);

    let total = 0;

    cartItems.forEach((item, index) => {

        let box = document.createElement("div");
        box.style.display = "flex";
        box.style.alignItems = "center";
        box.style.marginBottom = "15px";
        box.style.borderBottom = "1px solid #ddd";
        box.style.paddingBottom = "10px";

        let image = document.createElement("img");
        image.src = item.img;
        image.style.width = "70px";
        image.style.height = "70px";
        image.style.objectFit = "cover";

        let details = document.createElement("div");
        details.style.flex = "1";
        details.style.marginLeft = "10px";

        let name = document.createElement("p");
        name.innerText = item.title;

        let price = document.createElement("p");
        price.innerText = "RS " + item.price;

        let quantity = document.createElement("input");
        quantity.type = "number";
        quantity.value = item.quantity;
        quantity.min = "1";
        quantity.style.width = "50px";

        quantity.onchange = function () {
            item.quantity = parseInt(this.value);
            renderCart();
        };

        let remove = document.createElement("button");
        remove.innerText = "🗑";
        remove.style.border = "none";
        remove.style.background = "transparent";
        remove.style.cursor = "pointer";
        remove.onclick = function () {
            num -= item.quantity;
            cartItems.splice(index, 1);
            document.getElementById("countNum").innerText = num;
            renderCart();
        };

        details.appendChild(name);
        details.appendChild(price);
        details.appendChild(quantity);

        box.appendChild(image);
        box.appendChild(details);
        box.appendChild(remove);

        cartOverlay.appendChild(box);

        total += item.price * item.quantity;
    });

    let totalDiv = document.createElement("h3");
    totalDiv.innerText = "Total: RS " + total;
    totalDiv.style.marginTop = "20px";

    cartOverlay.appendChild(totalDiv);
}
