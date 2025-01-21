const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;
const logFilePath = path.join(__dirname, 'requests.log');

// Middleware to log request details to a file
app.use((req, res, next) => {
	const logDetails = {
		timestamp: new Date().toISOString(),
		ip: req.ip || req.connection.remoteAddress,
		url: req.originalUrl,
		protocol: req.protocol,
		method: req.method,
		hostname: req.hostname,
	};

	// Convert log details to JSON string and append to file
	fs.appendFile(logFilePath, JSON.stringify(logDetails) + '\n', (err) => {
		if (err) {
			console.error('Error writing to log file:', err);
		}
	});

	next();
});

// Route for homepage
app.get('/', (req, res) => {
	res.send('Logging requests to a file!');
});

// Start the server
app.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}`);
});
