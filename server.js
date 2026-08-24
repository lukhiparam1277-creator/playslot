const express = require('express');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

// Body Parser & Static File Serving
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Define /admin route BEFORE express.static to prevent redirect to /admin/ (301)
app.get('/admin', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'admin', 'login.html'));
});

app.use(express.static(path.join(__dirname, 'public')));

// Clean Public Route Aliases
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

app.get('/register', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'register.html'));
});

app.get('/sports', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'sports.html'));
});

app.get('/turfs', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'venues.html'));
});

app.get('/venues', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'venues.html'));
});

// User Dashboard & Bookings Routes
app.get('/user/dashboard', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'user', 'dashboard.html'));
});

app.get('/user/bookings', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'my-bookings.html'));
});

// Turf Owner Application & Management Routes
app.get('/owner/apply', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'owner', 'apply.html'));
});

app.get('/owner/status', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'owner', 'status.html'));
});

app.get('/owner/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'owner', 'login.html'));
});

app.get('/owner/dashboard', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'owner', 'dashboard.html'));
});

// Hidden Super Admin Routes
app.get('/admin', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'admin', 'login.html'));
});

app.get('/admin/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'admin', 'login.html'));
});

app.get('/admin/dashboard', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'admin', 'dashboard.html'));
});

app.get('/admin/owner-requests', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'admin', 'owner-requests.html'));
});

// Custom 404 Handler
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, 'public', '404.html'));
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`====================================================`);
  console.log(`🚀 PlaySlot Running (Pure HTML, CSS & JavaScript)`);
  console.log(`👉 http://localhost:${PORT}`);
  console.log(`====================================================`);
});
