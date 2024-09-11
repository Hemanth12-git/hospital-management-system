<template>
  <div class="create-diagnosis">
    <AppHeader />
    <div class="form-container">
      <el-form :model="form" @submit.native.prevent="handleSubmit" class="form">
        <!-- Patient Details -->
        <el-form-item label="Patient ID" :label-width="formLabelWidth">
          <el-input v-model="form.patientId" required />
        </el-form-item>
        <el-form-item label="Patient Name" :label-width="formLabelWidth">
          <el-input v-model="form.patientName" required />
        </el-form-item>
        <el-form-item label="Patient Age" :label-width="formLabelWidth">
          <el-input v-model="form.patientAge" type="number" required />
        </el-form-item>
        <el-form-item label="Patient Gender" :label-width="formLabelWidth">
          <el-select v-model="form.patientGender" placeholder="Select gender" required>
            <el-option label="Male" value="Male" />
            <el-option label="Female" value="Female" />
            <el-option label="Other" value="Other" />
          </el-select>
        </el-form-item>
        <el-form-item label="Doctor ID" :label-width="formLabelWidth">
          <el-input v-model="form.doctorId" required />
        </el-form-item>

        <!-- Diagnosis Details -->
        <el-form-item label="Diagnosis ID" :label-width="formLabelWidth">
          <el-input v-model="form.diagnosisId"  />
        </el-form-item>
        <el-form-item label="Disease Name" :label-width="formLabelWidth">
          <el-input v-model="form.disease" required />
        </el-form-item>
        <el-form-item label="Severity" :label-width="formLabelWidth">
          <el-select v-model="form.severity" placeholder="Select severity" required>
            <el-option label="Casual" value="Casual" />
            <el-option label="Moderate" value="Moderate" />
            <el-option label="Severe" value="Severe" />
          </el-select>
        </el-form-item>
        <el-form-item label="Medicine Prescription" :label-width="formLabelWidth">
          <el-input v-model="form.prescription" placeholder="Enter comma-separated values" />
        </el-form-item>
        <el-form-item label="Additional Info" :label-width="formLabelWidth">
          <el-input type="textarea" v-model="form.additionalInfo" />
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="handleSubmit">Create Diagnosis</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import AppHeader from '@/components/AppHeader.vue';
import { actions } from '@/store/actions';

export default {
  name: 'CreateDiagnosisPage',
  components: {
    AppHeader,
  },
  setup() {
    const form = ref({
      patientId: '',
      patientName: '',
      patientAge: '',
      patientGender: '',
      doctorId: '',
      diagnosisId: '',  // Keeping this as diagnosisId
      disease: '',
      severity: '',
      prescription: '',
      additionalInfo: ''
    });

    const formLabelWidth = '120px';

    const handleSubmit = async () => {
      try {
        const patientData = {
          id: Number(form.value.patientId),
          name: form.value.patientName,
          age: Number(form.value.patientAge),
          gender: form.value.patientGender,
          doctor_id: Number(form.value.doctorId),
          diagnosis_id: form.value.diagnosisId.split(',').map(id => parseInt(id.trim(), 10))  // Convert to array of integers
        };

        const diagnosisData = {
          id: parseInt(form.value.diagnosisId.trim(), 10),  // Convert to integer
          disease: form.value.disease,
          severity: form.value.severity,
          prescription: form.value.prescription.split(',').map(item => item.trim()),
          additional_info: form.value.additionalInfo
        };


        const patientResult = await actions.createPatient(patientData);
        console.log(patientResult)
        const diagnosisResult = await actions.createDiagnosis(diagnosisData);
        console.log(diagnosisResult)

        if (patientResult && diagnosisResult) {
          alert('Diagnosis and patient created successfully!');
          form.value = {
            patientId: '',
            patientName: '',
            patientAge: '',
            patientGender: '',
            doctorId: '',
            diagnosisId: '',  // Reset field
            disease: '',
            severity: '',
            prescription: '',
            additionalInfo: ''
          };
        } else {
          alert('Failed to create diagnosis or patient: ' + (patientResult.error || diagnosisResult.error));
        }
      } catch (error) {
        console.error('Error creating diagnosis or patient:', error);
        alert('An error occurred while creating the diagnosis or patient.');
      }
    };

    return {
      form,
      handleSubmit,
      formLabelWidth
    };
  }
};
</script>

<style scoped>
.create-diagnosis {
  display: flex;
  flex-direction: column;
  background-color: #f9f9f9;
  min-height: 100vh;
}

.form-container {
  display: flex;
  justify-content: center;
  width: 100%;
  padding: 40px;
}

.form {
  width: 100%;
  max-width: 600px;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: white;
}

.el-form-item {
  margin-bottom: 15px;
}

.el-form-item label {
  font-weight: bold;
}

.el-button {
  width: 100%;
}
</style>
