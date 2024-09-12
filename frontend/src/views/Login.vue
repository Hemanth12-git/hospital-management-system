<template>
  <div class="login-page">
    <AppHeader />
    <div class="login-content">
      <div class="login-form">
        <h2>Login</h2>
        <el-form :model="loginForm" ref="loginForm" label-width="120px">
          <el-form-item
            label="Username:"
            prop="username"
            :rules="[{ required: true, message: 'Please input your username', trigger: 'blur' }]">
            <el-input v-model="loginForm.username" placeholder="Username" />
          </el-form-item>
          <el-form-item
            label="Password:"
            prop="password"
            :rules="[{ required: true, message: 'Please input your password', trigger: 'blur' }]">
            <el-input v-model="loginForm.password" type="password" placeholder="Password" />
          </el-form-item>
          <el-form-item
            label="User Type:"
            prop="userType"
            :rules="[{ required: true, message: 'Please select a user type', trigger: 'change' }]">
            <el-select v-model="loginForm.userType" placeholder="Select user type">
              <el-option label="Admin" value="admin" />
              <el-option label="Doctor" value="doctor" />
              <el-option label="Patient" value="patient" />
            </el-select>
          </el-form-item>
          <el-form-item
            v-if="loginForm.userType === 'patient'"
            label="Patient ID:"
            prop="patientId"
            :rules="[{ required: true, message: 'Please input your patient ID', trigger: 'blur' }]">
            <el-input v-model="loginForm.patientId" placeholder="Patient ID" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="handleSubmit">Login</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import AppHeader from "@/components/AppHeader.vue";
import { useUserStore } from '@/store/index'; 

export default {
  components: {
    AppHeader
  },
  data() {
    return {
      loginForm: {
        username: "",
        password: "",
        userType: "",
        patientId: "" 
      }
    };
  },
  methods: {
    async handleSubmit() {
      const userStore = useUserStore();
      try {
        const { username, password, userType, patientId } = this.loginForm;
        // console.log(username)
        // console.log(password)
        // console.log(userType);
        const response = await userStore.login(username, password, userType);
        // console.log(response)
        const trimmeduserType = response.trimEnd();

        if (trimmeduserType === 'admin') {
          this.$router.push('/admin');
        } else if (trimmeduserType === 'doctor') {
          this.$router.push('/doctor');
        } else if (trimmeduserType === 'patient') {
          this.$router.push(`/patient/${patientId}`);
        }
      } catch (error) {
        console.error('Login failed:', error);
      }
    }
  }
};
</script>

<style scoped>
.login-page {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.login-content {
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
}

.login-form {
  max-width: 400px;
  width: 100%;
  padding: 20px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.login-form h2 {
  margin-bottom: 20px;
  text-align: center;
}
</style>
