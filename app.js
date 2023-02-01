// Selecting elements
const menuBtn = document.querySelector('.menu-btn'),
  menuCloseBtn = document.querySelector('.close-btn'),
  cartBtn = document.querySelector('.cart-btn'),
  cartContainer = document.querySelector('.cart-container'),
  cartBody = document.querySelector('.cart-body'),
  nextBtn = document.querySelector('.ar-right'),
  prevBtn = document.querySelector('.ar-left'),
  plusBtn = document.querySelector('.plus-btn'),
  minusBtn = document.querySelector('.minus-btn'),
  amountInput = document.getElementById('quantity'),
  addToCartBtn = document.querySelector('.add-to-cart'),
  imagedisplay = document.querySelector('.product-img'),
  thumbnailsContainer = document.querySelector('.imgs-container'),
  displayScreen = document.querySelector('.display-images'),
  displayImg = document.querySelector('.display-img'),
  displayClose = document.querySelector('.d-close'),
  displayNext = document.querySelector('.d-ar-right'),
  displayPrev = document.querySelector('.d-ar-left'),
  displayThumbs = document.querySelector('.display-imgs-container');



// Setup

// one product images array
imagesArr = [
  {
    img: "./images/image-product-1.jpg",
    thumb: "./images/image-product-1-thumbnail.jpg"
  },
  {
    img: "./images/image-product-2.jpg",
    thumb: "./images/image-product-2-thumbnail.jpg"
  },
  {
    img: "./images/image-product-3.jpg",
    thumb: "./images/image-product-3-thumbnail.jpg"
  },
  {
    img: "./images/image-product-4.jpg",
    thumb: "./images/image-product-4-thumbnail.jpg"
  }
]

let currentImg = 0;
let thumbnails= [];
let displayThumbnails = [];


// add thumbnails
imagesArr.forEach((img, index) => {
  let thumb = document.createElement('img')
  if (index == currentImg) {
    thumb.className = "active";
  }
  thumb.src = img.thumb;
  thumbnailsContainer.appendChild(thumb);
  thumbnails.push(thumb)
})

// add display thumbs
imagesArr.forEach((img, index) => {
  let thumb = document.createElement('img')
  if (index == currentImg) {
    thumb.className = "active";
  }
  thumb.src = img.thumb;
  displayThumbs.appendChild(thumb);
  displayThumbnails.push(thumb);
})


// Handling menu toggle
menuBtn.addEventListener('click', (e) => {
  e.currentTarget.parentElement.classList.add('active');
  menuCloseBtn.addEventListener('click', (e) => {
    e.currentTarget.parentElement.classList.remove('active');
  })
})

// Handling Cart toggle
cartBtn.addEventListener('click', () => {
  cartContainer.classList.toggle('active');
})


// Handling image switching (nextBtn | prevBtn | thumbnail click)
nextBtn.addEventListener('click', () => {
  changePic("next");
})
prevBtn.addEventListener('click', () => {
  changePic("prev");
})
displayNext.addEventListener('click', () => {
  changePic("next");
})
displayPrev.addEventListener('click', () => {
  changePic("prev");
})

// clicking on a thumbnail
thumbnails.forEach((thumb, index) => {
  thumb.addEventListener('click', () => {

    thumbnails.forEach((thumb) => {
      thumb.classList.remove('active')
    })
    displayThumbnails.forEach((thumb) => {
      thumb.classList.remove('active')
    })

    imagedisplay.src = imagesArr[index].img;
    displayImg.src = imagesArr[index].img;
    thumb.classList.add('active');
    displayThumbnails[index].classList.add('active');
  })
})
displayThumbnails.forEach((thumb, index) => {
  thumb.addEventListener('click', () => {

    displayThumbnails.forEach((thumb) => {
      thumb.classList.remove('active')
    })
    thumbnails.forEach((thumb) => {
      thumb.classList.remove('active')
    })

    displayImg.src = imagesArr[index].img;
    imagedisplay.src = imagesArr[index].img;
    thumb.classList.add('active');
    thumbnails[index].classList.add('active');
  })
})

// funciton to go next or prev
function changePic(sign) {
  // switch image
  if (sign == "next") {
    currentImg = currentImg == imagesArr.length - 1 ? 0 : currentImg + 1;
  } else if (sign == "prev") {
    currentImg = currentImg == 0 ?  imagesArr.length -1 : currentImg - 1;
  }
  imagedisplay.src = imagesArr[currentImg].img;
  displayImg.src = imagesArr[currentImg].img;

  // update active thumbnail
  thumbnails.forEach((thumb) => {
    thumb.classList.remove('active')
  })
  displayThumbnails.forEach((thumb) => {
    thumb.classList.remove('active')
  })
  displayThumbnails[currentImg].classList.add('active');
  thumbnails[currentImg].classList.add('active');
}

// handling product Image display
imagedisplay.addEventListener('click' , () => {
  displayScreen.classList.add('active');

  // close when clicking any where outside images
  document.addEventListener('click', (e) => {
    if (e.target.classList.contains('display-images')) {
      displayScreen.classList.remove('active');
    }
  })
  displayClose.addEventListener('click', () => {
    displayScreen.classList.remove('active');
  })
})


// Handle the Quantity Scripts

plusBtn.addEventListener('click', () => {
  amountInput.value = parseInt(amountInput.value) + 1;
})
minusBtn.addEventListener('click', () => {
  amountInput.value = (parseInt(amountInput.value) - 1) >= 0? (parseInt(amountInput.value) - 1) : 0;
})
amountInput.addEventListener('input', () => {
  amountInput.value = parseInt(amountInput.value) > 0 ? parseInt(amountInput.value) : 0
})

// Handle adding to cart

addToCartBtn.addEventListener('click', () => {
  let btn = document.createElement('button');
  btn.className = 'checkout';
  btn.textContent = "Checkout";
  btn.addEventListener('click', done);

  if (parseInt(amountInput.value) > 0) {
    if (cartBody.children.length == 1) {
      cartBody.children[0].remove();
      cartBody.appendChild(btn);
    }
    let product = document.createElement('div');
    product.className = "cart-product";
  
    product.innerHTML = `
        <div class="cart-product-info">
          <img src="./images/image-product-1.jpg" alt="" class="cart-img">
          <div class="product-text">
            <span class="product-name">Fall Limited Edition Sneakers</span>
            <span class="product-price">$125.00 × ${amountInput.value} <span>${(parseInt(amountInput.value) * 125).toFixed(2)}</span></span>
          </div>
          <img src="./images/icon-delete.svg" alt="delete" class="delete-btn">
        </div>
    `;
    cartBody.insertBefore(product, document.querySelector('.checkout'));
    cartContainer.classList.add('active');
    deleteProduct(product)
  }
})

// Handle delete Btn
function deleteProduct(prod) {
  let deleteBtn = prod.querySelector('.delete-btn');
  deleteBtn.addEventListener('click', () => {
    if (cartBody.children.length == 2) {
      cartBody.children[1].remove();
      let empty = document.createElement("span");
      empty.style.textAlign = "center";
      empty.textContent = "Your Cart is Empty";
      cartBody.appendChild(empty);
    }
    prod.remove();
  })

}

// Handle Checkout btn

function done() {
  let products = [...cartBody.children];

  products.forEach((elem) => {
    elem.remove();
  })
  let empty = document.createElement("span");
  empty.style.textAlign = "center";
  empty.textContent = "Your Cart is Empty";
  cartBody.appendChild(empty);
}