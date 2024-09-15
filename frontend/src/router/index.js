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
  { path: '/admin', name: 'Admin', component: AdminPage, meta: { requiresAuth: true } },
  { path: '/doctor', name: 'Doctor', component: DoctorPage, meta: { requiresAuth: true } },
  {
    path: '/patient/:id',
    name: 'PatientPage',
    component: PatientPage,
    props: true, 
    meta: { requiresAuth: true }
  },
  { path: '/create-doctor', name: 'create-doctor', component: CreateDoctorPage, meta: { requiresAuth: true } },
  { path: '/doctor-list', name: 'doctor-list', component: DoctorListPage, meta: { requiresAuth: true } },
  { path: '/diagnosis', name: 'diagnosis', component: DiagnosisCard, meta: { requiresAuth: true } },
  { path: '/create-diagnosis', name: 'create-diagnosis', component: CreateDiagnosisPage, meta: { requiresAuth: true } },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('authToken');
  if (to.meta.requiresAuth && !token) {
    alert('Your session has expired');
    next('/'); 
  } else {
    next(); 
  }
});

export default router;