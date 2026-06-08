// backend/server.js
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

// Import Routes
const bioRoutes = require('./routes/bioRoutes');

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

// Gắn các đường dẫn API
app.use('/api/bio', bioRoutes); // Kích hoạt Route vừa tạo

// API Test
app.get('/api/health', (req, res) => {
    res.status(200).json({ message: 'Server backend đang hoạt động trơn tru!' });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`🔥 Server đang chạy tại http://localhost:${PORT}`);
});