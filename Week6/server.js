const express = require('express');
const path = require('path');
const { allowedNodeEnvironmentFlags } = require('process');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON bodies (for POST requests)
app.use(express.json());

// Serve static files from the "public" folder
app.use(express.static(path.join(__dirname, 'public')));

// Create a GET endpoint at /add
app.get('/add', (req, res) => {
// Parse the numbers from the query parameters
    const a = parseFloat(req.query.a);
    const b = parseFloat(req.query.b);
// Calculate the sum
    if (isNaN(a) || isNaN(b)) {
        return res.status(400).send("Invalid input");
    }
    const sum = a + b;
    res.send(`The sum of ${a} and ${b} is: ${sum}`);
})

// Optional: POST endpoint to add a new quote
app.listen(PORT, () => {
    console.log('App is now listening to user requests');
    console.log('Access this service at http://localhost:'+ PORT)
})