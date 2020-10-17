<template>
  <v-card class="elevation-1">
    <v-toolbar :color="$vuetify.theme.dark ? 'dark' : 'primary'" dark flat>
      <v-toolbar-title>{{ $t("loginForm.title") }}</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn @click="$emit('toggle-register')" icon large>
        <v-icon>mdi-account-plus</v-icon>
      </v-btn>
    </v-toolbar>

    <v-form ref="form" v-model="validated">
      <v-card-text>
        <v-text-field
          :counter="usernameMax"
          :label="$t('loginForm.account')"
          :rules="usernameRules"
          autocomplete="username"
          name="account"
          prepend-icon="mdi-account"
          type="text"
          v-model="username"
        >
        </v-text-field>
        <v-text-field
          :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
          :label="$t('loginForm.password')"
          :rules="passwordRules"
          @click:append="showPassword = !showPassword"
          autocomplete="current-password"
          name="password"
          prepend-icon="mdi-lock"
          type="password"
          v-model="password"
        ></v-text-field>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          :color="$vuetify.theme.dark ? 'dark' : 'primary'"
          :disabled="!validated"
          @click="submit"
          text
          >{{ $t("loginForm.loginButton") }}
        </v-btn>
      </v-card-actions>
    </v-form>
  </v-card>
</template>

<script>
export default {
  props: {},
  data: () => ({
    validated: false,
    usernameMax: 25,
    username: "",
    password: "",
    showPassword: false
  }),
  computed: {
    usernameRules() {
      const rules = [];
      if (this.usernameMax) {
        let rule = v =>
          (v || "").length <= this.usernameMax ||
          this.$t("loginForm.validateUsernameMaxError", {
            max: this.usernameMax
          });
        rules.push(rule);
      }
      rules.push(
        v => v.length !== 0 || this.$t("loginForm.validateUsernameNullError")
      );
      return rules;
    },
    passwordRules() {
      const rules = [];
      if (this.passwordMax) {
        let rule = v =>
          (v || "").length <= this.passwordMax ||
          this.$t("loginForm.validatePasswordMaxError", {
            max: this.passwordMax
          });
        rules.push(rule);
      }
      rules.push(
        v => v.length !== 0 || this.$t("loginForm.validatePasswordNullError")
      );
      return rules;
    }
  },
  methods: {
    submit() {
      this.$http({
        url: "user/login",
        method: "post",
        data: {
          username: this.username,
          password: this.password
        }
      }).then(res => {
        if (res.data.data.success) {
          this.$dialog.message.info(this.$t("loginForm.loggedInToast"), {
            position: "bottom-left",
            icon: true
          });
          localStorage.setItem("treehole-token", res.data.data.token);
          this.$router.push("/");
        } else {
          for (let toast in res.data.toast) {
              this.$dialog.message.error(this.$t(toast.identifier), {
              position: "bottom-left",
              icon: true
            });
          }
        }
      });
    }
  }
};
</script>
