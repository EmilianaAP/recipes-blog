const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./mock.db', sqlite3.OPEN_READWRITE, (err) => {
    if (err) return console.error(err.message);

    console.log('Connection successful');
});

db.run('CREATE TABLE IF NOT EXISTS Users(userID INTEGER PRIMARY KEY AUTOINCREMENT, email TEXT UNIQUE, password TEXT, name TEXT, role TEXT)');
//db.run('CREATE TABLE IF NOT EXISTS Posts(postID INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, description TEXT, userID TEXT)');

//const sql = 'INSERT INTO Users (email, password, name, role) VALUES(?,?,?,?)';

/*db.run(sql, ['ema.andr33va@gmail.com', '12341234', 'ema', 'admin'], (err) => {
    if (err) return console.error(err.message);

    console.log("A new row has been created");
});*/

const sql = 'SELECT * FROM Users';

db.all(sql, [], (err, rows) => {
    if (err) return console.error(err.message);

    rows.forEach((row) => {
        console.log(row);
    })
})

db.run('CREATE TABLE IF NOT EXISTS Posts(' +
    'postID INTEGER PRIMARY KEY AUTOINCREMENT, ' +
    'title TEXT, ' +
    'description TEXT, ' +
    'likes INTEGER DEFAULT 0, ' + 
    'userID INTEGER, ' +
    'FOREIGN KEY(userID) REFERENCES Users(userID)' +
    ')'
);

/*db.run('INSERT INTO Posts (title, description, userID) VALUES (?, ?, ?)', ['Ratatouille', 'Нарязваме патладжаните на колелца и поръсваме със сол. Оставяме да престоят 20 минути.Измиваме зеленчуците и режем на кръгчета - тиквичките, доматите, лука и чушките. Мием патладжана и го отцеждаме от горчивата вода. Овкусяваме зеленчуците със сол и черен пипер. В намазана със зехтин тава редим от края на тавичката към средата под формата на спирала. Редим кръгче тиквичка, лук, домат, патладжан и чушка.Ако зеленчуците са ни повече, ги редим прави колелцата, а ако са по-малко по-полегато. Накрая поръсваме с мащерка и зехтин. Печем на фурна за 40 минути при 180- 200 градуса. Ястието рататуй се сервира топло!', 1], (err) => {
    if (err) return console.error(err.message);

    console.log("Ratatouille post has been added");
});*/

const sql1 = 'SELECT * FROM Posts';

/*const postIdsToDelete = [8];

// Iterate over the array of post IDs to delete them
postIdsToDelete.forEach(postId => {
    const sql = 'DELETE FROM Posts WHERE postID = ?';

    db.run(sql, [postId], function(err) {
        if (err) return console.error(`Error deleting post with ID ${postId}:`, err.message);

        console.log(`Post with ID ${postId} deleted successfully`);
    });
});*/

db.all(sql1, [], (err, rows) => {
    if (err) return console.error(err.message);

    rows.forEach((row) => {
        console.log(row);
    })
})

db.close((err) => {
    if (err) return console.error(err.message);
})