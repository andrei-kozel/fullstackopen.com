import cors from 'cors';
import express from 'express';
import diagnosesRouter from './routes/diagnoses';
import patientsRouter from './routes/patients';

const app = express()
app.use(cors())
app.use(express.json())
app.use('/api/diagnoses', diagnosesRouter)
app.use('/api/patients', patientsRouter)

const PORT = 3001;
app.get('/api/ping', (_req, res) => {
  res.send("pong")
})

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT} `)
})