<template>
  <div>
    <a-button type="primary" @click="showModal">
      Create leave application
    </a-button>
    <a-modal v-model="visible" title="Create" @ok="handleOk">
      <a-form ref="formModel" v-model="form">
        <a-form-item label="Name User" :rules="[{ required: true, message: 'Please select user' }]">
          <a-select v-model="form.selectedUserId" placeholder="Select user">
            <a-select-option v-for="user in userList" :key="user.user_id" :value="user.user_id">
              {{ user.name }}
            </a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="Start Date" :rules="[{ required: true, message: 'Please enter start date' }]">
          <a-date-picker v-model="form.startDate" :disabledDate="disabledStartDate" />
        </a-form-item>
        <a-form-item label="End Date" :rules="[{ required: true, message: 'Please enter end date' }]">
          <a-date-picker v-model="form.endDate" :disabledDate="disabledEndDate" />
        </a-form-item>
        <a-form-item label="Reason" :rules="[{ required: true, message: 'Please enter reason' }]">
          <a-textarea v-model="form.reason" />
        </a-form-item>
        <a-form-item label="Status" :rules="[{ required: true, message: 'Please select status' }]">
          <a-select v-model="form.status" placeholder="Select status">
            <a-select-option value="pending">Pending</a-select-option>
            <a-select-option value="confirmed">Confirmed</a-select-option>
            <a-select-option value="rejected">Rejected</a-select-option>
          </a-select>
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script>
import { message } from 'ant-design-vue';
import { API_BASE_URL } from '../../src/constants/constant';
import moment from 'moment';

export default {
  data() {
    return {
      visible: false,
      form: {
        selectedUserId: null,
        startDate: null,
        endDate: null,
        reason: null,
        status: null,
      },
      userList: [],
    };
  },
  methods: {
    async showModal() {
      try {
        const response = await this.$http.$get(`${API_BASE_URL}/list_users`);
        this.userList = response.Items || [];
      } catch (error) {
        console.error('Error fetching user list:', error);
      }

      this.visible = true;
    },
    handleOk() {
      // Chuyển đổi moment sang chuỗi ngày tháng
      this.form.startDate = this.form.startDate.format('DD-MM-YYYY');
      this.form.endDate = this.form.endDate.format('DD-MM-YYYY');
     
      const leaveData = {
          user_id: this.form.selectedUserId,
          start_date: this.form.startDate,
          end_date: this.form.endDate,
          leave_reason: this.form.reason,
          status: this.form.status,
      };

      this.$http.$post(`${API_BASE_URL}/leave/create_leave`, leaveData)
        .then(response => {
          // console.log('Leave created successfully:', response);
          // Close modal
          this.visible = false;
          if(response.message){
            message.success(response.message);
            this.$emit('leave-created');
          }
        })
        .catch(error => {
          console.error('Error creating leave:', error);
          message.error(error);
        });
      console.log('Form Data:', this.form);

      // Close modal
      this.visible = false;
    },
    disabledEndDate(currentDate) {
      const startDate = this.form.startDate;
      return startDate && currentDate.isBefore(startDate, 'day');
    },
    disabledStartDate(currentDate) {
      return currentDate && currentDate.isBefore(moment().startOf('day'), 'day');
    },
  },
};
</script>
