const express = require("express");
const cors = require('cors');
const jwt = require("jsonwebtoken");
const bodyParser = require('body-parser');
const router = express.Router();
const personSchema = require('../models/pdetails');
const mongoose = require('mongoose');
const Person = mongoose.model("person_detail", personSchema);
const secretKey = "THISISMYSECURITYKEYWHICHICANTGIVEYOU";

const app = express();
app.use(cors());
app.use(bodyParser.json());

router.post("/memologin", async(req, res) => {
    console.log("abcd");
    const { vehicleNumber, dob } = req.body;
    console.log(vehicleNumber, dob);

    try {
        const professor = await Person.findOne({
            no_plate: vehicleNumber

        });
        // console.log("faststst");
        console.log(professor);

        if (!professor) {
            return res.status(401).json({ error: "Incorrect Date of Birth" });
        } else if (professor) {
            //const passwordMatch = await bcrypt.compare(password, customer.password);
            //console.log(password);
            //console.log(customer.password);
            console.log(dob.toString());
            console.log(professor.date_of_birth);
            if (dob.toString() == professor.date_of_birth.toString()) {
                dobMatch = true;
                console.log("matchedd");
            }

            if (!dobMatch) {
                return res
                    .status(401)
                    .json({ error: "Incorrect Date of Birth" });
            }
            // dobMatch = false;
            const payload = {
                user: {
                    id: professor._id,
                    dob: professor.date_of_birth,
                },

            };
            const token = jwt.sign(payload, secretKey, { expiresIn: "1h" });
            res.cookie("token", token, { httpOnly: true });
            return res.status(200).json({ msg: "Login Successful", authToken: token });
        }
    } catch (error) {
        return res.status(401).json({ error: "Login Failed" });
    }
});


module.exports = router;