<template>
  <div class="text-center">
    <v-bottom-sheet v-model="sheet" inset>
      <template v-slot:activator="{ on, attrs }">
        <reply-bar 
          v-bind="attrs"
          v-on="on"
        />
      </template>
      <v-sheet class="text-center" height="200px">
        <v-btn
          class="mt-6"
          text
          color="error"
          @click="sheet = !sheet"
        >close</v-btn>
        <div class="my-3">This is a bottom sheet using the inset prop</div>
      </v-sheet>
    </v-bottom-sheet>
  </div>
</template>

<script>
import replyBar from "@/components/replyBar.vue";

export default {
    components: {
        replyBar
    },
    data: () => ({
        sheet: false
    })
}
</script>