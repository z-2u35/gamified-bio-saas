// backend/models/BioPage.js
const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({
    itemId: { type: String, required: true }, // Ví dụ: 'radio', 'poster', 'bowl'
    x: { type: Number, required: true },      // Tọa độ X
    y: { type: Number, required: true },      // Tọa độ Y
    actionType: { 
        type: String, 
        enum: ['LINK', 'VIDEO', 'TEXT', 'DONATE'],
        default: 'LINK'
    },
    actionValue: { type: String }, // URL đích hoặc nội dung text
    title: { type: String }        // Tooltip hiện ra khi hover
});

const BioPageSchema = new mongoose.Schema({
    username: { 
        type: String, 
        required: true, 
        unique: true,
        lowercase: true 
    }, // Dùng để làm đường dẫn: domain.com/username
    themeId: { 
        type: String, 
        default: 'spooky-diner' // Một giao diện mặc định mang hơi hướng bí ẩn, rùng rợn chút cho thú vị
    }, 
    items: [ItemSchema], // Danh sách các vật thể có gắn link trong phòng
    isPublished: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model('BioPage', BioPageSchema);