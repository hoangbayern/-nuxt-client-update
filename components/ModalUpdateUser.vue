<template>
    <a-modal :title="`Edit User`" v-model="visible" @cancel="closeModal" @ok="updateUser">
      <a-form :model="editedUser">
        <a-form-item label="Name">
          <a-input v-model="editedUser.name" />
        </a-form-item>
        <a-form-item label="Username">
          <a-input v-model="editedUser.username" />
        </a-form-item>
        <a-form-item label="Email">
          <a-input v-model="editedUser.email" />
        </a-form-item>
        <a-form-item label="Phone">
          <a-input v-model="editedUser.phone" />
        </a-form-item>
        <a-form-item label="Address">
          <a-input v-model="editedUser.address" />
        </a-form-item>
      </a-form>
    </a-modal>
  </template>
  
  <script>
  import { Modal, Form, Input } from "ant-design-vue";
  
  export default {
    components: {
      "a-modal": Modal,
      "a-form": Form,
      "a-input": Input,
      "a-form-item": Form.Item,
    },
    props: {
      user: {
        type: Object,
        default: () => ({}),
      },
      visible: Boolean,
    },
    data() {
      return {
        editedUser: { ...this.user },
      };
    },
    methods: {
      closeModal() {
        this.$emit("close");
      },
      updateUser() {
        this.$emit("update", this.editedUser);
      },
    },
  };
  </script>
  
  <style scoped></style>
  