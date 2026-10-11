
const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.post("/ask", async (req, res) => {
    try {
        const question = req.body.question;

        if (!question || !question.trim()) {
            return res.status(400).json({
                error: "Please enter your question."
            });
        }

        const response = await fetch(
            "http://localhost:11434/api/chat",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    model: "qwen2.5:3b",
                    messages: [
                        {
                            role: "user",
                            content: question
                        }
                    ],
                    stream: false
                })
            }
        );

        const data = await response.json();

        if (!response.ok) {
            return res.status(500).json({
                error: data.error || "Ollama request failed."
            });
        }

        res.json({
            answer: data.message.content
        });

    } catch (error) {
        console.error("AI error:", error.message);

        res.status(500).json({
            error: "Could not connect to Ollama. Please make sure Ollama is running."
        });
    }
});

app.listen(3001, () => {
    console.log("AI backend running at http://localhost:3001");
});
