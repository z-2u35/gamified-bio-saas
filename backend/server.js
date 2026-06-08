// backend/server.js
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

// Load biến môi trường
dotenv.config();

// Kết nối Database
connectDB();

const app = express();

// Middleware
app.use(cors()); // Cho phép Frontend gọi API mà không bị chặn
app.use(express.json()); // Cho phép server đọc dữ liệu JSON gửi lên

// API Test
app.get('/api/health', (req, res) => {
    res.status(200).json({ message: 'Server backend đang hoạt động trơn tru!' });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`🔥 Server đang chạy tại http://localhost:${PORT}`);
});