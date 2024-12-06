// Reference list for menu items
const bakeryItems = [
    {
        id: "croissant-butter",
        name: "Croissant",
        category: "Pastries",
        flavor: "Butter",
        price: 4.50
    },
    {
        id: "croissant-chocolate",
        name: "Croissant",
        category: "Pastries",
        flavor: "Chocolate",
        price: 4.50
    },
    {
        id: "croissant-almond",
        name: "Croissant",
        category: "Pastries",
        flavor: "Almond",
        price: 4.50
    },
    {
        id: "danish-berry",
        name: "Danish",
        category: "Pastries",
        flavor: "Berry",
        price: 5.00
    },
    {
        id: "danish-cheese",
        name: "Danish",
        category: "Pastries",
        flavor: "Cheese",
        price: 5.00
    },
    {
        id: "danish-apple",
        name: "Danish",
        category: "Pastries",
        flavor: "Apple",
        price: 5.00
    },
    {
        id: "cookie-chocolate-chip",
        name: "Chocolate Chip Cookie",
        category: "Cookies",
        flavor: "Classic",
        price: 2.00
    },
    {
        id: "cookie-macadamia",
        name: "Macadamia Nut Cookie",
        category: "Cookies",
        flavor: "Classic",
        price: 2.50
    },
    {
        id: "cupcake-vanilla",
        name: "Vanilla Cupcake",
        category: "Cupcakes",
        flavor: "Vanilla",
        price: 3.50
    },
    {
        id: "cupcake-chocolate",
        name: "Chocolate Cupcake",
        category: "Cupcakes",
        flavor: "Chocolate",
        price: 3.50
    }
];

// Cart array
let cart = [];

// Add item to cart
function addToCart(itemName, price) {
    const flavorSelect = document.getElementById(`${itemName.toLowerCase().replace(/\s+/g, '-')}-flavor`);
    const selectedFlavor = flavorSelect ? flavorSelect.value : "Default";

    // Check if the item already exists in the cart
    const existingItem = cart.find(cartItem => cartItem.name === itemName && cartItem.flavor === selectedFlavor);
    if (existingItem) {
        existingItem.quantity += 1; // Increment quantity
    } else {
        // Add new item to the cart
        cart.push({
            name: itemName,
            flavor: selectedFlavor,
            price: price,
            quantity: 1,
        });
    }

    alert(`${itemName} (${selectedFlavor}) has been added to your cart!`);
    updateCartDisplay();
}

// Update the cart display
function updateCartDisplay() {
    const cartItemsContainer = document.getElementById("cart-items");
    const cartTotalContainer = document.getElementById("cart-total");

    if (!cartItemsContainer || !cartTotalContainer) return; // Avoid errors if not on the cart page

    cartItemsContainer.innerHTML = ""; // Clear existing items
    let total = 0;

    cart.forEach((cartItem, index) => {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${cartItem.name}</td>
            <td>${cartItem.flavor}</td>
            <td>
                <input type="number" value="${cartItem.quantity}" min="1" data-index="${index}" onchange="updateQuantity(${index}, this.value)">
            </td>
            <td>$${(cartItem.price * cartItem.quantity).toFixed(2)}</td>
            <td>
                <button onclick="removeFromCart(${index})">Remove</button>
            </td>
        `;
        cartItemsContainer.appendChild(row);
        total += cartItem.price * cartItem.quantity;
    });

    cartTotalContainer.textContent = total.toFixed(2);
}

// Update item quantity
function updateQuantity(index, newQuantity) {
    if (newQuantity < 1) return;
    cart[index].quantity = parseInt(newQuantity, 10);
    updateCartDisplay();
}

// Remove item from cart
function removeFromCart(index) {
    cart.splice(index, 1); // Remove item by index
    updateCartDisplay();
}

// Proceed to checkout
function goToCart() {
    window.location.href = "cart.html";
}

// Ensure cart persists across pages
window.addEventListener("load", () => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
        cart = JSON.parse(storedCart);
        updateCartDisplay();
    }
});

window.addEventListener("beforeunload", () => {
    localStorage.setItem("cart", JSON.stringify(cart));
});
