if (document.readyState == "loading") {
  document.addEventListener("DOMContentLoaded", ready);
} else {
  ready();
}

function ready() {
  // get back cart content before refresh page
  let cartRowsBody = document.getElementById("cart-Rows");
  let savedcartBody = JSON.parse(localStorage.getItem("mycart"));
  cartRowsBody.innerHTML = savedcartBody;
  updateTotalPrice();
  cartCounter();

  let imgs = document.getElementsByClassName("myImg");
  for (let i = 0; i < imgs.length; i++) {
    let img = imgs[i];
    img.addEventListener("click", showPopup);
  }

  let span = document.getElementsByClassName("close")[0];
  span.addEventListener("click", closePopup);

  let addToCart = document.getElementsByClassName("add-to-btn");
  for (let i = 0; i < addToCart.length; i++) {
    let button = addToCart[i];
    button.addEventListener("click", addsToCart);
  }

  let removeButton = document.getElementsByClassName("cart-rmov-btn");
  for (let i = 0; i < removeButton.length; i++) {
    let button = removeButton[i];
    button.addEventListener("click", returnCartItem);
  }

  // checkout button function
  let checkoutButton = document.getElementById("checkoutbtn");
  checkoutButton.addEventListener("click", clearCart);
}

function showPopup(event) {
  let imgClicked = event.target;
  let imagesContainer = imgClicked.parentElement;
  let images = imagesContainer.getElementsByClassName("myImg")[0];
  console.log(images);
  let popupSrc = document.getElementById("img01");
  popupSrc.src = images.src;
  let imgDesc = document.getElementById("caption");
  imgDesc.innerHTML = images.alt;
  let popElement = document.getElementById("myModal");
  popElement.style.display = "block";
}

function closePopup(event) {
  let modal = document.getElementById("myModal");
  modal.style.display = "none";
}

function addsToCart(event) {
  let buttonClicked = event.target;
  let product = buttonClicked.parentElement.parentElement;
  let productImage = product.getElementsByClassName("gb-image")[0].src;
  let productName = product.getElementsByClassName("product-name")[0].innerText;
  let productPrice =
    product.getElementsByClassName("product-price")[0].innerText;
  console.log(productImage, productName, productPrice);
  whatToAdd(productImage, productName, productPrice);
  updateTotalPrice();
}

function whatToAdd(a, b, c) {
  let cartRow = document.createElement("div");
  cartRow.classList.add("cart-row");
  // (a, b, c) is just random parameters, it could be anything else like (whatever, ere, noi)
  let cartRowContent = `
    <div class="cart-column cart-Image">
        <img class="cart-item-img" src="${a}">
    </div>
    <div class="cart-column cart-Name">
        <span class="cart-item-name">${b}</span>
    </div>
    <div class="cart-column cart-qty">
        <div>
        <button class="addBtn btn btn-success">+</button>
        <button class="subtractBtn btn btn-warning">-</button>
        </div>
        <p class="cart-item-qty">1</p>
    </div>
    <div class="cart-column cart-Price">
        <span class="cart-item-price">${c}</span>
    </div>
    <div class="cart-column cart-returnBtn">
        <button class="cart-rmov-btn btn btn-danger" type="button">Return</button>
    </div>`;

  cartRow.innerHTML = cartRowContent;

  let cartBody = document.getElementById("cart-Rows");
  cartBody.append(cartRow);
  //update & store that new row to session storage
  let newcartBody = cartBody.innerHTML;
  localStorage.setItem("mycart", JSON.stringify(newcartBody));

  // update Return (remove) button for newly added to cart elements
  cartRow
    .getElementsByClassName("cart-rmov-btn")[0]
    .addEventListener("click", returnCartItem);

  cartCounter();
}

function returnCartItem(event) {
  let buttonclicked = event.target;
  let rowToremove = buttonclicked.parentElement.parentElement;
  rowToremove.remove();
  updateTotalPrice();

  //update & store left over rows to session storage
  let cartBody = document.getElementById("cart-Rows");
  let newcartBody = cartBody.innerHTML;
  localStorage.setItem("mycart", JSON.stringify(newcartBody));
}

const updateTotalPrice = () => {
  let cartContainer = document.getElementById("cart"); //for good practise purposes only
  let cartRows = cartContainer.getElementsByClassName("cart-row");
  let total = 0;
  for (let i = 0; i < cartRows.length; i++) {
    let cartRow = cartRows[i];
    let itemPrice = cartRow.getElementsByClassName("cart-item-price")[0];
    let itemPriceValue = parseFloat(itemPrice.innerText);
    total += itemPriceValue;
  }

  document.getElementById("TotalValue").innerText = total;

  // storing paypal total to localStorage
  /* let paypalTotal = total
    localStorage.setItem("cartTotal", JSON.stringify(paypalTotal)) */
};

/* function updateTotalPrice3 ()  {
    let totalElement = document.getElementById("TotalValue")
    let totalValue = totalElement.innerText
    let itemsPrices = document.getElementsByClassName("cart-item-price")
    let total = 0
    for (let i=0; i<itemsPrices.length; i++) {
        let itemPrice = itemsPrices[i]
        let itemPriceValue = parseFloat(itemPrice.innerText)
        total += itemPriceValue
    }

    totalValue = total
} */

function clearCart() {
  //let cartRows = document.getElementsById("cart")
  let cartRoww = document.getElementById("cart-Rows");
  while (cartRoww.hasChildNodes()) {
    cartRoww.removeChild(cartRoww.firstChild);
  }

  //update & store  session storage values
  let cartBody = document.getElementById("cart-Rows");
  let newcartBody = cartBody.innerHTML;
  localStorage.setItem("mycart", JSON.stringify(newcartBody));

  updateTotalPrice();
}

// counter for items in cart
function cartCounter() {
  let cartCounter = document.getElementById("cartCounter");
  let itemsInCart = 0;
  let cartrows = document.getElementsByClassName("cart-row");
  itemsInCart = cartrows.length;
  console.log(itemsInCart);

  cartCounter.innerText = itemsInCart;
}
