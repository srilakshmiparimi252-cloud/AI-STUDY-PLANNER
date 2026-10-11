
const express = require("express");
const dotenv = require("dotenv");
const OpenAI = require("openai");
const cors = require("cors");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

app.post("/ask", async (req, res) => {
    try {
        const question = req.body.question;

        if (!question || !question.trim()) {
            return res.status(400).json({
                error: "Please enter your question."
            });
        }

        const response = await client.responses.create({
            model: "gpt-4.1-mini",
            input: question
        });

        res.json({
            answer: response.output_text
        });

    } catch (error) {
        console.error("AI error:", error.status, error.message);

        res.status(error.status || 500).json({
            error: error.message || "Unknown error"
        });
    }
});

const server = app.listen(3001, () => {
    console.log("AI backend running at http://localhost:3001");
});

server.on("close", () => {
    console.log("Backend server closed.");
});

server.on("error", (err) => {
    console.error("Server error:", err.message);
});