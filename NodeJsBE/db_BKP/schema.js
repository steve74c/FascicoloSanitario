// Require or import the dependencies
const fs = require('fs');
const sqlite3 = require('sqlite3').verbose();
// Read the SQL file
const dataSql = fs.readFileSync('./shemaDB.sql').toString();


function crea(db) {
  const dataSql = fs.readFileSync('./shemaDB.sql').toString();

  const dataArr = dataSql.toString().split(');');
  // db.serialize ensures that your queries are one after the other depending on which one came first in your `dataArr`
  db.serialize(() => {
    // db.run runs your SQL query against the DB
    db.run('PRAGMA foreign_keys=OFF;');
    db.run('BEGIN TRANSACTION;');
    // Loop through the `dataArr` and db.run each query
    dataArr.forEach((query) => {
      if(query) {
        // Add the delimiter back to each query before you run them
        // In my case the it was `);`
        query += ');';
        db.run(query, (err) => {
          if(err) throw err;
        });
      }
    });
    db.run('COMMIT;');
  });

}

module.exports = { crea };



