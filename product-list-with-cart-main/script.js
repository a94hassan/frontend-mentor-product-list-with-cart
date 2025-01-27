let dataset;
let cart = [];

async function init() {
  try {
    const response = await fetch('./data.json');
    dataset = await response.json();
    render();
    renderCart();
  } catch (error) {
    console.error(error);
  }
}


function render() {
  console.log(dataset);
  let desserts = document.getElementById('desserts');
  desserts.innerHTML = '';
  for (let i = 0; i < dataset.length; i++) {
    let dessert = dataset[i];
    let formattedPrice = formatPrice(dessert.price);
    desserts.innerHTML += /*html*/`
      <div class="dessert">
        <img src= ${dessert.image.desktop} alt= ${dessert.name} class="image" id="image-${i}">
        <div class="add-to-cart" id="quantity-control-${i}">
          <button class="add-btn" onclick="addToCart(${i}), changeButtonStyle(${i})"><img src="./assets/images/icon-add-to-cart.svg" alt="shopping cart with a plus in it">Add to Cart</button>
        </div>
        <span class="category">${dessert.category}</span>
        <h3>${dessert.name}</h3>
        <span class="price">${formattedPrice}</span>
      </div>
    `;
  }
}

function formatPrice(price) {
  return `$${price.toFixed(2)}`;
}

function renderCart() {
  let cartContent = document.getElementById('cart-content');
  cartContent.innerHTML = '';
  if (cart.length === 0) {
    cartContent.innerHTML = /*html*/`
      <img src="./assets/images/illustration-empty-cart.svg" alt="brown cake from which a piece is cut">
      <span class="empty-cart-text">Your added items will appear here</span>
    `;
  } else {
    for (let i = 0; i < cart.length; i++) {
      let item = cart[i];
      let calculatedPrice = item.quantity * item.price;
      let formattedPrice = formatPrice(item.price);
      let formattedCalculatedPrice = formatPrice(calculatedPrice);
      cartContent.innerHTML += /*html*/`
        <div class="cart-item">
          <div>
            <h4>${item.name}</h4>
            <div class="price-line">
              <span>${item.quantity}x</span>
              <span>@ ${formattedPrice}</span>
              <span>${formattedCalculatedPrice}</span>
            </div>
          </div>
          <img src="./assets/images/icon-remove-item.svg" alt="light brown x" onclick="removeFromCart(${i})">
        </div>
      `;
    }
    cartContent.innerHTML += /*html*/`
      <div class="cart-bottom">
        <div>
          <span>Order Total</span>
          <span id="total-price"></span>
        </div>
        <div>
          <img src="./assets/images/icon-carbon-neutral.svg" alt="green abstract tree symbol">
          <span>This is a <strong>carbon-neutral</strong> delivery</span>
        </div>
        <button class="order-btn" onclick="openModal()">Confirm Order</button>
      </div>
    `;
    calcTotal();
  }
  cartCounter();
}

function addToCart(i) {
  cart.push({ ...dataset[i], quantity: 1 });
  renderCart();
  toggleHighlightBorder(i);
}

function removeFromCart(i) {
  let index = dataset.findIndex(data => data.name === cart[i].name);
  toggleHighlightBorder(index);
  resetButtonStyle(i);
  cart.splice(i, 1);
  renderCart();
}

function changeButtonStyle(i) {
  let quantityControl = document.getElementById(`quantity-control-${i}`);
  let itemInCart = cart.find(item => item.name === dataset[i].name);
  quantityControl.innerHTML = /*html*/`
    <div class="quantity-control">
      <button onclick="decreaseQuantity(${i})"><img src="./assets/images/icon-decrement-quantity.svg" alt="minus symbol"></button>
      <span>${itemInCart.quantity}</span>
      <button onclick="increaseQuantity(${i})"><img src="./assets/images/icon-increment-quantity.svg" alt="plus symbol"></button>
    </div>
  `;
}

function resetButtonStyle(i) {
  let index = dataset.findIndex(item => item.name === cart[i].name);
  let quantityControl = document.getElementById(`quantity-control-${index}`);
  quantityControl.innerHTML = /*html*/`
    <button class="add-btn" onclick="addToCart(${index}), changeButtonStyle(${index})"><img src="./assets/images/icon-add-to-cart.svg" alt="shopping cart with a plus in it">Add to Cart</button>
  `;
}

function toggleHighlightBorder(i) {
  document.getElementById(`image-${i}`).classList.toggle('highlight-border');
}

function increaseQuantity(i) {
  let itemInCart = cart.find(item => item.name === dataset[i].name);
  itemInCart.quantity++;
  changeButtonStyle(i);
  renderCart();
}

function decreaseQuantity(i) {
  let index = cart.findIndex(item => item.name === dataset[i].name);
  if (cart[index].quantity > 1) {
    cart[index].quantity--;
    changeButtonStyle(i);
    renderCart();
  } else {
    removeFromCart(index);
  }
}

function cartCounter() {
  let count = 0;
  for (let i = 0; i < cart.length; i++) {
    let item = cart[i];
    count += item.quantity;
  }
  setCartCount(count);
}

function setCartCount(i) {
  let cartCount = document.getElementById('cart-count');
  cartCount.innerHTML = `Your Cart (${i})`;
}

function calcTotal() {
  let total = 0;
  for (let i = 0; i < cart.length; i++) {
    let item = cart[i];
    total += item.price * item.quantity;
  }
  setTotalPrice(total);
}

function setTotalPrice(i) {
  let total = document.getElementById('total-price');
  let orderTotal = document.getElementById('order-total');
  let formattedTotalPrice = formatPrice(i);
  total.innerHTML = formattedTotalPrice;
  orderTotal.innerHTML = formattedTotalPrice;
}

function toggleModal() {
  let modal = document.getElementById('modal');
  modal.classList.toggle('d-none');
}

function openModal() {
  renderOrder();
  toggleModal();
}

function closeModal() {
  toggleModal();
}

function renderOrder() {
  let orderContent = document.getElementById('order-content');
  orderContent.innerHTML = '';
  for (let i = 0; i < cart.length; i++) {
    let item = cart[i];
    orderContent.innerHTML += /*html*/`
      <div class="order-item">
        <div>
          <img src= ${item.image.thumbnail} alt= ${item.name}>
          <div class="order-item-info">
            <span>${item.name}</span>
            <div>
              <span>${item.quantity}x</span>
              <span>@ ${formatPrice(item.price)}</span>
            </div>
          </div>
        </div>
        <span>${formatPrice(item.quantity*item.price)}</span>
      </div>
    `;
  }
}
