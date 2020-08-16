<template>
  <div class="user">
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="4">
        <login-form />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import loginForm from "@/components/loginForm.vue";
export default {
  components: {
    loginForm
  }
};
</script>
