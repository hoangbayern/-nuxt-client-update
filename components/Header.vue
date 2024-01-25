<template>
  <a-layout-header>
    <a-menu theme="dark" mode="horizontal" :selected-keys="selectedKeys" class="menu-container">
      <a-menu-item key="/"><nuxt-link to="/">Home</nuxt-link></a-menu-item>
      <a-menu-item key="/users" v-if="username"><nuxt-link to="/users">List Users</nuxt-link></a-menu-item>
      <a-menu-item key="/users/manage-leave" v-if="username"><nuxt-link to="/users/manage-leave">Manage Leave</nuxt-link></a-menu-item>
      <a-menu-item key="/register" v-if="!username"><nuxt-link to="/register">Register</nuxt-link></a-menu-item>
      <a-menu-item key="/login" v-if="!username"><nuxt-link to="/login">Login</nuxt-link></a-menu-item>
      <a-menu-item v-if="username" @click="handleLogout">Logout</a-menu-item>
      <a-menu-item v-if="username" class="hello-menu">Hello: ({{ username }})</a-menu-item>
    </a-menu>
  </a-layout-header>
</template>

<script>
import { mapState } from 'vuex';

export default {
  computed: {
    ...mapState('auth', ['isLoggedIn', 'username']),
    selectedKeys() {
      return [this.$route.path];
    },
  },
  watch: {
    isLoggedIn(newStatus) {
      console.log('isLoggedIn:', newStatus);
    },
    username(newUsername) {
      console.log('username:', newUsername);
    },
  },
  methods: {
    handleLogout() {
      this.$store.dispatch('auth/logout')
        .then(() => {
          // Chuyển hướng sau khi đăng xuất thành công
          this.$router.push('/login');
        })
        .catch((error) => {
          console.error('Lỗi đăng xuất:', error);
        });
    },
  },
};
</script>

<style scoped>
a-layout-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #001529;
  padding: 0 20px;
}

.menu-container {
  display: flex;
  justify-content: space-between;
  width: 100%;
}

a-menu-item {
  margin: 0;
}

a-menu {
  line-height: 64px;
  flex: 1; /* Use flex property to expand and take available space */
}

.hello-menu {
  margin-left: auto; /* Move to the right by pushing it to the end */
}

a-menu-item:hover {
  border-bottom: 2px solid #1890ff;
}

a-menu-item a {
  color: white;
}

a-menu-item a:hover {
  color: #1890ff;
}
</style>
