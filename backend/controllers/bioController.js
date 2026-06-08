// backend/controllers/bioController.js
const BioPage = require('../models/BioPage');

// Lấy thông tin trang Bio dựa vào username (Dành cho trang Public)
const getBioByUsername = async (req, res) => {
    try {
        const { username } = req.params;
        const bio = await BioPage.findOne({ username });

        if (!bio) {
            return res.status(404).json({ message: 'Không tìm thấy trang Bio này!' });
        }

        res.status(200).json(bio);
    } catch (error) {
        res.status(500).json({ message: 'Lỗi server', error: error.message });
    }
};

// Tạo mới hoặc cập nhật trang Bio (Dành cho Dashboard)
const updateBio = async (req, res) => {
    try {
        const { username, themeId, items, isPublished } = req.body;

        // Tìm theo username, nếu có thì update, chưa có thì tạo mới (upsert: true)
        const updatedBio = await BioPage.findOneAndUpdate(
            { username },
            { themeId, items, isPublished },
            { new: true, upsert: true, setDefaultsOnInsert: true }
        );

        res.status(200).json(updatedBio);
    } catch (error) {
        res.status(500).json({ message: 'Lỗi khi lưu trang Bio', error: error.message });
    }
};

module.exports = {
    getBioByUsername,
    updateBio
};