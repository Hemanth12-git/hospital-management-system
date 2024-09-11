<template>
  <div>
    <AppHeader />
    <div class="doctor-list">
      <h3>Doctors List</h3>
      <el-table :data="doctors" stripe style="width: 100%">
        <el-table-column prop="id" label="ID" width="80" />
        <el-table-column prop="name" label="Name" />
        <el-table-column prop="specialization" label="Specialization" />
      </el-table>
      <el-button
        v-if="userType === 'admin'"
        @click="navigateTo('create-doctor')"
        type="primary"
        class="add-doctor-button"
      >
        Add Doctor
      </el-button>
    </div>
  </div>
</template>

<script>
import AppHeader from "@/components/AppHeader.vue";
import { actions } from '@/store/actions';
import { ElTable, ElTableColumn, ElButton } from 'element-plus';
import { useUserStore } from '@/store';

export default {
  components: {
    AppHeader,
    ElTable,
    ElTableColumn,
    ElButton
  },
  data() {
    return {
      doctors: [],
    };
  },
  computed: {
    userType() {
      const userStore = useUserStore();
      return userStore.userType;
    }
  },
  methods: {
    async loadDoctors() {
      try {
        const data = await actions.fetchDoctors();
        this.doctors = data;
      } catch (error) {
        console.error("Error fetching doctors:", error);
      }
    },
    navigateTo(routeName) {
      this.$router.push({ name: routeName });
    },
  },
  created() {
    this.loadDoctors();
  },
};
</script>

<style scoped>
.doctor-list {
  padding: 20px;
  max-width: 1000px;
  margin: auto;
}

.add-doctor-button {
  margin-top: 20px;
}
</style>
