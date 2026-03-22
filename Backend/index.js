const express = require('express');
const cors = require('cors');
const path = require('path');

const authRoutes = require('./routes/authRoutes');
const collectionRoutes = require('./routes/collectionRoutes');
const productRoutes = require('./routes/productRoutes');
const variantRoutes = require('./routes/variantRoutes');
const userRoutes = require('./routes/userRoutes');   // <- THIS LINE MUST EXIST

const app = express();
app.use(cors());
app.use(express.json());

// static uploads
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));


app.get('/', (req, res) => {
  res.send("Real Estate Backend Running 🚀");
});

app.get('/api/health', (req, res) => {
  res.json({ ok: true });
});

// mount routers (order not critical here)
app.use('/api/auth', authRoutes);
app.use('/api/collections', collectionRoutes);
app.use('/api/products', productRoutes);
app.use('/api/variants', variantRoutes);
app.use('/api/users', userRoutes);  // <- THIS LINE must be present

app.use((req, res, next) => {
  res.status(404).json({ ok: false, error: 'Not found' });
});


app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ ok: false, error: 'Server error' });
});

module.exports = app;
