const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./mock.db', sqlite3.OPEN_READWRITE, (err) => {
    if (err) return console.error(err.message);

    console.log('Connection successful');
});

db.run('CREATE TABLE IF NOT EXISTS Users(email, password, role, userID)')

//const sql = 'INSERT INTO Users (email, password, role, userID) VALUES(?,?,?,?)';

/*db.run(sql, ['ema.andr33va@gmail.com', '12341234', 'admin', 0], (err) => {
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

db.close((err) => {
    if (err) return console.error(err.message);
})