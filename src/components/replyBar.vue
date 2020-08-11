<template>
  <div style="position: fixed; bottom: 16px; left: 0; right: 0;display: flex;align-items: center;justify-content: center">
    <div>
      <v-toolbar
          dense
          floating
      >
        <v-text-field
            hide-details
            single-line
            disabled
        ></v-text-field>
        <v-btn icon disable>
          <v-icon>send</v-icon>
        </v-btn>
      </v-toolbar>
    </div>
  </div>
</template>

<script>
export default {}
</script>
