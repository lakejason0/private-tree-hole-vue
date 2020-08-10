<template>
  <v-card class="elevation-1">
    <v-toolbar :color="$vuetify.theme.dark ? 'dark' : 'primary'" dark flat>
      <v-toolbar-title>{{ $t('getThreadForm.title') }}</v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>
    <v-card-text>
      <v-form>
        <v-text-field
          :label="$t('getThreadForm.threadUID')"
          name="thread-uid"
          prepend-icon="mdi-forum"
          type="text"
          v-model="threadUID"
        ></v-text-field>
      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn text :color="$vuetify.theme.dark ? 'dark' : 'primary'" @click="goToThread(threadUID)">{{$t('getThreadForm.goButton')}}</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import router from "../router";

export default {
  data: () => ({
    threadUID: ""
  }),
  methods: {
    goToThread: (threadUID) => { router.push(`thread/${threadUID}`) }
  }
};
</script>
