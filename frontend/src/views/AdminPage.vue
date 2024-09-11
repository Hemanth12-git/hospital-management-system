<template>
  <div>
    <AppHeader />
    <div class="admin">
      <el-card class="card" @click="navigateTo('doctor-list')">
        <template #header>
          <h2 class="card-header">Doctor Details</h2>
        </template>
        <div class="card-content">
          <p>View the list of doctors and add new ones.</p>
        </div>
      </el-card>
      <el-card class="card" @click="navigateTo('diagnosis')">
        <template #header>
          <h2 class="card-header">Diagnosis Details</h2>
        </template>
        <div class="card-content">
          <p>View the list of diagnosis and their details.</p>
        </div>
      </el-card>
      <el-card class="card" @click="navigateTo('create-diagnosis')">
        <template #header>
          <h2 class="card-header">Create Diagnosis</h2>
        </template>
        <div class="card-content">
          <p>Enter details for a new diagnosis.</p>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
import AppHeader from "@/components/AppHeader.vue";

export default {
  components: {
    AppHeader,
  },
  methods: {
    navigateTo(routeName) {
      this.$router.push({ name: routeName });
    },
  },
};
</script>

<style scoped>
.admin {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 20px;
  padding: 20px;
  min-height: 400px;
}

.card {
  width: 200px;
  height: 200px;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.3s;
  background-color: #e3f2fd;
  border: 1px solid #bbdefb;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 20px;
}

.card:hover {
  background-color: #bbdefb;
  transform: scale(1.05);
}

.card-header {
  color: #0d47a1;
  font-size: 16px;
}

.card-content {
  flex-grow: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  
}
</style>
