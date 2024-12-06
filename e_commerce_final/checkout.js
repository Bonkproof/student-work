document.addEventListener("DOMContentLoaded", () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const cartContainer = document.querySelector("#checkout");

    if (cart.length === 0) {
        cartContainer.innerHTML = "<p>Your cart is empty. Please add items to your cart.</p>";
        return;
    }

    let totalAmount = 0;
    const cartItemsSection = document.createElement("section");
    cartItemsSection.innerHTML = "<h3>Your Order</h3><ul>";

    cart.forEach((item) => {
        const bakeryItem = bakeryItems.find((bItem) => bItem.id === item.id);
        if (bakeryItem) {
            const itemTotal = (item.quantity * bakeryItem.price).toFixed(2);
            totalAmount += parseFloat(itemTotal);
            cartItemsSection.innerHTML += `
                <li>${bakeryItem.name} - ${bakeryItem.flavor} x${item.quantity} - $${itemTotal}</li>
            `;
        }
    });

    cartItemsSection.innerHTML += `</ul><p><strong>Total: $${totalAmount.toFixed(2)}</strong></p>`;
    cartContainer.insertBefore(cartItemsSection, document.querySelector("#checkout-form"));
});

function processCheckout(event) {
    event.preventDefault(); // Prevent form submission

    const name = document.querySelector("#name").value;
    const address = document.querySelector("#address").value;
    const city = document.querySelector("#city").value;
    const zip = document.querySelector("#zip").value;
    const creditCard = document.querySelector("#credit-card").value;
    const expiryDate = document.querySelector("#expiry-date").value;
    const cvv = document.querySelector("#cvv").value;

    // Simple validation for fields (you can add more checks)
    if (!name || !address || !city || !zip || !creditCard || !expiryDate || !cvv) {
        alert("Please fill out all fields.");
        return;
    }

    // Simulate the checkout process (send order details to a server, etc.)
    console.log("Checkout successful:", {
        name,
        address,
        city,
        zip,
        creditCard,
        expiryDate,
        cvv
    });

    // Clear the cart from localStorage
    localStorage.removeItem("cart");

    // Redirect to homepage
    alert("Thank you for your purchase! Redirecting to the homepage.");
    window.location.href = "index.html"; // Redirect to homepage
}
