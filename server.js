const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 8080;

// Serve tất cả file tĩnh
app.use(express.static(path.join(__dirname)));

// Trang chính
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
    console.log(`HPDB Web Service running on port ${PORT}`);
});
