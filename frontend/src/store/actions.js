import axios from 'axios';
import { useUserStore } from './index';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';
const LOGIN_API_URL = `${API_BASE_URL}/api/auth/login`;
const DOCTORS_API_URL = `${API_BASE_URL}/api/doctors/doctors`;
const DIAGNOSIS_API_URL = `${API_BASE_URL}/api/diagnosis/diagnosis`;
const PATIENTS_API_URL = `${API_BASE_URL}/api/patients/patients`; 

// Add the interceptor
axios.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken'); // Retrieve token from localStorage

  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`; // Add the token to the Authorization header
  }

  return config;
}, (error) => {
  return Promise.reject(error);
});


export const actions = {
  async fetchAlldiagnosis() {
    try {
      const response = await axios.get(DIAGNOSIS_API_URL);
      return response.data.data;
    } catch (error) {
      console.error('Error fetching diagnosis:', error);
      throw error;
    }
  },

  async createDiagnosis(diagnosis) {
    try {
      const data = {
        ...diagnosis,
        prescription: diagnosis.prescription
      };
      // console.log(data, 'diagnosis')
      const response = await axios.post(DIAGNOSIS_API_URL, data);
      console.log("----------------------------------")
      console.log(response.data);
      console.log('----------------------------')
      return response.data;
    } catch (error) {
      console.error('Error creating diagnosis:', error);
      throw error;
    }
  },

  async fetchDoctors() {
    try {
      const response = await axios.get(DOCTORS_API_URL);
      return response.data.data;
    } catch (error) {
      console.error('Error fetching doctors:', error);
      throw error;
    }
  },

  async fetchPatientData(patientId) {
    try {
      const response = await axios.get(`${PATIENTS_API_URL}/${patientId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching patient data:', error);
      throw error;
    }
  },

  async createPatient(patientData) {
    try {
      const response = await axios.post(PATIENTS_API_URL, patientData);
      // console.log(response.data, 'patient')
      return response.data;
    } catch (error) {
      console.error('Error creating patient:', error);
      throw error;
    }
  },

  async fetchDiagnosisByIds(diagnosisIds) {
    try {
      const diagnosis = await Promise.all(
        diagnosisIds.map(async (id) => {
          
          if (typeof id === 'number' || typeof id === 'string') {
            const response = await axios.get(`${DIAGNOSIS_API_URL}/${id}`);
            return response.data.data;
          } else {
            console.error("Invalid diagnosis ID:", id);
            throw new Error("Invalid diagnosis ID");
          }
        })
      );
      return diagnosis;
    } catch (error) {
      console.error("Error fetching diagnosis by IDs:", error);
      throw error;
    }
  },
  

  async login(username, password, userType) {
    try {
      const response = await axios.post(LOGIN_API_URL, { username, password, userType });
      // console.log(response)
      const userStore = useUserStore();
      
      if (response.status==200) {

        // console.log("djdnjdnjdjndnjdjjdddddddddddddjn");
        userStore.$state.username = response.data.data.username;
        // console.log(userStore.$state.username)
        userStore.$state.userType = response.data.data.userType;
        localStorage.setItem('authToken', response.data.data.authToken);

        return userType;
      } else {
        throw new Error('Login failed');
      }
    } catch (error) {
      console.error('Error during login:', error);
      throw error;
    }
  },

  async fetchDiagnosisByPatientId(patientId) {
    try {
      const response = await axios.get(`${PATIENTS_API_URL}/${patientId}/diagnosis`);
      console.log(response.data.data)
      
      return response.data.data; 
    } catch (error) {
      console.error('Error fetching diagnosis for patient:', error);
      throw error;
    }
  },

  async createDoctor(doctor) {
    try {
      const response = await axios.post(DOCTORS_API_URL, doctor);
      return response.data;
    } catch (error) {
      console.error('Error creating doctor:', error);
      throw error;
    }
  }
  
};
