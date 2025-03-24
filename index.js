const { PrismaClient } = require("@prisma/client");
const express = require("express");
require("dotenv").config();

const app = express();
app.use(express.json());

const prisma = new PrismaClient();

app.post("/", async (req, res) => {
    try {
        console.log("📩 Received SMS Data:", req.body);
        const { sender, message, timestamp } = req.body;

        await prisma.messages.create({
            data: {
                from: sender,
                time: new Date(timestamp),
                msg: message
            }
        });

        res.status(200).send("Received");
    } catch (e) {
        console.error("❌ Error saving message:", e);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

app.get("/", async (req, res) => {
    try {
        const { password } = req.query;
        if (password !== process.env.PASSWORD) {
            return res.status(401).json({ error: "Invalid password!" });
        }

        const messages = await prisma.messages.findMany({
            orderBy: { id: 'desc' },
            take: 20
        });

        res.json(messages);
    } catch (e) {
        console.error("❌ Error fetching messages:", e);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

app.listen(3000, () => console.log("🚀 Server running on port 3000"));