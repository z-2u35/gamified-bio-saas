// backend/config/db.js
const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`🚀 MongoDB Atlas đã kết nối thành công: ${conn.connection.host}`);
    } catch (error) {
        console.error(`❌ Lỗi kết nối MongoDB: ${error.message}`);
        process.exit(1); // Dừng server nếu lỗi DB
    }
};

module.exports = connectDB;