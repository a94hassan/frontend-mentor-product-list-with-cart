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
    desserts.innerHTML += /*html*/`
      <div class="dessert">
        <h4>${dessert.name}</h4>
      </div>
    `;
  }
}


