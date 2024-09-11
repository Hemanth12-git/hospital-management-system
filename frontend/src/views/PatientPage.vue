<template>
  <div>
    <h2>Diagnosis for Patient</h2>
    <el-table v-if="diagnosis.length" :data="diagnosis" style="width: 100%">
      <el-table-column prop="disease" label="Disease" width="180" />
      <el-table-column prop="severity" label="Severity" width="180" />
      <el-table-column label="Prescription">
        <template #default="scope">
          {{ scope.row.prescription.join(', ') }}
        </template>
      </el-table-column>
      <el-table-column prop="additional_info" label="Additional Info" width="200" />
    </el-table>
    <div v-else>
      <el-empty description="No diagnosis found for this patient." />
    </div>
  </div>
</template>

<script>
import { reactive, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { actions } from '@/store/actions';

export default {
  name: 'PatientPage',
  setup() {
    const state = reactive({
      diagnosis: [],
      
    });
    const route = useRoute();
    const patientId = route.params.id;
    // console.log(patientId)

    const loadDiagnosis = async () => {
      try {
        state.diagnosis = await actions.fetchDiagnosisByPatientId(patientId) || [];
      } catch (error) {
        console.error('Error fetching diagnosis:', error);
      }
    };

    onMounted(loadDiagnosis);

    return state;
  },
};
</script>

<style scoped>
.el-table {
  margin-top: 20px;
}
</style>
