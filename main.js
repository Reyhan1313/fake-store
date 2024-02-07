let container = document.querySelector(".container");
let addbtn = document.querySelector(".add");
let counter = document.querySelector(".cart-count"); 
let card=document.querySelector(".single-pro");
let cart=document.querySelector(".cart"); 
let selectedkeeper = [];
let allpro = [];
let catrPro=[];

fetch('https://fakestoreapi.com/products')
  .then(res => res.json())
  .then(res => allpro = res)
  .then(res => render(allpro));






  




function render(product) {
  let template = product.map((item,index) => {
    return `
                   <div class="card">
                        <img src="${item.image}" alt="" class="card__image">
                        <div class="info">
                            <h2 class="">${item.title}</h2>
                            <div class="overlay">
                            <p class="price">${item.price}$ </p>  
                            <button  class="add"  onclick=" addto(${index})"> Add To Cart </button> 
                            <button class="single-btn"  onclick="singlepro(${index})" >  More </button> 
                            </div>
                        </div>
                        </div>
                    `
  }).join("")

  container.innerHTML = template; 
  addbtn = document.querySelectorAll(".add");

  for (const addbutton of addbtn) {
    addbutton.addEventListener("click", function () {
      Toastify({
        text: " Added to Cart ",
        duration: 3000,
        newWindow: false,
        close: true,
        gravity: "top",
        position: "left",
        stopOnFocus: true,
        style: {
          background: "gray",
        }
      }).showToast();
    })
  }

}


function singlepro(index){ 
  
 container.innerHTML="";

card.innerHTML= 


`  

<div class="single">  
<img src="${allpro[index].image}" alt="">  


<div class="single-info">   
<h2 class="title">${allpro[index].title}</h2> 
<h3 class="category">${allpro[index].category}</h3>
        <p class="price-sec">${allpro[index].price}</p>
        <p class="desc">${allpro[index].description}</p> 
</div> 

</div> 



`

}



function addto(index){ 
  fetch('https://fakestoreapi.com/carts', {
        method: "POST",
        body: JSON.stringify(
            {
                userId: 1,
                
                date: "2020-02-03",
                products: [{ productId: 5, quantity: 1 }, { productId: 1, quantity: 5 }]
            }
        )
    })
        .then(res => res.json())
        .then(json => console.log(json))
    if (!selectedkeeper.includes(index)) {
      selectedkeeper.push(index)
        counter.textContent = selectedkeeper.length;
    } else {
      selectedkeeper.splice(selectedkeeper.lastIndexOf(index), 1);
        counter.textContent--
    }
}
