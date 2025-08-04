const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// Serve static files (CSS, JS)
app.use(express.static(path.join(__dirname, 'public')));

// Root route with interactive UI
app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>ECS Demo App 🚀</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          background: linear-gradient(to right, #4facfe, #00f2fe);
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          margin: 0;
          color: white;
          text-align: center;
        }
        .container {
          background: rgba(0, 0, 0, 0.4);
          padding: 20px;
          border-radius: 10px;
          box-shadow: 0 4px 15px rgba(0,0,0,0.3);
        }
        h1 {
          font-size: 2rem;
        }
        button {
          padding: 10px 20px;
          font-size: 1rem;
          background-color: #ff9800;
          border: none;
          border-radius: 5px;
          color: white;
          cursor: pointer;
          margin-top: 15px;
        }
        button:hover {
          background-color: #e68900;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>Hello from ECS Demo App 🚀</h1>
        <p>This app is running inside an ECS container.</p>
        <button onclick="checkHealth()">Check Health</button>
        <p id="health-status"></p>
      </div>
      <script>
        async function checkHealth() {
          try {
            const res = await fetch('/health');
            const text = await res.text();
            document.getElementById('health-status').innerText = "Health: " + text;
          } catch (err) {
            document.getElementById('health-status').innerText = "Health: ERROR ❌";
          }
        }
      </script>
    </body>
    </html>
  `);
});

// Health check endpoint (used by ECS and UI)
app.get('/health', (req, res) => {
  res.status(200).send('Container is healthy! ✅');
});

// Start server
app.listen(port, () => console.log(`App running on port ${port}`));
