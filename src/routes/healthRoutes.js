const express = require('express');
const { getUserById } = require('../services/userServices');

const router = express.Router();

router.get('/user/:id', async (req, res) => {
  try {
    const user = await getUserById(req.params.id);
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/check-symptoms', async (req, res) => {
  const { symptoms } = req.body;

  // Implement your symptom checking logic here
  const commonSymptoms = {
    fever: 'Flu',
    cough: 'Common Cold',
    headache: 'Migraine',
    sore_throat: 'Strep Throat',
  };

  const symptomList = symptoms.split(',').map(symptom => symptom.trim().toLowerCase());
  const diagnoses = symptomList.map(symptom => commonSymptoms[symptom] || 'Unknown');

  const result = {
    symptoms: symptomList,
    diagnoses: diagnoses,
  };

  res.json(result);
});

module.exports = router;