const categoryList = document.querySelector('.category-list');

document.addEventListener("DOMContentLoaded",fetchCategories);
function fetchCategories(){
    fetch("https://api.escuelajs.co/api/v1/categories")
    .then((res)=>res.json())
    .then((data)=>
    data.slice(0, 4).forEach((category)=>{
         const categoryDiv = document.createElement("div");
         categoryDiv.classList.add("category");
         categoryDiv.innerHTML = `
         <img src="${category.image}" >
         <span>${category.name}</span>
         `;
         categoryList.appendChild(categoryDiv);
    }))
    .catch((err)=>console.log(err))
}
