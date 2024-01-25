<template>
  <a-form :form="form" @submit="handleSubmit" class="login-form">
    <a-form-item label="Username">
      <a-input v-decorator="['username', { rules: [{ required: true, message: 'Please input your username!' }] }]" />
    </a-form-item>
    <a-form-item label="Password">
      <a-input type="password" v-decorator="['password', { rules: [{ required: true, message: 'Please input your password!' }] }]" />
    </a-form-item>
    <a-form-item>
      <a-button type="primary" html-type="submit" class="login-form-button">Log in</a-button>
    </a-form-item>
  </a-form>
</template>

<script>
import { message } from 'ant-design-vue';
import { mapMutations } from 'vuex';
export default {
  data() {
    return {
      form: this.$form.createForm(this),
    };
  },
  methods: {
    ...mapMutations('auth', ['setLoggedIn', 'setUsername']),
    async handleSubmit(e) {
      e.preventDefault();
      try {
        const values = await this.form.validateFields();
        console.log(values);

        const response = await this.$http.$post('https://86x07hia9j.execute-api.us-east-1.amazonaws.com/Dev/login', values);

        this.setLoggedIn(true);
        this.$store.commit('auth/setToken', response.token);
        this.$store.commit('auth/setUsername', response.user.username);

        console.log('API Response:', response);

        message.success("Login successfully");
        this.$router.push('/users');


      } catch (error) {
        console.error('API Error:', error);

        if (error.response && error.response.data && error.response.data.message) {
          message.error(error.response.data.message);
        }
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
  width: 100%;
}
</style>
