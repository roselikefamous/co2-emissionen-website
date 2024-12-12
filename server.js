// Importieren der benötigten Module
const express = require("express");
const helmet = require("helmet");
const bodyParser = require("body-parser");
const path = require('path');

const app = express();

// Middleware hinzufügen
app.use(helmet()); // Sicherheitsheader aktivieren
app.use(bodyParser.json()); // JSON-Parsing für eingehende Anfragen

// POST-Endpunkt für das Kontaktformular
app.post("/submit", (req, res) => {
  const { name, email, message } = req.body;

  // Eingabevalidierung
  if (!name || !email || !message) {
    return res.status(400).json({ error: "Alle Felder müssen ausgefüllt sein" });
  }

  // Erfolgsnachricht zurückgeben
  res.json({ success: true, message: "Daten sicher empfangen" });
});
// Statische Dateien bereitstellen
app.use(express.static(path.join(__dirname)));

// Standard-Route für die index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});
// Server starten
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server läuft auf http://localhost:${PORT}`);
});