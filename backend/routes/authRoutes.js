

const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const { registerUser, loginUser, getUserInfo } = require("../controllers/authController");
const upload = require("../middleware/uploadMiddleware");

const router = express.Router();

// User routes
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/getUser", protect, getUserInfo);

// Upload route
router.post('/upload-image', upload.single("profilePic"), (req, res) => {

    if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
    }

    // Make sure the image URL points to the correct location
    const profileUrl = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;
    res.status(200).json({ profileUrl });
});

module.exports = router;
