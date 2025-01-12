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
        <img src= ${dessert.image.desktop} alt= ${dessert.name} class="image">
        <div class="add-to-cart">
          <button onclick="addToCart(${i})"><img src="./assets/images/icon-add-to-cart.svg" alt="shopping cart with a plus in it">Add to Cart</button>
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

function addToCart(i) {
  let itemInCart = cart.find(item => item.name === dataset[i].name);
  if (itemInCart) {
    itemInCart.quantity++;
  } else {
    cart.push({ ...dataset[i], quantity: 1 });
  }
  console.table(cart);
  renderCart();
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
          <img src="./assets/images/icon-remove-item.svg" alt="light brown x">
        </div>
      `;
    }
  }
}


