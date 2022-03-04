import { v4 as uuid } from 'uuid';
import { Patient } from "./types";

export enum Gender {
  Male = 'male',
  Female = 'female'
}

type Fields = {
  name: unknown, dateOfBirth: unknown, ssn: unknown, occupation: unknown, gender: unknown
}

const toNewPatient = ({ name, dateOfBirth, ssn, gender, occupation }: Fields): Patient => {
  const newPatient: Patient = {
    id: generateId(),
    name: parseName(name),
    dateOfBirth: parseDateOfBirth(dateOfBirth),
    ssn: parseSsn(ssn),
    occupation: parseOccupation(occupation),
    gender: parseGender(gender)
  }
  return newPatient;
}

const generateId = () => {
  return uuid()
}

const parseName = (name: unknown): string => {
  if (!name || !isString(name)) {
    throw new Error('Missing or incorrect name');
  }
  return name;
};

const parseDateOfBirth = (dateOfBirth: unknown): string => {
  if (!dateOfBirth || !isString(dateOfBirth)) {
    throw new Error('Missing or incorrect date of birth');
  }
  return dateOfBirth;
}

const parseSsn = (ssn: unknown): string => {
  if (!ssn || !isString(ssn)) {
    throw new Error('Missing or incorrect ssn');
  }
  return ssn;
}

const parseOccupation = (occupation: unknown): string => {
  if (!occupation || !isString(occupation)) {
    throw new Error('Missing or incorrect occupation');
  }
  return occupation;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (param: any): param is Gender => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return Object.values(Gender).includes(param);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const parseGender = (gender: any): Gender => {
  if (!gender || !isString(gender) || !isGender(gender.toLowerCase())) {
    throw new Error(`Incorrect or missing gender: ${gender || ""}`);
  }
  return gender.toLowerCase() as Gender;
};

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
}



export default toNewPatient