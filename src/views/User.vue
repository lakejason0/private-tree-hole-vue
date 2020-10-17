<template>
  <div class="user">
    <v-row align="center" justify="center" v-if="loading">
      <v-col cols="12" md="8" sm="8">
        <h1 class="text-h2">
          <v-skeleton-loader type="heading" class="my-4"></v-skeleton-loader>
        </h1>
      </v-col>
      <v-col cols="12" md="8" sm="8">
        <h2 class="text-h6">
          <v-skeleton-loader type="heading" class="mx-auto"></v-skeleton-loader>
        </h2>
      </v-col>
    </v-row>
    <v-row align="center" justify="center" v-if="!loading && logged_in">
      <v-col cols="12" md="8" sm="8">
        <h1 class="text-h2">
          {{ $t("user.title") }}
        </h1>
      </v-col>
    </v-row>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="4" >
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
        this.$dialog.message.info(this.$t("user.loggedInToast",{username: res.data.data.username}), {
          position: "bottom-left",
          icon: true
        });
        this.logged_in = true
      }
      this.loading = false
    });
  },
  data: () => ({
    toggle: "login",
    loading: true,
    logged_in: null,
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
