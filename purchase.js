// Retrieve cart array from localStorage, or initialize as empty array if not found
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Function to fetch product data from the server
async function fetchProducts() {
    try {
        const response = await fetch("/api/product");
        if (!response.ok) {
            throw new Error('Failed to fetch product data');
        }
        const products = await response.json();
        return products;
    } catch (error) {
        console.error('Error fetching product data:', error);
        return [];
    }
}

async function generateProductButtons() {
    const products = await fetchProducts();
    const productButtonsContainer = document.getElementById("productButtons");

    products.forEach(product => {

        const button = document.createElement("button");
        button.textContent = `Purchase ${product.productname}`;
        button.setAttribute("data-product-id", product.id);
        button.addEventListener("click", () => handleProductButtonClick(product));
        productButtonsContainer.appendChild(button);
    });
}



function handleProductButtonClick(product) {

    // Add the selected product to the cart
    cart.push(product);
    // Store the updated cart array in localStorage
    localStorage.setItem('cart', JSON.stringify(cart));

    // Display product details
    document.getElementById("productId").textContent = `Product ID: ${product.id}`;
    if (product.productname) {
        document.getElementById("productName").textContent = `Product Name: ${product.productname}`;
    }
    document.getElementById("productPrice").textContent = `Price: ${product.price}`;
    document.getElementById("productOther").textContent = `Other data: ${JSON.stringify(product)}`;

    // Update the cart display
    displayCart();
}


function displayCart() {
    const cartList = document.getElementById("ShoppingCart");
    cartList.innerHTML = ""; // Clear previous contents

    console.log(cart);
    cart.forEach(product => {
        console.log(product);
        const listItem = document.createElement("li");
        listItem.textContent = `Product Name: ${product.productname} - Price: ${product.price}`;
        cartList.appendChild(listItem);
    });
}

function emptyCart(){
    
    cart = [];
    // Store the updated cart array in localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
}


purchase.addEventListener('click', () => {
    // Iterate over each item in the cart array
    cart.forEach(item => {
        // Construct the data object for the current item
        const data = {
            product: item.productname, // Assuming product name is stored in productname property
            price: item.price,
            orderid: item.orderid // Assuming order ID is stored in orderid property
        };

        // Send a POST request for the current item
        $.post("/api/purchased/create", data, function (response){
            console.log("Purchased:", response);
        });
        alert("Purchase successful! Thank you for ordering in bulk!")
    });

    // Clear the cart after all items have been processed
    emptyCart();   
});


// Add event listener to the toggle button
toggle.addEventListener('click', () => {
    ShoppingCart.hidden = !ShoppingCart.hidden;
    displayCart();
});

// Generate product buttons when the page loads
window.addEventListener("DOMContentLoaded", generateProductButtons);
