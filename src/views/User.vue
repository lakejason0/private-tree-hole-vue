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
    <v-row align="center" justify="center" v-else-if="!loading && logged_in">
      <v-col cols="12" md="8" sm="8">
        <h1 class="text-h2">
          {{ $t("user.title") }}
        </h1>
      </v-col>
      <v-col cols="12" md="8" sm="8">
        <v-tabs
          v-model="tab"
          background-color="transparent"
        >
          <v-tabs-slider></v-tabs-slider>
          <v-tab href="#tab-recent">
            {{ $t('user.tabs.recent') }}
          </v-tab>
          <v-tab href="#tab-preferences">
            {{ $t('user.tabs.preferences') }}
          </v-tab>
          <v-tab href="#tab-query">
            {{ $t('user.tabs.query') }}
          </v-tab>
        </v-tabs>
        <v-tabs-items v-model="tab">
          <v-tab-item value="tab-recent">
            <recent-posts></recent-posts>
          </v-tab-item>
          <v-tab-item value="tab-preferences">
            <preferences></preferences>
          </v-tab-item>
          <v-tab-item value="tab-query">
            <query></query>
          </v-tab-item>
        </v-tabs-items>
      </v-col>
    </v-row>
    <v-row align="center" justify="center" v-else>
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
import recentPosts from "@/components/recentPosts.vue";
import preferences from "@/components/preferences.vue";
import query from "@/components/query.vue";
export default {
  mounted() {
    this.$on("toggle-register", this.toggleRegister);
    this.$on("toggle-login", this.toggleLogin);

    this.$http("/user/info").then(res => {
      console.log(res)
      if (res.data.code === 200) {
        this.$dialog.message.info(this.$t("user.loggedInToast",{username: res.data.data.username}), {
          position: "bottom-left",
          icon: true
        });
        
        this.logged_in = true
      } else if (res.data.code === 401) {
        this.$dialog.message.error(this.$t("message.notAuthorized"), {
          position: "bottom-left",
          icon: true
        });
      } else {
        for (let toast in res.data.toast) {
          this.$dialog.message.error(this.$t(toast.identifier), {
            position: "bottom-left",
            icon: true
          });
        }
      }
      this.loading = false
    });
  },
  data: () => ({
    toggle: "login",
    loading: true,
    logged_in: null,
    tab: null,
  }),
  components: {
    loginForm,
    registerForm,
    recentPosts,
    preferences,
    query,
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
