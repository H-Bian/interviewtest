const db = require("../db/db");

module.exports = {
    async insert(req, res) {

        const { Fname } = req.body
        const { Lname } = req.body
        const { Email } = req.body
        const { Phone } = req.body
        const { filename } = req.file;
        const emailRegexp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
        var regExp = /^(\([0-9]{3}\) |[0-9]{3}-)[0-9]{3}-[0-9]{4}/;
        console.log(Email.length, "%%", emailRegexp.test(Email))
        if (Email.length < 5 && emailRegexp.test(Email) === false) {
            res.status(400).json({ success: false, result: "not valid email" })
        }
        if (Phone.length < 5 && regExp.test(Phone) === false) {
            res.status(400).json({ success: false, result: "not valid phone" })
        }
        else {
            // console.log("name", Fname, Lname, "phone", Phone, "file-name", filename, Email)
            const q = "INSERT INTO `weusetest` (`Fname`,`Lname`,`Email`,`Phone`,`Img`) VALUES (?,?,?,?,?)"
            const value = [Fname, Lname, Email, Phone, filename]
            const datas = {
                "Fname": Fname,
                "Lname": Lname,
                "Phone": Phone,
                "Email": Email,
                "img": filename
            }
            db.query(q, value, ((err, data) => {
                if (err) {
                    console.log("Inserting", err)
                } else {
                    console.log("Inserting success!!")
                    res.status(201).json({ success: true, result: datas })

                }
            }))
        }

    },
    async showContact(req, res) {
        const q = "SELECT * FROM `weusetest`"
        db.query(q, (err, data) => {
            if (err) {
                console.log("database select error", err)
            } else {
                res.status(201).json({ success: true, result: data })
            }
        })

    },
    async delete(req, res) {
        const q = `DELETE FROM weusetest WHERE id=?`
        const value = req.params.id

        db.query(q, value, (err, data) => {
            if (err) {
                console.log("backend***:", err)
            } else {
                console.log("backend success!!!")
                res.status(201).json({ status: 201, data: data })
            }
        })
    },
    async update(req, res) {
        const { id } = req.body
        const { Fname } = req.body
        const { Lname } = req.body
        const { Email } = req.body
        const { Phone } = req.body
        const { filename } = req.file;
        console.log(req.file)
        console.log("update~~~~name", Fname, Lname, "phone", Phone, "file-name", filename, Email)
        const emailRegexp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
        var regExp = /^(\([0-9]{3}\) |[0-9]{3}-)[0-9]{3}-[0-9]{4}/;
        console.log(Email.length, "%%", emailRegexp.test(Email))
        if (Email.length < 5 && emailRegexp.test(Email) === false) {
            res.status(400).json({ success: false, result: "not valid email" })
        }
        if (Phone.length < 5 && regExp.test(Phone) === false) {
            res.status(400).json({ success: false, result: "not valid phone" })
        }
        else {
            const q = `UPDATE weusetest SET  Fname=?, Lname=?, Email=?,Phone=?, Img=? WHERE id=?`
            const values = [Fname, Lname, Email, Phone, filename]
            db.query(q, [Fname, Lname, Email, Phone, filename, id], (err, data) => {
                if (err) {
                    console.log("backend***:", err)
                } else {
                    console.log("backend success!!!")
                    console.log(data)
                    res.status(201).json({ status: 201, update: data })
                }
            })
        }
    }


}
