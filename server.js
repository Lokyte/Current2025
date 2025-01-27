const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.static('public'));

// Routes
app.get('/api/:date?', (req, res) => {
    let dateString = req.params.date;

    // If no date is provided, use the current time
    if (!dateString) {
        const currentDate = new Date();
        return res.json({
            unix: currentDate.getTime(),
            utc: currentDate.toUTCString(),
        });
    }

    // Check if the date string is a Unix timestamp (number)
    if (!isNaN(dateString)) {
        dateString = parseInt(dateString);
    }

    const date = new Date(dateString);

    // Check if the date is valid
    if (isNaN(date.getTime())) {
        return res.json({ error: 'Invalid Date' });
    }

    // Return the Unix timestamp and UTC string
    res.json({
        unix: date.getTime(),
        utc: date.toUTCString(),
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});