<template>
  <v-card class="elevation-1">
    <v-toolbar :color="$vuetify.theme.dark ? 'dark' : 'primary'" dark flat>
      <v-toolbar-title>{{ $t("getThreadForm.title") }}</v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>
    <v-form ref="form" v-model="validated">
      <v-card-text>
        <v-text-field
          :counter="max"
          :label="$t('getThreadForm.threadID')"
          :rules="rules"
          name="thread-uid"
          prepend-icon="mdi-forum"
          type="text"
          v-model="threadID"
        ></v-text-field>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          :color="$vuetify.theme.dark ? 'dark' : 'primary'"
          :disabled="!validated"
          @click="goToThread(threadID)"
          text
          >{{ $t("getThreadForm.goButton") }}
        </v-btn>
      </v-card-actions>
    </v-form>
  </v-card>
</template>

<script>
import router from "../router";

export default {
  data: () => ({
    threadID: "",
    max: 30,
    validated: false
  }),
  computed: {
    rules() {
      const rules = [];
      if (this.max) {
        let rule = v =>
          (v || "").length <= this.max ||
          this.$t("getThreadForm.validateMaxError", { max: this.max });
        rules.push(rule);
      }
      rules.push(
        v => v.length !== 0 || this.$t("getThreadForm.validateNullError")
      );
      return rules;
    }
  },
  methods: {
    goToThread: threadID => {
      router.push(`/thread/${threadID}`);
    }
  }
};
</script>
