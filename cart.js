document.addEventListener('DOMContentLoaded', () => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const addToCartButtons = document.querySelectorAll('button');
    const amountDisplay = document.getElementById('amount-display');
    const clearCartButton = document.getElementById('clear-cart');

    addToCartButtons.forEach((button, index) => {
        button.addEventListener('click', () => {
            const row = button.closest('tr');
            const productName = row.querySelector('h3').innerText;
            const quantity = row.querySelector('input').value;
            const price = row.querySelector('td:nth-child(6)').innerText.replace('₱', '');
            const size = row.querySelector('select').value;

            const product = {
                name: productName,
                quantity: parseInt(quantity),
                price: parseFloat(price),
                size: size
            };

            addToCart(product);
            updateTotalAmount();
        });
    });

    clearCartButton.addEventListener('click', () => {
        clearCart();
        updateTotalAmount();
    });

    function addToCart(product) {
        const existingProduct = cart.find(item => item.name === product.name && item.size === product.size);
        if (existingProduct) {
            existingProduct.quantity += product.quantity;
        } else {
            cart.push(product);
        }
        displayCart();
        localStorage.setItem('cart', JSON.stringify(cart));
    }

    function displayCart() {
        const cartTable = document.getElementById('cart-table');
        if (!cartTable) {
            createCartTable();
        } else {
            updateCartTable();
        }
    }

    function createCartTable() {
        const cartSection = document.createElement('section');
        cartSection.id = 'cart';
        cartSection.innerHTML = `
            <h2>Cart</h2>
            <table id="cart-table">
                <thead>
                    <tr>
                        <th>Product Name</th>
                        <th>Size</th>
                        <th>Quantity</th>
                        <th>Price</th>
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody></tbody>
            </table>
        `;
        document.body.insertBefore(cartSection, document.querySelector('footer'));
        updateCartTable();
    }

    function updateCartTable() {
        const cartTableBody = document.querySelector('#cart-table tbody');
        cartTableBody.innerHTML = '';
        cart.forEach(product => {
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
    }

    function updateTotalAmount() {
        const totalAmount = cart.reduce((total, product) => total + (product.price * product.quantity), 0);
        amountDisplay.innerText = `₱${totalAmount.toFixed(2)}`;
    }

    function clearCart() {
        cart.length = 0;
        localStorage.setItem('cart', JSON.stringify(cart));
        const cartTableBody = document.querySelector('#cart-table tbody');
        if (cartTableBody) {
            cartTableBody.innerHTML = '';
        }
        amountDisplay.innerText = '₱0.00';
    }

    // Initialize cart display and total amount on page load
    displayCart();
    updateTotalAmount();
});
