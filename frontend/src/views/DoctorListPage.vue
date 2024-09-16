<template>
  <div>
    <AppHeader />
    <div class="container">
      <div class="header-buttons">
        <el-button
          v-if="userType === 'admin'"
          @click="navigateTo('create-doctor')"
          type="primary"
        >
          Add Doctor
        </el-button>
        <el-button
          v-if="userType === 'admin'"
          type="primary"
          class="bulk-upload"
          @click="triggerFileUpload"
        >
          Bulk Upload
        </el-button>
        <input
          type="file"
          ref="fileInput"
          style="display: none;"
          @change="handleFileChange"
          accept=".xlsx,.xls,.ods"
        />
      </div>
      <div class="doctor-list">
        <h3>Doctors List</h3>
        <el-table :data="paginatedDoctors" stripe style="width: 100%">
          <el-table-column prop="id" label="ID" width="80" />
          <el-table-column prop="name" label="Name" />
          <el-table-column prop="specialization" label="Specialization" />
        </el-table>
        <el-pagination
          class="pagination"
          layout="prev, pager, next"
          :total="doctors.length"
          :page-size="pageSize"
          @current-change="handlePageChange"
        />
      </div>
    </div>
  </div>
</template>

<script>
import AppHeader from "@/components/AppHeader.vue";
import { actions } from '@/store/actions';
import { ElTable, ElTableColumn, ElButton, ElPagination } from 'element-plus';
import { useUserStore } from '@/store';

export default {
  components: {
    AppHeader,
    ElTable,
    ElTableColumn,
    ElButton,
    ElPagination
  },
  data() {
    return {
      doctors: [],
      pageSize: 10,
      currentPage: 1,
    };
  },
  computed: {
    userType() {
      const userStore = useUserStore();
      return userStore.userType;
    },
    paginatedDoctors() {
      const start = (this.currentPage - 1) * this.pageSize;
      const end = start + this.pageSize;
      return this.doctors.slice(start, end);
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
    triggerFileUpload() {
      this.$refs.fileInput.click();
    },
    handleFileChange(event) {
      this.selectedFile = event.target.files[0];
      if (this.selectedFile) {
        this.uploadFile();
      }
    },
    async uploadFile() {
      if (!this.selectedFile) {
        alert("Please select an XLSX file.");
        return;
      }
      try {
        await actions.bulkUpload(this.selectedFile);
        alert("Bulk upload successful.");
        this.loadDoctors(); 
      } catch (error) {
        console.error("Bulk upload failed:", error);
        alert("Failed to upload file.");
      }
    },
    handlePageChange(page) {
      this.currentPage = page;
    }
  },
  created() {
    this.loadDoctors();
  },
};
</script>

<style scoped>
.container {
  padding: 20px;
  max-width: 1000px;
  margin: auto;
}

.header-buttons {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 20px;
}

.bulk-upload {
  margin-left: 10px;
}

.doctor-list {
  margin-top: 20px;
}

.pagination {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}
</style>
