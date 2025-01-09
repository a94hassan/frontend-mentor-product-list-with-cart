let dataset;

async function init() {
  try {
    const response = await fetch('./data.json');
    dataset = await response.json();
    render();
  } catch (error) {
    console.error(error);
  }
}


function render() {
  console.log(dataset);
  let desserts = document.getElementById('desserts');
  for (let i = 0; i < dataset.length; i++) {
    let dessert = dataset[i];
    let fortmattedPrice = formatPrice(dessert.price);
    desserts.innerHTML += /*html*/`
      <div class="dessert">
        <img src= ${dessert.image.desktop} alt= ${dessert.name} class="image">
        <div class="add-to-cart">
          <button><img src="./assets/images/icon-add-to-cart.svg" alt="shopping cart with a plus in it">Add to Cart</button>
        </div>
        <span class="category">${dessert.category}</span>
        <h4>${dessert.name}</h4>
        <span class="price">${fortmattedPrice}</span>
      </div>
    `;
  }
}

function formatPrice(price) {
  return `$${price.toFixed(2)}`;
}


