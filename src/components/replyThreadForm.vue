<template>
  <div class="text-center">
    <v-bottom-sheet v-model="sheet" inset>
      <template v-slot:activator="{}">
        <reply-bar 
          @click="sheet = !sheet"
        />
      </template>
      <v-sheet class="text-center" height="200px">
        <v-btn
          class="mt-6"
          text
          color="accent"
          @click="sheet = !sheet"
        >close</v-btn>
        <v-container>
            <v-form>
                <v-row>
                    <v-col
                        cols="12"
                        sm="4"
                        md="4"
                    >
                        <v-text-field
                            :counter="max"
                            :label="$t('replyThreadForm.username')"
                            :rules="rules"
                            name="username"
                            prepend-icon="mdi-account"
                            type="text"
                            v-model="username"
                        ></v-text-field>
                    </v-col>
                    <v-col
                        cols="12"
                        sm="12"
                        md="12"
                    >
                        <v-textarea
                            v-model="content"
                            autogrow
                            rows="4"
                        ></v-textarea>
                    </v-col>
                </v-row>
            </v-form>
        </v-container>
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
        sheet: false,
        max: 25,
        username: "",
        content: "",
    }),
    computed: {
        rules() {
            const rules = []
            if (this.max) {
                let rule = v => (v || '').length <= this.max || this.$t('replyThreadForm.validateMaxError', {max: this.max})
                rules.push(rule)
            }
            rules.push(v => v.length !== 0 || this.$t('replyThreadForm.validateNullError') )// @TODO i18n
            return rules;
        }
    },
    methods: {

    }
}
</script>