<template>
  <div class="main">
    <el-form ref="loginForm" class="login-form" label-position="top" :model="loginInfo" autocomplete="new-password">
      <el-form-item ref="usernameInput" prop="username" class="login-form-item username-form-item" autocomplete="new-password">
        <el-input
          v-model.trim="loginInfo.username"
          placeholder="请输入用户名"
          clearable
          :validate-event="false"
          autocomplete="new-password"
          auto-complete="new-password"
          @input="onInput('username')"
        />
      </el-form-item>
      <el-form-item
        ref="passwordInput"
        prop="password"
        class="login-form-item password-form-item"
        :error="passwordWrongMsg"
        autocomplete="chrome-off"
      >
        <el-input
          v-model.trim="loginInfo.password"
          type="password"
          autocomplete="new-password"
          auto-complete="new-password"
          placeholder="请输入密码"
          :validate-event="false"
          show-password
          @input="onInput('password')"
          @keyup.enter.native="loginHandler"
        />
      </el-form-item>
      <el-form-item class="checkbox-style">
        <el-checkbox v-model="pswChecked">
          记住我
        </el-checkbox>
      </el-form-item>
      <el-form-item>
        <el-button class="login-button" type="primary" @click="loginHandler">
          登录
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'demo0',
  data() {
    return {
      loginInfo: {
        username: '',
        password: '',
        clientId: 'frontend',
        grantType: 'password'
      },
      passwordWrongMsg: '',
      pswChecked: ''
    };
  },

  mounted() {},

  activated() {},

  methods: {
    onInput(key) {},
    loginHandler() {
      this.$router.push('demo1');
    }
  },

  computed: {},

  components: {}
};
</script>

<style scoped></style>
