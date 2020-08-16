<template>
  <v-card class="elevation-1">
    <v-toolbar :color="$vuetify.theme.dark ? 'dark' : 'primary'" dark flat>
      <v-toolbar-title>{{ $t("loginForm.title") }}</v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>

    <v-form ref="form" v-model="validated">
      <v-card-text>
        <v-text-field
          :counter="usernameMax"
          :label="$t('loginForm.account')"
          :rules="usernameRules"
          name="account"
          autocomplete="username"
          prepend-icon="mdi-account"
          type="text"
          v-model="username"
        >
        </v-text-field>
        <v-text-field
          :label="$t('loginForm.password')"
          :rules="passwordRules"
          name="password"
          prepend-icon="mdi-lock"
          type="password"
          autocomplete="current-password"
          :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
          @click:append="showPassword = !showPassword"
          v-model="password"
        ></v-text-field>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn :disabled="!validated" text :color="$vuetify.theme.dark ? 'dark' : 'primary'">{{
          $t("loginForm.loginButton")
        }}</v-btn>
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
          this.$t("loginForm.validateUsernameMaxError", { max: this.usernameMax });
        rules.push(rule);
      }
      rules.push(v => v.length !== 0 || this.$t("loginForm.validateUsernameNullError"));
      return rules;
    },
    passwordRules() {
      const rules = [];
      if (this.passwordMax) {
        let rule = v =>
          (v || "").length <= this.passwordMax ||
          this.$t("loginForm.validatePasswordMaxError", { max: this.passwordMax });
        rules.push(rule);
      }
      rules.push(v => v.length !== 0 || this.$t("loginForm.validatePasswordNullError"));
      return rules;
    }
  }
};
</script>
