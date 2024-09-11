<template>
  <div class="create-doctor-container">
    <el-card class="create-doctor-card">
      <h1 class="title">Create Doctor</h1>
      <el-form :model="doctor" ref="form" @submit.prevent="createDoctor">
        <el-form-item label="ID" :label-width="formLabelWidth">
          <el-input v-model="doctor.id" required />
        </el-form-item>
        <el-form-item label="Name" :label-width="formLabelWidth">
          <el-input v-model="doctor.name" required />
        </el-form-item>
        <el-form-item label="Specialization" :label-width="formLabelWidth">
          <el-input v-model="doctor.specialization" required />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="createDoctor">Create Doctor</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { ElForm, ElFormItem, ElInput, ElButton, ElCard } from 'element-plus';
import { actions } from '@/store/actions';  

export default {
  components: {
    ElForm,
    ElFormItem,
    ElInput,
    ElButton,
    ElCard,
  },
  data() {
    return {
      doctor: {
        id: '',
        name: '',
        specialization: '',
      },
      formLabelWidth: '120px',
    };
  },
  methods: {
    async createDoctor() {
      try {
        await actions.createDoctor(this.doctor);
        this.$message.success('Doctor created successfully!');
        this.$router.push({ name: 'Admin' });
      } catch (error) {
        console.error('Error creating doctor:', error);
        this.$message.error('Failed to create doctor.');
      }
    },
  },
};
</script>

<style scoped>
.create-doctor-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f4f4f4;
}

.create-doctor-card {
  width: 100%;
  max-width: 500px;
}

.title {
  text-align: center;
  margin-bottom: 20px;
  color: #333;
}

.el-form {
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
}

.el-form-item {
  margin-bottom: 15px;
}
</style>
