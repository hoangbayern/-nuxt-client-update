<template>
  <a-table :columns="columns" :dataSource="users" rowKey="user_id">
    <template v-slot:action="text">
      <a-button type="link" @click="editUser(text)">Edit</a-button>
      <a-button type="link" @click="showUser(text)">Show</a-button>
      <a-button type="link" @click="deleteUser(text)">Delete</a-button>
      <ModalUpdateUser :user="selectedUserUpdate" v-if="selectedUserUpdate" :visible="editModalVisible" @cancel="closeEditModal" @close="closeEditModal" @update="updateUser" />
      <a-modal
        v-if="selectedUser"
        :title="`User Information - ID: ${selectedUser.user_id || ''}`"
        v-model="visible"
        @cancel="closeModal"
        @ok="closeModal"
      >
        <p>Name: {{ selectedUser.name }}</p>
        <p>Username: {{ selectedUser.username }}</p>
        <p>Email: {{ selectedUser.email }}</p>
        <p>Phone: {{ selectedUser.phone }}</p>
        <p>Address: {{ selectedUser.address }}</p>
      </a-modal>
    </template>
  </a-table>
</template>

<script>
import { Table, Button, Modal, message } from "ant-design-vue";
import { API_BASE_URL } from "../src/constants/constant";

export default {
  components: {
    "a-table": Table,
    "a-button": Button,
    "a-modal": Modal,
  },
  props: {
    users: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      columns: [
        {
          title: "ID",
          dataIndex: "user_id",
          key: "user_id",
        },
        {
          title: "Username",
          dataIndex: "username",
          key: "username",
        },
        {
          title: "Email",
          dataIndex: "email",
          key: "email",
        },
        {
          title: "Phone",
          dataIndex: "phone",
          key: "phone",
        },
        {
          title: "Actions",
          key: "action",
          scopedSlots: { customRender: "action" },
        },
      ],
      visible: false,
      editModalVisible: false,
      selectedUser: null,
      selectedUserUpdate: null,
    };
  },
  methods: {
    editUser(user) {
      this.editModalVisible = true;
      this.selectedUserUpdate = user;
      // console.log("Edit user:", user);
    },
    showUser(user) {
      this.visible = true;
      this.selectedUser = user;
    //   console.log("SelectedUser:", this.selectedUser);
    },
    deleteUser(user) {
      Modal.confirm({
        title: "Confirm Delete",
        content: "Are you sure you want to delete this user?",
        onOk: async () => {
          console.log("Delete user:", user.user_id);
          try {
            const response = await this.$http.$delete(
              `${API_BASE_URL}/delete_user?user_id=${user.user_id}`
            );

            console.log(response);
            if (response.message) {
              message.success(response.message);
            }
          } catch (error) {
            console.error("Delete User Error:", error);
            message.error("Error deleting user. Please try again.");
          }
        },
      });
    },
    closeModal() {
      this.visible = false;
      this.selectedUser = null;
    },
    closeEditModal() {
      this.editModalVisible = false;
      this.selectedUserUpdate = null;
    },
    async updateUser(updatedUser) {
      try {
        const userData = {
          name: updatedUser.name,
          username: updatedUser.username,
          email: updatedUser.email,
          phone: updatedUser.phone,
          address: updatedUser.address,
        };

        const response = await this.$http.$put(
          `${API_BASE_URL}/update_user?user_id=${updatedUser.user_id}`,
          userData
        );

        console.log("Update User Response:", response);
        this.closeEditModal();
        if (response.message) {
              message.success(response.message);
            }
      } catch (error) {
        console.error("Update User Error:", error);
        message.error('Update User Error');
      }
    },
  },
};
</script>

<style scoped></style>
