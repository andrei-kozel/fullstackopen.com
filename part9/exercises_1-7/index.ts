import express from 'express';
import { calculateBmi } from './bmiCalculator';
const app = express()

app.get(`/bmi`, (req, res) => {
  const height: number = Number(req.query.height)
  const weight: number = Number(req.query.weight)

  if (!weight || !height) {
    res.status(400);
    res.send({ error: 'malformatted parameters' });
  }

  const result: string = calculateBmi(height, weight)
  res.send({ height, weight, bmi: result })
})

const PORT = 3003

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
})