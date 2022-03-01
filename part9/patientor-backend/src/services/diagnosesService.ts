import diagnosesData from '../data/diagnoses.json'
import { DiagnosisEntry } from '../types'

const diagnoses: Array<DiagnosisEntry> = diagnosesData

const getEntries = (): Array<DiagnosisEntry> => {
  return diagnoses
}

export default { getEntries }