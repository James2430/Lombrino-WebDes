document.addEventListener('DOMContentLoaded', () => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartTableBody = document.querySelector('#cart-table tbody');
    const totalAmountDisplay = document.getElementById('total-amount');

    function displayCart() {
        cartTableBody.innerHTML = '';
        cart.forEach((product, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${product.name}</td>
                <td>${product.size}</td>
                <td>${product.quantity}</td>
                <td>₱${product.price.toFixed(2)}</td>
                <td>₱${(product.price * product.quantity).toFixed(2)}</td>
            `;
            cartTableBody.appendChild(row);
        });
        updateTotalAmount();
    }

    function updateTotalAmount() {
        const totalAmount = cart.reduce((total, product) => total + (product.price * product.quantity), 0);
        totalAmountDisplay.innerText = `Total Amount: ₱${totalAmount.toFixed(2)}`;
    }

    document.getElementById('confirm-order').addEventListener('click', () => {
        const paymentMethod = document.getElementById('payment-options').value;
        if (cart.length === 0) {
            alert('Your cart is empty. Please add items to your cart before confirming your order.');
            return;
        }
        if (paymentMethod === '') {
            alert('Please select a payment method.');
            return;
        }
        alert(`Order confirmed! Payment Method: ${paymentMethod}`);
        localStorage.removeItem('cart');
        window.location.href = 'OrderConfirmation.html';
    });

    displayCart();
});
