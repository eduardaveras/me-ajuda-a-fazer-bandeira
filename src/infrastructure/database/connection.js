const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const DB_FILE = path.join(__dirname, '..', '..', '..', 'crochet_projects.db');

const db = new sqlite3.Database(DB_FILE, (err) => {
    if (err) {
        return console.error('Error opening database', err.message);
    }

    console.log('Connected to the SQLite database.');

    db.serialize(() => {
        db.run("PRAGMA foreign_keys = ON;");
        db.run(`
            CREATE TABLE IF NOT EXISTS images (
                id TEXT PRIMARY KEY,
                image_data TEXT NOT NULL,
                width INTEGER NOT NULL,
                height INTEGER NOT NULL
            )
        `);
        db.run(`
            CREATE TABLE IF NOT EXISTS projects (
                id TEXT PRIMARY KEY,
                name TEXT NOT NULL,
                image_id TEXT NOT NULL,
                FOREIGN KEY (image_id) REFERENCES images(id)
            )
        `); 
    });
});

module.exports = db;