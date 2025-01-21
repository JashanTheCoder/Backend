const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 3000;

// Function to check file size and rotate logs
function rotateLogs() {
	const logFilePath = path.join(__dirname, 'requests.log');

	// Check if the log file exists
	if (!fs.existsSync(logFilePath)) {
		// If the file doesn't exist, create it
		fs.writeFileSync(logFilePath, '');
		return; // Skip rotation for now
	}

	const stats = fs.statSync(logFilePath);
	const maxLogSize = 1 * 1024 * 1024; // 1MB file size limit for rotation

	if (stats.size > maxLogSize) {
		const timestamp = new Date().toISOString().replace(/:/g, '-'); // Format the timestamp for the archive file name
		const archiveFileName = `requests-${timestamp}.log`;
		const archiveFilePath = path.join(__dirname, archiveFileName);

		fs.renameSync(logFilePath, archiveFilePath); // Rename the log file to archive
		fs.writeFileSync(logFilePath, ''); // Create a new empty log file
	}
}

// Middleware to capture request details
app.use((req, res, next) => {
	const logDetails = {
		timestamp: new Date().toISOString(),
		ip: req.ip,
		url: req.originalUrl,
		protocol: req.protocol,
		method: req.method,
		hostname: req.hostname,
		query: req.query, // Capture query parameters
		headers: req.headers, // Capture request headers
		userAgent: req.get('User-Agent'), // Capture the user agent
	};

	// Perform log rotation before writing the new log
	rotateLogs();

	// Write log entry to the log file
	fs.appendFile('requests.log', JSON.stringify(logDetails) + '\n', (err) => {
		if (err) throw err;
	});

	next();
});

// Sample route
app.get('/', (req, res) => {
	res.send('Hello, world!');
});

app.listen(PORT, () => {
	console.log(`Server running on http://localhost:${PORT}`);
});
