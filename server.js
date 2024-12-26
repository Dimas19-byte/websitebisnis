const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Koneksi ke MongoDB
mongoose.connect('mongodb://localhost:27017/orderDB', { useNewUrlParser: true, useUnifiedTopology: true });

const orderSchema = new mongoose.Schema({
    name: String,
    email: String,
    message: String
});

const Order = mongoose.model('Order', orderSchema);

// Route untuk menerima data pemesanan
app.post('/api/orders', (req, res) => {
    const newOrder = new Order(req.body);
    newOrder.save((err) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(201).send('Order saved successfully');
        }
    });
});

// Route untuk mengambil data pemesanan
app.get('/api/orders', (req, res) => {
    Order.find({}, (err, orders) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).json(orders);
        }
    });
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
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