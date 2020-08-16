<template>
  <div class="text-center">
    <v-bottom-sheet persistent v-model="showReply" inset scrollable>
      <template v-slot:activator="{}">
        <reply-bar @click="$emit('toggle-reply')" :content="content" />
      </template>
      <v-form ref="replyForm" :disabled="sending">
        <v-card tile>
          <v-card-title>
            {{ $t("replyThreadForm.title") }}
          </v-card-title>
          <v-card-text>
            <v-row>
              <v-col cols="12" sm="4" md="4">
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
              <v-col cols="12" sm="12" md="12">
                <v-textarea
                  v-model="content"
                  prepend-icon="mdi-forum"
                  :label="$t('replyThreadForm.content')"
                  auto-grow
                  rows="4"
                ></v-textarea>
              </v-col>
            </v-row>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              class="mt-6"
              text
              color="accent"
              @click="reply"
              :loading="sending"
              :disabled="sending"
            >
              {{ $t("replyThreadForm.replyButton") }}
            </v-btn>
            <v-btn
              class="mt-6"
              text
              color="accent"
              @click="$emit('toggle-reply')"
              :disabled="sending"
            >
              {{ $t("replyThreadForm.closeButton") }}
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-form>
    </v-bottom-sheet>
  </div>
</template>

<script>
import replyBar from "@/components/replyBar.vue";

export default {
  components: {
    replyBar
  },
  props: {
    sending: Boolean,
    showReply: Boolean
  },
  data: () => ({
    max: 25,
    username: "",
    content: ""
  }),
  computed: {
    rules() {
      const rules = [];
      if (this.max) {
        let rule = v =>
          (v || "").length <= this.max ||
          this.$t("replyThreadForm.validateMaxError", { max: this.max });
        rules.push(rule);
      }
      rules.push(
        v =>
          (v || "").length !== 0 || this.$t("replyThreadForm.validateNullError")
      );
      return rules;
    }
  },
  methods: {
    reply() {
      let replyData = { username: this.username, content: this.content };
      this.$emit("reply", replyData);
    },
    reset() {
      this.$refs.replyForm.reset();
    }
  }
};
</script>
