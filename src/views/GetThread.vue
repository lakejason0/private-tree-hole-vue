<template>
  <div>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="4">
        <get-thread-form />
      </v-col>
    </v-row>
    <create-thread-form />
  </div>
</template>

<script>
import getThreadForm from "@/components/getThreadForm.vue";
import createThreadForm from "@/components/createThreadForm.vue";

export default {
  name: "Thread",
  components: {
    getThreadForm,
    createThreadForm
  }
};
</script>
