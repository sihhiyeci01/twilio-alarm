const express = require("express");
const twilio = require("twilio");
require("dotenv").config();

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const client = twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH);
const to = process.env.TO_NUMBER;
const from = process.env.FROM_NUMBER;

// 📞 POST /hello → C++'tan buraya veri geliyor
app.post("/hello", (req, res) => {
    const pcName = req.body.pcName || "Bilinmeyen bilgisayar";
    const twimlUrl = `http://twimlets.com/message?Message[0]=Merhaba! Bu bir uyarıdır. Bilgisayar adı: ${encodeURIComponent(pcName)}`;

    client.calls
        .create({ to, from, url: twimlUrl })
        .then(call => {
            console.log("POST Call SID:", call.sid);
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