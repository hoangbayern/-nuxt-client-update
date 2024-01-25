<template>
    <div>
      <h1 style="margin-left: 32px; margin-top: 32px;">Create User</h1>
      <a-button type="primary" style="margin-left: 32px"><NuxtLink to="/users" class="login-form-button">List Users</NuxtLink></a-button>
      <a-form :form="form" @submit="handleSubmit" class="login-form">
        <a-form-item label="Name">
          <a-input v-decorator="['name', { rules: [{ required: true, message: 'Please input your name!' }] }]" />
        </a-form-item>
        <a-form-item label="Email">
          <a-input v-decorator="['email', { rules: [{ required: true, message: 'Please input your email!' }] }]" />
        </a-form-item>
        <a-form-item label="Username">
          <a-input v-decorator="['username', { rules: [{ required: true, message: 'Please input your username!' }] }]" />
        </a-form-item>
        <a-form-item label="Password">
          <a-input type="password" v-decorator="['password', { rules: [{ required: true, message: 'Please input your password!' }] }]" />
        </a-form-item>
        <a-form-item label="Phone">
          <a-input v-decorator="['phone', { rules: [{ required: false }] }]" />
        </a-form-item>
        <a-form-item label="Address">
          <a-input v-decorator="['address', { rules: [{ required: false }] }]" />
        </a-form-item>
        <a-form-item>
          <a-button type="primary" html-type="submit" class="login-form-button">Create</a-button>
        </a-form-item>
      </a-form>
    </div>
  </template>
  
  <script>
  import { message } from 'ant-design-vue';
  import { API_BASE_URL } from '../../src/constants/constant';
  
  export default {
    middleware: 'auth',
    data() {
      return {
        form: this.$form.createForm(this),
      };
    },
    methods: {
      async handleSubmit(e) {
        e.preventDefault();
        try {
          const values = await this.form.validateFields();
          console.log(values);
  
          const response = await this.$http.$post(`${API_BASE_URL}/create_user`, values);

        // console.log('API Response:', response.message);
        if(response.message){
            message.success(response.message);
        }
        this.$router.push('/users')
        
        } catch (error) {
          console.error('Form Validation Error:', error);
  
          message.error('Form validation failed. Please check your inputs.');
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .login-form {
    max-width: 300px;
    margin: auto;
  }
  
  .login-form-button {
    width: 50%;
  }
  </style>
  