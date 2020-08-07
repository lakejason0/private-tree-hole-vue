<template>
  <v-row
    align="center"
    justify="center"
  >
    <v-col
      cols="12"
      sm="8"
      md="4"
    >
      <get-thread-form />
    </v-col>
  </v-row>
</template>

<script>
import getThreadForm from "@/components/getThreadForm.vue";

export default {
    name: "Thread",
    components: {
        getThreadForm
    }
};

</script>