import patientsData from '../data/patients.json';
import { NonSsnPatient, Patient } from '../types';

const patients: Array<Patient> = patientsData;

const getPatients = (): Array<Patient> => {
  return patients;
}

const getNonSsnPatients = (): Array<NonSsnPatient> => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation, }) => ({
    id, name, dateOfBirth, gender, occupation
  }))
}

const addPatient = (newPatient: Patient): Patient => {
  patients.push(newPatient)
  return newPatient;
}

export default { getPatients, getNonSsnPatients, addPatient };
