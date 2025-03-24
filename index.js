const express = require("express");
const app = express();
app.use(express.json());

app.post("/", (req, res) => {
    console.log("📩 Received SMS Data:", req.body);
    res.status(200).send("Received");
});

app.listen(3000, () => console.log("🚀 Server running on port 3000"));

