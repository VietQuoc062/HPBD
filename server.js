const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Serve file tĩnh
app.use(express.static(path.join(__dirname)));

// route test
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// route khác nếu muốn (ví dụ API kiểm tra ngày sinh)
app.get('/check/:date', (req, res) => {
  const { date } = req.params;
  if (date === "15/11/2003") {
    res.json({ valid: true, message: "Chúc mừng sinh nhật!" });
  } else {
    res.json({ valid: false, message: "Ngày sinh không chính xác!" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
