const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
require('dotenv').config();

const parserRoutes = require('./routes/parser.routes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Ensure uploads directory exists
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// Routes
app.use('/api', parserRoutes);

app.get('/', (req, res) => {
  res.send('HireLens AI Parser API is running...');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
