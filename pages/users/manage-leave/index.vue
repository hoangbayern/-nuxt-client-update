<template>
  <div>
    <Header/>
    <h1 style="margin-left: 32px; margin-top: 32px;">Leave List</h1>
    <div class="date-picker-container" style="margin-left: 32px;">
      <a-date-picker
        v-model="startTime"
        placeholder="Start Date"
        style="margin-right: 10px"
        format="YYYY-MM-DD"
      />
      <a-date-picker
        v-model="endTime"
        placeholder="End Date"
        format="YYYY-MM-DD"
      />
      <a-button type="primary" @click="searchByStatusAndDate">Search</a-button>
    </div>
    <div style="margin-top: 32px; margin-left: 32px;">
      <a-select v-model="selectedStatus" style="width: 120px" @change="searchByStatus">
        <a-select-option value="all">All</a-select-option>
        <a-select-option value="pending">Pending</a-select-option>
        <a-select-option value="confirmed">Confirmed</a-select-option>
        <a-select-option value="rejected">Rejected</a-select-option>
      </a-select>
    </div>
    <div class="button-container">
      <modal-create-leave />
    </div>
    <leave-table :users="filteredUsers"  @leave-created="loadTableData" />
  </div>
</template>

<script>
import LeaveTable from '../../../components/LeaveTable.vue';
import ModalCreateLeave from '../../../components/modal-manage-leave/ModalCreateLeave.vue';
import { API_BASE_URL } from '../../../src/constants/constant';

export default {
  components: { LeaveTable, ModalCreateLeave },
  middleware: 'auth',

  data() {
    return {
      users: [],
      selectedStatus: null,
      startTime: null,
      endTime: null,
    };
  },
  async asyncData({ $http }) {
    try {
      const response = await $http.$get(`${API_BASE_URL}/leave/all_leave`);
      return { users: response.Items };
    } catch (error) {
      console.error('API Error:', error);
      return { users: [] };
    }
  },
  computed: {
    filteredUsers() {
      if (!this.selectedStatus || this.selectedStatus === 'all') {
        return this.users;
      }
      return this.users.filter(user => user.status === this.selectedStatus);
    },
  },
  methods: {
    searchByStatus() {
      
    },
    loadTableData() {
      // Gọi API hoặc thực hiện các bước cần thiết để cập nhật dữ liệu bảng
      // Ví dụ: lấy dữ liệu mới từ API và gán nó vào biến tableData
      this.fetchTableData();
    },
    async fetchTableData() {
      try {
        const response = await this.$http.$get(`${API_BASE_URL}/leave/all_leave`);
        console.log(response);
        this.users = response.Items || [];
      } catch (error) {
        console.error('Error fetching table data:', error);
      }
    },
    async searchByStatusAndDate() {
      const formattedStartTime = this.startTime ? this.startTime.format('DD-MM-YYYY') : null;
      const formattedEndTime = this.endTime ? this.endTime.format('DD-MM-YYYY') : null;

      try {
        let apiUrl = `${API_BASE_URL}/leave/search_leave`;

        if (formattedStartTime && formattedEndTime) {
          apiUrl += `?start_time=${formattedStartTime}&end_time=${formattedEndTime}`;
        }
        else {
          apiUrl = `${API_BASE_URL}/leave/all_leave`;
        }
        const response = await this.$http.$get(apiUrl);

        apiUrl === `${API_BASE_URL}/leave/all_leave` ? this.users = response.Items : this.users = response;
        // this.users = response;

        console.log(response);
      } catch (error) {
        console.error('API Error:', error);
        this.users = [];
      }
    },
  },
};
</script>

<style scoped>
.button-container {
  display: flex;
  justify-content: end;
  margin-bottom: 16px;
  margin-right: 32px;
}
</style>
