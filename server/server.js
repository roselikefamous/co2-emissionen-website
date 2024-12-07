const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const { validateInput } = require('./validation/validators');

const app = express();
app.use(bodyParser.json());
app.use(helmet()); // Sicherheitsheaders

// Beispielroute mit Validierung
app.post('/submit', validateInput, (req, res) => {
  res.json({ success: true, message: 'Daten sicher empfangen', data: req.body });
});

app.listen(3000, () => console.log('Server läuft auf http://localhost:3000'));