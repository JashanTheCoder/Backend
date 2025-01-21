const express = require('express'); // Import Express

const app = express(); // Initialize Express App
const PORT = 3000; // Define the port

// Route for homepage
app.get('/', (req, res) => {
	res.send('Server is running!');
});

// Start the server
app.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}`);
});
