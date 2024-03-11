import express from "express";
import path from 'path';

const app = express();
const port = 3000;

// Get the directory path of the current module
const __dirname = path.dirname(new URL(import.meta.url).pathname);
const filePath = path.resolve(__dirname, 'main-page.html');

app.use('/css', express.static(path.join(__dirname, 'css')));

app.get('/', (req, res) => {
    res.sendFile(filePath);
});

app.get('/login-page.html', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'login-page.html'));
});

app.get('/register-page.html', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'register-page.html'));
});

app.get('/profile-page.html', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'profile-page.html'));
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
