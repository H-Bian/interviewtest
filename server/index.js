require("dotenv").config();
require('./db/db')
const express = require("express");
const app = express();
const cors = require("cors");
const router = require('./Routes/router')
const bodyParser = require('body-parser')
const port = 8005;
app.use(cors());
// middleware

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());
app.use("/img", express.static("./img"))
app.use(router);
app.get("/", (req, res) => { res.send("xxxx") })
app.listen(port, () => {
    console.log(`http://localhost:${port}/`)
})
