<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>AI Study Planner</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <h1>📚 AI Study Planner</h1>
  <p>Plan your studies and solve your doubts with AI.</p>

  <h2>Add Study Task</h2>
  <select id="subject">
    <option>C Programming</option>
    <option>Mathematics</option>
    <option>Physics</option>
    <option>AI Tools</option>
  </select>
  <input type="date" id="taskDate">
  <input type="time" id="taskTime">
  <button id="addTask">Add Study Task</button>
  <ul id="taskList"></ul>

  <h2>🤖 AI Doubt Solver</h2>
  <textarea id="doubtQuestion" placeholder="Ask your question"></textarea>
  <button id="askAI">Ask AI</button>
  <p id="answer"></p>

  <script src="script.js"></script>
</body>
</html>
