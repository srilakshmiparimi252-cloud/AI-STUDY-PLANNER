const button = document.querySelector("#addTask");
const taskList = document.querySelector("#taskList");

button.addEventListener("click", function () {

    let subject = document.querySelector("#subject").value;
    let date = document.querySelector("#date").value;
    let time = document.querySelector("#time").value;

    if (subject === "" || date === "" || time === "") {
        alert("Please select subject, date and time.");
        return;
    }

    let taskBox = document.createElement("div");

    taskBox.innerHTML = `
        <p>
            📚 <b>${subject}</b><br>
            📅 Date: ${date}<br>
            ⏰ Time: ${time}
        </p>
    `;

    taskList.appendChild(taskBox);
});

const askAIButton = document.querySelector("#askAI");
const doubtQuestion = document.querySelector("#doubtQuestion");
const aiAnswer = document.querySelector("#aiAnswer");

askAIButton.addEventListener("click", async function () {
    const question = doubtQuestion.value.trim();

    if (question === "") {
        alert("Please type your doubt first.");
        return;
    }

    aiAnswer.textContent = "Thinking... Please wait.";
    askAIButton.disabled = true;

    try {
        const response = await fetch("http://localhost:3001/ask", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ question: question })
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || "Something went wrong.");
        }

        aiAnswer.textContent = data.answer;
    } catch (error) {
        aiAnswer.textContent =
            "Could not get an answer. Please check the server and API key.";
        console.error(error);
    } finally {
        askAIButton.disabled = false;
    }
});