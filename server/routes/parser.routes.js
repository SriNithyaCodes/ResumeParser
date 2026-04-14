const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const parserController = require('../controllers/parser.controller');

// Multer setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

router.post('/parse-resume', upload.single('resume'), parserController.parseResume);
router.get('/history', parserController.getHistory);
router.delete('/history/:id', parserController.deleteHistory);

module.exports = router;
