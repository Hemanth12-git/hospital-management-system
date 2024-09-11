import { createRouter, createWebHistory } from 'vue-router';
import { useUserStore } from '@/store/index'; 
import AdminPage from '@/views/AdminPage.vue';
import CreateDoctorPage from '@/components/CreateDoctorPage.vue';
import DoctorListPage from '@/views/DoctorListPage.vue';
import DiagnosisCard from '@/views/DiagnosisCard.vue'; 
import CreateDiagnosisPage from '@/views/CreateDiagnosisPage.vue';
import DoctorPage from '@/views/DoctorPage.vue'; 
import Login from '@/views/Login.vue';
import PatientPage from '@/views/PatientPage.vue';

const routes = [
  { path: '/', name: 'Login', component: Login }, 
  { path: '/admin', name: 'Admin', component: AdminPage },
  { path: '/doctor', name: 'Doctor', component: DoctorPage },
  {
    path: '/patient/:id',
    name: 'PatientPage',
    component: PatientPage,
    props: true, 
  },
  
  { path: '/create-doctor', name: 'create-doctor', component: CreateDoctorPage },
  { path: '/doctor-list', name: 'doctor-list', component: DoctorListPage },
  { path: '/diagnosis', name: 'diagnosis', component: DiagnosisCard },
  { path: '/create-diagnosis', name: 'create-diagnosis', component: CreateDiagnosisPage },

];

const router = createRouter({
  history: createWebHistory(),
  routes,
});


export default router;
