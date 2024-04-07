import express from "express";
import session from "express-session";
import path from 'path';
import sqlite3 from 'sqlite3';

const app = express();
const port = 5000;

// Set up session middleware
app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true,
    // You can customize other options as needed
}));

const __dirname = path.dirname(new URL(import.meta.url).pathname);
const filePath = path.resolve(__dirname, 'main-page.html');

const db = new sqlite3.Database('./mock.db', sqlite3.OPEN_READWRITE, (err) => {
    if (err) return console.error(err.message);

    console.log('Connection successful');
});

app.use('/css', express.static(path.join(__dirname, 'css')));
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.sendFile(filePath);
});

app.get('/login-page.html', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'login-page.html'));
});

app.post('/login', (req, res) => {
    const { email, password } = req.body;

    // Check if the email exists in the database
    const sql = 'SELECT * FROM Users WHERE email = ?';
    db.get(sql, [email], (err, row) => {
        if (err) {
            console.error(err.message);
            return res.status(500).send('Error retrieving user from database');
        }

        if (!row) {
            return res.status(401).send('Invalid email or password');
        }

        // Check if the password matches
        if (row.password !== password) {
            return res.status(401).send('Invalid email or password');
        }

        // At this point, the user is authenticated
        // You can now create a session to manage the user's authentication status
        // For example, using express-session
        req.session.user = row; // Store user data in the session

        // Redirect to the profile page or any other page
        res.redirect('/profile-page.html');
    });
});

app.get('/current-user-id', (req, res) => {
    // Check if the user is authenticated
    if (req.session.user) {
        // If the user is authenticated, send back their ID
        res.json({ userId: req.session.user.userID });
    } else {
        // If the user is not authenticated, send an error response
        res.status(401).json({ error: 'User not authenticated' });
    }
});

app.get('/register-page.html', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'register-page.html'));
});

app.post('/register', (req, res) => {
    const { name, email, password } = req.body;
    // You can add further validation here if needed

    // Insert new user into the database
    const sql = 'INSERT INTO Users (email, password, name, role) VALUES (?, ?, ?, ?)';
    db.run(sql, [email, password, name, 'user'], function(err) {
        if (err) {
            // Check if the error is due to a duplicate email
            if (err.message.includes('UNIQUE constraint failed')) {
                res.status(400).send('Email address already exists');
            } else {
                console.error(err.message);
                res.status(500).send('Error inserting user into database');
            }
        } else {
            console.log(`New user inserted into database with ID: ${this.lastID}`);
            // Redirect to profile page or any other page as needed
            res.redirect('/profile-page.html');
        }
    });
});

app.get('/username/:userId', (req, res) => {
    const { userId } = req.params;
    const sql = 'SELECT name FROM Users WHERE userID = ?';

    db.get(sql, [userId], (err, row) => {
        if (err) {
            console.error(err.message);
            res.status(500).json({ error: 'Error retrieving username from database' });
        } else {
            if (row) {
                res.json({ username: row.name });
            } else {
                res.status(404).json({ error: 'User not found' });
            }
        }
    });
});

app.get('/posts', (req, res) => {
    const sql = 'SELECT * FROM Posts';

    db.all(sql, [], (err, posts) => {
        if (err) {
            console.error(err.message);
            res.status(500).json({ error: 'Error retrieving posts from database' });
        } else {
            res.json(posts);
        }
    });
});

app.get('/user-posts/:userId', (req, res) => {
    const userId = req.params.userId;
    const sql = 'SELECT * FROM Posts WHERE userID = ?';

    db.all(sql, [userId], (err, posts) => {
        if (err) {
            console.error(err.message);
            res.status(500).json({ error: 'Error retrieving user posts from database' });
        } else {
            res.json(posts);
        }
    });
});

app.get('/profile-page.html', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'profile-page.html'));
});

app.get('/add-recipe-page.html', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'add-recipe-page.html'));
});

app.get('/main-page.html', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'main-page.html'));
});

app.post('/add-recipe', (req, res) => {
    // Extract recipe data from the request body
    const { title, description, likes, userID } = req.body;

    // Insert the new recipe into the database
    const sql = 'INSERT INTO Posts (title, description, likes, userID) VALUES (?, ?, ?, ?)';
    db.run(sql, [title, description, likes, userID], function(err) {
        if (err) {
            console.error(err.message);
            res.status(500).send('Error inserting recipe into database');
        } else {
            console.log(`New recipe inserted into database with ID: ${this.lastID}`);
            res.status(200).send('Recipe added successfully');
        }
    });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
