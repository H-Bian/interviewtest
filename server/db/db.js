const mysql = require("mysql2")
const conn = mysql.createConnection({

    host: "localhost",
    user: "root",
    password: "M_2d930705!",
    database: "FinalPract"

});
conn.connect((error) => {
    if (error) {
        throw error;
    }
    else {
        console.log("database connect!")

    }
})
module.exports = conn
