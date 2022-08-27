if(document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready()
}

function ready() {

    // get back cart content before refresh page
    let cartRowsBody = document.getElementById("cart-Rows");
    let savedcartBody = JSON.parse(localStorage.getItem('mycart'));
    cartRowsBody.innerHTML = savedcartBody;
    sandwitchobj();
    updateTotalPrice()
    
    // Quantity change listener
    //let caartroow = document.getElementsByClassName("cart-row")
    let qtyEle = document.getElementsByClassName("cart-item-qty")
    for(let i=0; i<qtyEle.length; i++) {
        everyqtyele = qtyEle[i]
        everyqtyele.addEventListener("change", updateOrderQty)
    }
    

    // return button listener
    let removeButton = document.getElementsByClassName("cart-rmov-btn")
    for (let i=0; i<removeButton.length; i++) {
        let button = removeButton[i]
        button.addEventListener("click", returnCartItem)
    }

    /* // checkout button function
    let checkoutButton = document.getElementById("checkoutbtn")
    checkoutButton.addEventListener("click", clearCart)
 */
    // Generate order id
    let generateBtn = document.getElementById("generateOId")
    generateBtn.addEventListener("click", orderIdGenerator)
    document.getElementById("generateOId").click();

    // Actions: (show chose payment button) after form submit
    let cusform = document.getElementById("customerForm")
    cusform.addEventListener("submit", afterFormSubmit)
  
}



function afterFormSubmit(event){

    // store form in local storage

    // show payment methods button
    let showBtn = document.getElementById("chosePayment")
    showBtn.style.display = "none"

    // show payment methods
    paypalButns();

    // hide cart rows & update total price
    let cartBoty = document.getElementById("cart-Rows")
    cartBoty.style.display="none"
    updateTotalPrice();
}



function returnCartItem(event) {
    let buttonclicked = event.target
    let rowToremove = buttonclicked.parentElement.parentElement
    rowToremove.remove()
    updateTotalPrice()
    
    //update & store left over rows to session storage
    let cartBody = document.getElementById("cart-Rows")
    let newcartBody = cartBody.innerHTML
    localStorage.setItem('mycart', JSON.stringify(newcartBody))
    window.location.reload();
}

function updateOrderQty(event){
    let qtychange = event.target
    if(isNaN(qtychange.value) || qtychange.value<=0) {
        qtychange.value = 1
    }
    updateTotalPrice()
}

function updateTotalPrice()
{
    let cartContainer = document.getElementById("cart") //for good practise purposes only
    let cartRows = cartContainer.getElementsByClassName("cart-row")
    let total = 0
    for (let i = 0; i < cartRows.length; i++) {
        let cartRow = cartRows[i]
        let itemPrice = cartRow.getElementsByClassName("cart-item-price")[0]
        let itemPriceValue = parseFloat(itemPrice.innerText)
        let qty = cartRow.getElementsByClassName("cart-item-qty")[0].value
        total += (itemPriceValue * qty)
    }

    document.getElementById("TotalValue").innerText = total;
    //$("#orderTotal").val(total)
    document.getElementById("orderTotal").value = total;
    // Transfer Cart Total to Payment method Paypal
    /* let valueofPPpayment = total */
    //localStorage.setItem('mycart', JSON.stringify(document.getElementById("cart-Rows").innerHTML))}
    let cartBody = document.getElementById("cart-Rows")
    let newcartBody = cartBody.innerHTML
    localStorage.setItem('mycart', JSON.stringify(newcartBody))
}


function clearCart() {
    
    //let cartRows = document.getElementsById("cart")
    let cartRoww = document.getElementById("cart-Rows")
    while(cartRoww.hasChildNodes()) {
        cartRoww.removeChild (cartRoww.firstChild)
    }

    //update local storage values
    let cartBody2 = document.getElementById("cart-Rows")
    let newcartBody2 = cartBody.innerHTML
    localStorage.removeItem('mycart')

    updateTotalPrice()
}

function orderIdGenerator(event) {
    
    let orderIdInput = document.getElementById("orderIdInput");
    let orderval = document.getElementById("OrderID")
    
    // create unique order id
    let rText = ""
    let alphaBets = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    rText += alphaBets.charAt(Math.floor(Math.random() * alphaBets.length)) + alphaBets.charAt(Math.floor(Math.random() * alphaBets.length))
    orderval.value = rText + " " + Math.floor(Math.random() * 10000);

    //updateTotalPrice();
    // for fill order id in form
    let geneIdBtn = document.getElementById("generateOId");
    geneIdBtn.style.pointerEvents="none"
    geneIdBtn.style.display="none";
}

function sandwitchobj() {
    let sandwitches = {
        tameia:10,
        romicheese:15,
        shawerma:25,
        gbeef:30
    }
    /* console.log(sandwitches.gbeef) */
    let pname = document.getElementsByClassName("cart-item-name")
    
    for(let i=0; i < pname.length; i++) {
        
        let productName = pname[i].innerText
        
        /* console.log(productName) */
        if(productName == "طعمية"){
            let cartroww = pname[i].parentElement.parentElement;
            let tameaprice = sandwitches.tameia;
            /* console.log(tameaprice) */
            cartroww.getElementsByClassName("cart-item-price")[0].innerText = tameaprice;

        } else if(productName == "جبنة رومي"){
            let cartroww = pname[i].parentElement.parentElement;
            let romiprice = sandwitches.romicheese;
            cartroww.getElementsByClassName("cart-item-price")[0].innerText = romiprice;

        } else if(productName == "شاورما"){
            let cartroww = pname[i].parentElement.parentElement;
            let shawermaprice = sandwitches.shawerma;
            cartroww.getElementsByClassName("cart-item-price")[0].innerText = shawermaprice;

        } else if(productName == "لحمة مفرومة"){
            let cartroww = pname[i].parentElement.parentElement;
            let gbeefprice = sandwitches.gbeef;
            cartroww.getElementsByClassName("cart-item-price")[0].innerText = gbeefprice;
        } else {
            alert("This item is not in sandwitchobj");
        }
    }
}

function paypalButns() {

    valueofPPpayment = document.getElementById("TotalValue").innerText
    console.log(valueofPPpayment)


    paypal.Buttons({
        // Sets up the transaction when a payment button is clicked
        createOrder: (data, actions) => {
        return actions.order.create({
            purchase_units: [{
            amount: {
                value: valueofPPpayment // Can also reference a variable or function
            }
            }]
        });
        },
        // Finalize the transaction after payer approval
        onApprove: (data, actions) => {
        return actions.order.capture().then(function(orderData) {
            // Successful capture! For dev/demo purposes:
            console.log('Capture result', orderData, JSON.stringify(orderData, null, 2));
            const transaction = orderData.purchase_units[0].payments.captures[0];
            alert(`Transaction ${transaction.status}: ${transaction.id}\n\nSee console for all available details`);
            // When ready to go live, remove the alert and show a success message within this page. For example:
            // const element = document.getElementById('paypal-button-container');
            // element.innerHTML = '<h3>Thank you for your payment!</h3>';
            // Or go to another URL:  actions.redirect('thank_you.html');
        });
        }
    }).render('#paypalPayBtn');
}

