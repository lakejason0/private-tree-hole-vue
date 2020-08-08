<template>
  <v-card class="elevation-1">
    <v-toolbar color="primary" dark flat>
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
        ></v-text-field>
      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn text color="primary">{{$t('getThreadForm.goButton')}}</v-btn>
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
