const categoryList = document.querySelector(".category-list");
const productList = document.querySelector(".product-list");
const sepetBtn = document.querySelector("#sepet");
const modal = document.querySelector(".modal-wrapper");
const closeBtn = document.querySelector("#close");
const modalList = document.getElementById("modal-list");
const fiyatSpan = document.querySelector('#fiyat')

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
                <button onclick="sepeteEkle({name:'${product.title}',id:'${product.id}',price:'${product.price}',amount:1})" >Sepete Ekle</button>
        `;
        productList.appendChild(productDiv);
      })
    );
}

// sepeti acma ve kapama
const basket=[];
let toplamFiyat = 0
function listBasket() {
     basket.forEach((item)=>{
      
      // SEPET ELEMANININ DIVINI OLUSTURMA
      const basketItem = document.createElement('div');
      basketItem.classList.add('sepetItem');
      basketItem.innerHTML = `
            <h2>${item.name}</h2>
            <h2>${item.price} TL</h2>
            <p>${item.amount}</p>
      `
      modalList.appendChild(basketItem);
      toplamFiyat += Number(item.price)*item.amount
      
     })
     fiyatSpan.innerText = toplamFiyat
}

sepetBtn.addEventListener("click", ()=>{
  // SEPETI ACAR
  toggleSepet();
  //sepete elemanlari ekler
  listBasket()
});
closeBtn.addEventListener("click", ()=>{
  //sepeti kapatir
  toggleSepet();
  //sepete elemanlari ekler
  modalList.innerHTML='';
});

function toggleSepet() {
  modal.classList.toggle("active");
}

// SEPETE ELEMAN EKLEME

function sepeteEkle(param) {
  const foundItem = basket.find((item)=>item.id == param.id);
  if (foundItem) {
    foundItem.amount++;
  } else {
    basket.push(param);
  }
}


