let productList = document.getElementById('product-list');
let dataArray = [];

fetch("http://my-json-server.typicode.com/achubirka/db/products")
  .then((response) => response.json())
  .then((data) => {
    dataArray = [...data];
    renderItems(dataArray);
  });

function renderItems(arr) {
  let listItems = arr.map((item) => {
    return `
      <li class="mt-3 pb-3 border-bottom border-2">
          <h4>${item.name}</h4>
          <div>In stock ${item.available}</div>
          <div class="d-flex align-items-center pt-2">
              <div class="fs-5">12.99</div>
              <button class="btn btn-primary block ms-3 text-uppercase text-white">Add</button>
          </div>
      </li>
    `;
  }).join('');
  
  productList.innerHTML = listItems;
}