// script.js
document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        message: document.getElementById('message').value,
    };

    fetch('http://localhost:3000/api/orders', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
    })
    .then(response => response.text())
    .then(data => {
        alert('Terima kasih! Pesan Anda telah dikirim.');
        console.log('Success:', data);
        fetchOrders(); // Panggil fetchOrders untuk memperbarui daftar pesanan
    })
    .catch((error) => {
        console.error('Error:', error);
    });
});

// Mengambil dan menampilkan data pesanan
function fetchOrders() {
    fetch('http://localhost:3000/api/orders')
    .then(response => response.json())
    .then(orders => {
        const orderList = document.getElementById('orderList');
        orderList.innerHTML = ''; // Kosongkan daftar sebelum mengisi

        orders.forEach(order => {
            const li = document.createElement('li');
            li.className = 'bg-white p-4 rounded shadow mb-4';
            li.innerHTML = `
                <p><strong>Nama:</strong> ${order.name}</p>
                <p><strong>Email:</strong> ${order.email}</p>
                <p><strong>Pesan:</strong> ${order.message}</p>
            `;
            orderList.appendChild(li);
        });
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}

// Panggil fetchOrders saat halaman dimuat
document.addEventListener('DOMContentLoaded', fetchOrders);