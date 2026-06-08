// backend/routes/bioRoutes.js
const express = require('express');
const router = express.Router();
const { getBioByUsername, updateBio } = require('../controllers/bioController');

// Route GET: Lấy data trang hiển thị
router.get('/:username', getBioByUsername);

// Route POST: Lưu dữ liệu từ Dashboard
router.post('/', updateBio);

module.exports = router;