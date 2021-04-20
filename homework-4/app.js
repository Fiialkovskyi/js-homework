let productList = document.getElementById('product-list');
let cartItems= document.getElementById('card-items');
let cartCounter = document.querySelector('.js-cart_conter');
let dataArray = [];
let cart = JSON.parse(localStorage.getItem('cart')) || [];

fetch("http://my-json-server.typicode.com/achubirka/db/products")
  .then((response) => response.json())
  .then((data) => {
    dataArray = [...data];
    renderItems(dataArray);
    renderCart(cart);
  });

function renderItems(arr) {
  let listItems = arr.map((item) => {
    return `
      <li class="js-list_item mt-3 pb-3 border-bottom border-2" data-id=${item.id}>
          <h4>${item.name}</h4>
          <div>In stock ${item.available}</div>
          <div class="d-flex align-items-center pt-2">
            <div class="fs-5">$${item.price}</div>
            ${checkButtonStatus(item)}
          </div>
      </li>
    `;
  }).join('');
  
  productList.innerHTML = listItems;
}

productList.addEventListener('click', (e) => {
  let button = e.target.closest('.js-button_add');

  if (button) {
    id = parseInt(button.parentElement.parentElement.getAttribute('data-id'));
    let index = dataArray.map(item => item.id).indexOf(id);
    
    cart = [...cart, {...dataArray[index], qty: 1}];
    renderCart(cart);
    renderItems(dataArray);
  }
})

function renderCart(arr) {
  let itemsInCart = arr.map(item => {
    return `
      <li class="d-flex mt-3 pb-3 border-bottom border-2" data-id=${item.id}>
        <div class="col-8">
          <h5>${item.name}</h5>
          <div class="d-flex align-items-center">
            <button class="js-button_minus btn-xs btn-primary block me-2 text-uppercase text-white">-</button>
            ${checkPlusButtonStatus(item)}
            <div>${item.qty}</div>
          </div>
        </div>
        <div class="col-4">
          <div class="pt-4 fs-4 fw-bold text-end">$${Math.round(item.price * item.qty *100) / 100}</div>
        </div>
      </li>
    `;
  }).join('');

  cartItems.innerHTML = itemsInCart;
  cartCounter.innerHTML = `(${cart.length})`;
  calculateCartTotal()
  localStorage.setItem('cart', JSON.stringify(cart));
};

cartItems.addEventListener('click',(e) => {
  let buttonMinus = e.target.closest('.js-button_minus');
  let buttonPlus = e.target.closest('.js-button_plus');

  if (buttonMinus) {
    id = parseInt(buttonMinus.parentElement.parentElement.parentElement.getAttribute('data-id'));
    let index = cart.map(item => item.id).indexOf(id);
    
    if (cart[index].qty > 1) {
      cart[index].qty--;
    } else {
      cart[index].qty--;
      cart.splice(index, 1);
      renderItems(dataArray);
    }
  }

  if (buttonPlus) {
    id = parseInt(buttonPlus.parentElement.parentElement.parentElement.getAttribute('data-id'));
    let index = cart.map(item => item.id).indexOf(id);

    if(cart[index].qty < cart[index].available) {
      cart[index].qty++;
    } else {
      renderCart(cart);
    }
  }

  renderCart(cart);
});

function checkButtonStatus(item) {
  if (item.available > 0 && cart.find(cartItem => cartItem.id == item.id)) {
    return '<button class="btn block ms-3 text-uppercase text-white btn-secondary" disabled="true">Item in cart</button>'
  } else if (item.available <= 0) {
    return '<button disabled class="btn btn-secondary block ms-3 text-uppercase text-white">Not in stock</button>'
  } else {
    return '<button class="js-button_add btn btn-primary block ms-3 text-uppercase text-white">Add</button>'
  }
}

function checkPlusButtonStatus(item) {
  if (item.qty < item.available) {
    return '<button class="js-button_plus btn-xs btn-primary block me-2 text-uppercase text-white">+</button>';
  } else {
    return '<button disabled class="js-button_plus btn-xs btn-secondary block me-2 text-uppercase text-white">+</button>'
  }
}

function calculateCartTotal() {
  let totalField = document.querySelector('.js-total');
  let total = cart.reduce((prev, curr) => {
    return prev + (Math.round(curr.price * curr.qty * 100) / 100);
  }, 0);
  totalField.innerHTML = `$${total}`;
}

window.addEventListener('storage', (event) => {
  if (event.key === 'cart') {
    cart = JSON.parse(event.newValue);
    renderCart(cart);
    renderItems(dataArray);
  }
});