const categoryList = document.querySelector(".category-list");
const productList = document.querySelector(".product-list");
const sepetBtn = document.querySelector('#sepet');
const modal = document.querySelector('.modal-wrapper')
const closeBtn = document.querySelector('#close');


document.addEventListener("DOMContentLoaded", () => {
  fetchCategories();
  fetchProducts();
});
function fetchCategories() {
  fetch("https://api.escuelajs.co/api/v1/categories")
    .then((res) => res.json())
    .then((data) =>
      data.slice(0, 4).forEach((category) => {
        const categoryDiv = document.createElement("div");
        categoryDiv.classList.add("category");
        categoryDiv.innerHTML = `
         <img src="${category.image}" >
         <span>${category.name}</span>
         `;
        categoryList.appendChild(categoryDiv);
      })
    )
    .catch((err) => console.log(err));
}

function fetchProducts() {
  fetch("https://api.escuelajs.co/api/v1/products")
    .then((res) => res.json())
    .then((data) =>
      data.slice(0, 20).forEach((product) => {
        const productDiv = document.createElement("div");
        productDiv.classList.add("product");
        productDiv.innerHTML = `
        <img src='${product.images[0]}' >
            <p>${product.title}</p>
            <p>${product.category.name}</p>
            <div class="product-info">
                <span>${product.price}</span>
            <button>Sepete Ekle</button>
        `
        productList.appendChild(productDiv);
      })
    );
}

// sepeti acma ve kapama
sepetBtn.addEventListener('click',toggleSepet);
closeBtn.addEventListener('click',toggleSepet);

function toggleSepet(){
   modal.classList.toggle('active')
}

