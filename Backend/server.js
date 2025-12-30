const express = require('express');
const app = require('./index');
const dotenv = require('dotenv');

dotenv.config();

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
}).on('error', (err) => {
  console.error("Server error:", err);
});


