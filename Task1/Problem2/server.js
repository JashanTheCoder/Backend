const express = require('express');

const app = express();
const PORT = 3000;

// Middleware to log request details
app.use((req, res, next) => {
	const logDetails = {
		timestamp: new Date().toISOString(),
		ip: req.ip || req.connection.remoteAddress,
		url: req.originalUrl,
		protocol: req.protocol,
		method: req.method,
		hostname: req.hostname,
	};

	console.log(logDetails); // Print log to console

	next(); // Pass control to next middleware
});

// Route for homepage
app.get('/', (req, res) => {
	res.send('Middleware is working!');
});

// Start the server
app.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}`);
});
