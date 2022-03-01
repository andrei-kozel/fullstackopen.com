export type Gender = 'male' | 'female'

export interface DiagnosisEntry {
  code: string,
  name: string,
  latin?: string
}

export interface Patient {
  id: string,
  name: string,
  dateOfBirth: string,
  ssn: string,
  gender: string,
  occupation: string
}

export type NonSsnPatient = Omit<Patient, 'ssn'>