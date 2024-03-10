const db = require('./models/index');
const app = require('./app');

db.instance.sync({force: true}).then(async () => {
    console.log('Database connected an synchronized');

    await db.books.create({title: "Default Book", date: "2022-12-05"});

    app.listen(3000, () => {
        console.log('Server running on port 3000 !');
    });
}).catch((e) => {
    console.error(e);
});