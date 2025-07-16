const express = require("express");
const twilio = require("twilio");
require("dotenv").config();

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.post("/call", (req, res) => {
    const client = twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH);
    const to = process.env.TO_NUMBER;
    const from = process.env.FROM_NUMBER;
    const url = process.env.TWIML_URL;

    client.calls
        .create({ to, from, url })
        .then(call => {
            console.log("Call SID:", call.sid);
            res.send("Calling...");
        })
        .catch(err => {
            console.error(err);
            res.status(500).send("Call failed");
        });
});

app.listen(3000, () => {
    console.log("Twilio alarm server started on port 3000");
});
