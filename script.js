
const API_URL = "https://ai-study-planner-api-ti9f.onrender.com/ask";

// Welcome screen → Dashboard
const getStarted = document.getElementById("getStarted");
const welcomeScreen = document.getElementById("welcomeScreen");
const appDashboard = document.getElementById("appDashboard");

if (getStarted) {
    getStarted.addEventListener("click", () => {
        welcomeScreen.hidden = true;
        appDashboard.hidden = false;
    });
}

// Add Study Task
const addTaskButton = document.getElementById("addTask");
const taskList = document.getElementById("taskList");

if (addTaskButton) {
    addTaskButton.addEventListener("click", () => {
        const subject = document.getElementById("subject").value;
        const date = document.getElementById("date").value;
        const time = document.getElementById("time").value;

        if (!subject || !date || !time) {
            alert("Please select subject, date and time.");
            return;
        }

        const task = document.createElement("div");
        task.className = "task-item";
        task.textContent = `${subject} - ${date} at ${time}`;

        taskList.appendChild(task);

        document.getElementById("subject").value = "";
        document.getElementById("date").value = "";
        document.getElementById("time").value = "";
    });
}

// AI Doubt Solver
const askAIButton = document.getElementById("askAI");

if (askAIButton) {
    askAIButton.addEventListener("click", async () => {
        const question = document.getElementById("doubtQuestion").value.trim();
        const answerBox = document.getElementById("aiAnswer");

        if (!question) {
            answerBox.textContent = "Please type your question first.";
            return;
        }

        answerBox.textContent = "AI is thinking...";

        askAIButton.disabled = true;

        try {
            const response = await fetch(API_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ question: question })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Server error");
            }

            answerBox.textContent =
                data.answer || data.message || "No answer received.";

        } catch (error) {
            console.error("AI Error:", error);
            answerBox.textContent =
                "Could not get an answer. Please try again later.";
        } finally {
            askAIButton.disabled = false;
        }
    });
}
