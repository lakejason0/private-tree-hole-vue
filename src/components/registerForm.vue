<template>
  <v-card class="elevation-1">
    <v-toolbar :color="$vuetify.theme.dark ? 'dark' : 'primary'" dark flat>
      <v-toolbar-title>{{ $t("registerForm.title") }}</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon large @click="$emit('toggle-login')">
        <v-icon>mdi-login</v-icon>
      </v-btn>
    </v-toolbar>

    <v-form ref="form" v-model="validated">
      <v-card-text>
        <v-text-field
          :counter="usernameMax"
          :label="$t('registerForm.account')"
          :rules="usernameRules"
          name="account"
          autocomplete="username"
          prepend-icon="mdi-account"
          type="text"
          v-model="username"
        >
        </v-text-field>
        <v-text-field
          :label="$t('registerForm.email')"
          :rules="emailRules"
          name="email"
          prepend-icon="mdi-email"
          type="email"
          autocomplete="email"
          v-model="email"
        >
        </v-text-field>
        <v-text-field
          :label="$t('registerForm.password')"
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
        <v-btn :disabled="!validated" @click="submit" text :color="$vuetify.theme.dark ? 'dark' : 'primary'">{{
          $t("registerForm.registerButton")
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
    email: "",
    password: "",
    showPassword: false
  }),
  computed: {
    usernameRules() {
      const rules = [];
      if (this.usernameMax) {
        let rule = v =>
          (v || "").length <= this.usernameMax ||
          this.$t("registerForm.validateUsernameMaxError", { max: this.usernameMax });
        rules.push(rule);
      }
      rules.push(v => v.length !== 0 || this.$t("registerForm.validateUsernameNullError"));
      return rules;
    },
    passwordRules() {
      const rules = [];
      if (this.passwordMax) {
        let rule = v =>
          (v || "").length <= this.passwordMax ||
          this.$t("registerForm.validatePasswordMaxError", { max: this.passwordMax });
        rules.push(rule);
      }
      rules.push(v => v.length !== 0 || this.$t("registerForm.validatePasswordNullError"));
      return rules;
    },
    emailRules() {
      const rules = [];
      rules.push(
        v => !v || /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || this.$t("registerForm.validateEmailError")
      )
      return rules;
    }
  },
  methods: {
    submit () {
      this.$http({
        url: 'user/register',
        method: 'post',
        data: {
          username: this.username,
          password: this.password,
          email: this.email
        }
      }).then(res => {
        if(res.data.data.success){
          // @TODO i18n
          this.$dialog.message.info('注册成功!', {
            position: "bottom-left",
            icon: true
          });
          this.$router.push('/user')
        }else{
          // @TODO i18n
          // 后端没写失败的情况...
          this.$dialog.message.info('注册失败!', {
            position: "bottom-left",
            icon: true
          });
        }
      })
    }
  }
};
</script>
