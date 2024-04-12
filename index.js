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

/*db.run('CREATE TABLE IF NOT EXISTS Posts(' +
    'postID INTEGER PRIMARY KEY AUTOINCREMENT, ' +
    'title TEXT, ' +
    'description TEXT, ' +
    'likes INTEGER DEFAULT 0, ' + 
    'userID INTEGER, ' +
    'FOREIGN KEY(userID) REFERENCES Users(userID)' +
    ')'
);*/

/*db.run('INSERT INTO Posts (title, description, userID) VALUES (?, ?, ?)', ['Пилешка супа', 'В голяма тенджера слагате около 2 литра вода. добавяте пилешкото месо и сол на вкус (около 1/2 чаена лъжица). Колкото повече е пилешкото месо, толкова по-силен ще стане бульонът и толкова по-вкусна ще стане супичката. Ако пък имате баба на село, или пък някаква друга връзка със село е най-добре да си вземете едно домашно пиле, тогава супата ще стане много по-ароматна и със сигурност ще е много по-вкусна!  Имайте предвид обаче, е домашното пиле трябва да ври поне час, за да се свари.По време на варенето на пилето най-вероятно ще се образува пяна, която трябва да отстраните. След като се свари пилето извадете месото от бульона и го прецедете. А кога е сварено пилешкото месо ще разберете като пробвате с виличка. Когато лесно се отделя от костите, значи е готово.Нарязвате зеленчуците на малки кубчета. Към бульона добавете първо моркова и лука. След като  поврят  5 минути добавете и нарязаните на дребно картофи, а след още 5 минути добавете и натрошеното фиде и варете до пълно сваряване на фидето и картофите.Обезкостете свареното пилешко месо и го накъсайте на дребни парченца, които добавете към супата. Накрая, след като свалите пилешката супа от котлона поръсете със ситно нарязан магданоз. Не е необходимо пилешката супа да ври с магданоза, така той остава свеж, не губи от полезните си вещества, а същевременно овкусява достатъчно добре.', 2], (err) => {
    if (err) return console.error(err.message);

    console.log("post has been added");
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