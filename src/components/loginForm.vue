<template>
  <v-card class="elevation-12">
    <v-toolbar color="primary" dark flat>
      <v-toolbar-title>{{$t('loginForm.title')}}</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-tooltip bottom>
      </v-tooltip>
    </v-toolbar>
    <v-card-text>
      <v-form>
        <v-text-field 
          :label="$t('loginForm.account')"
          name="account"
          prepend-icon="mdi-account"
          type="text">
        </v-text-field>
        <v-text-field
          id="password"
          :label="$t('loginForm.password')"
          name="password"
          prepend-icon="mdi-lock"
          type="password"
        ></v-text-field>
      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn text color="primary">Login</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  props: {
    source: String
  }
};
</script>
