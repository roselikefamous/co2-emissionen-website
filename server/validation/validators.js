const { body, validationResult } = require('express-validator');

exports.validateInput = [
  body('name').isAlpha('de-DE').withMessage('Name darf nur Buchstaben enthalten'),
  body('email').isEmail().withMessage('Ungültige Email-Adresse'),
  body('message').isLength({ max: 500 }).withMessage('Nachricht zu lang'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];