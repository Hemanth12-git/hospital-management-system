<template>
  <div>
    <AppHeader />
    <div class="diagnosis-list">
      <h3>Diagnosis List</h3>
      <el-table :data="diagnosis" stripe style="width: 100%">
        <el-table-column prop="id" label="ID" width="80" />
        <el-table-column prop="disease" label="Disease Name" />
        <el-table-column prop="severity" label="Severity" />
        <el-table-column prop="prescription" label="Prescription" />
        <el-table-column prop="additional_info" label="Additional Info" />
      </el-table>
    </div>
  </div>
</template>

<script>
import AppHeader from "@/components/AppHeader.vue";
import { actions } from "@/store/actions"; 

export default {
  components: {
    AppHeader
  },
  data() {
    return {
      diagnosis: [],
    };
  },
  async created() {
    try {
      this.diagnosis = await actions.fetchAlldiagnosis();
    } catch (error) {
      console.error('Error fetching diagnosis:', error);
    }
  }
};
</script>

<style scoped>
.diagnosis-list {
  padding: 20px;
  max-width: 1000px;
  margin: auto;
}
</style>
