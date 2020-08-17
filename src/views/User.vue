<template>
  <div class="user">
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="4">
        <login-form
          v-if="toggle === 'login'"
          @toggle-register="toggleRegister"
        />
        <register-form
          v-if="toggle === 'register'"
          @toggle-login="toggleLogin"
        />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import loginForm from "@/components/loginForm.vue";
import registerForm from "@/components/registerForm.vue";
export default {
  mounted() {
    this.$on("toggle-register", this.toggleRegister);
    this.$on("toggle-login", this.toggleLogin);

    this.$http("/user/info").then(res => {
      if (res.status === 200) {
        this.$dialog.message.info(`欢迎 ${res.data.data.username}`, {
          position: "bottom-left",
          icon: true
        });
      }
    });
  },
  data: () => ({
    toggle: "register"
  }),
  components: {
    loginForm,
    registerForm
  },
  methods: {
    toggleRegister() {
      this.toggle = "register";
    },
    toggleLogin() {
      this.toggle = "login";
    }
  }
};
</script>
