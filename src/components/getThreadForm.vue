<template>
  <v-card class="elevation-1">
    <v-toolbar :color="$vuetify.theme.dark ? 'dark' : 'primary'" dark flat>
      <v-toolbar-title>{{ $t('getThreadForm.title') }}</v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>
    <v-form ref="form" v-model="validated">
      <v-card-text>
        <v-text-field
            :counter="max"
            :label="$t('getThreadForm.threadUID')"
            :rules="rules"
            name="thread-uid"
            prepend-icon="mdi-forum"
            type="text"
            v-model="threadUID"
        ></v-text-field>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn :color="$vuetify.theme.dark ? 'dark' : 'primary'" :disabled="!validated" @click="goToThread(threadUID)"
               text>{{ $t('getThreadForm.goButton') }}
        </v-btn>
      </v-card-actions>
    </v-form>
  </v-card>
</template>

<script>
import router from "../router";

export default {
  data: () => ({
    threadUID: "",
    max: 30,
    validated: false
  }),
  computed: {
    rules() {
      const rules = []
      if (this.max) {
        let rule = v => (v || '').length <= this.max || this.$t('getThreadForm.validateMaxError', {max: this.max})
        rules.push(rule)
      }
      rules.push(v => v.length !== 0 || "输入 请")// @TODO i18n
      return rules;

    }
  },
  methods: {
    goToThread: (threadUID) => {
      router.push(`thread/${threadUID}`)
    }
  }
};
</script>
