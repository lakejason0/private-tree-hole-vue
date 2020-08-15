<template>
  <div class="text-center">
    <v-bottom-sheet persistent v-model="showCreate" inset scrollable>
      <template v-slot:activator="{}">
        <v-speed-dial bottom right fixed>
          <template v-slot:activator>
            <v-btn
              fab
              :color="$vuetify.theme.dark ? 'dark' : 'accent'"
              @click="showCreate = !showCreate"
            >
              <v-icon>edit</v-icon>
            </v-btn>
          </template>
        </v-speed-dial>
      </template>
      <v-form ref="createForm" :disabled="sending">
        <v-card tile>
          <v-card-title>
            {{ $t("createThreadForm.title") }}
          </v-card-title>
          <v-card-text>
            <v-row>
              <v-col cols="12" sm="4" md="4">
                <v-text-field
                  :counter="max"
                  :label="$t('createThreadForm.username')"
                  :rules="rules"
                  name="username"
                  prepend-icon="mdi-account"
                  type="text"
                  v-model="username"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="4" md="4">
                <v-text-field
                  :label="$t('createThreadForm.threadTitle')"
                  name="title"
                  prepend-icon="mdi-sign-text"
                  type="text"
                  v-model="title"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="4" md="4">
                <v-checkbox
                  v-model="is_public"
                  :label="$t('createThreadForm.isPublic')"
                ></v-checkbox>
              </v-col>
              <v-col cols="12" sm="12" md="12">
                <v-textarea
                  v-model="content"
                  prepend-icon="mdi-forum"
                  :label="$t('createThreadForm.content')"
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
              @click="create"
              :loading="sending"
              :disabled="sending"
            >
              {{ $t("createThreadForm.createButton") }}
            </v-btn>
            <v-btn
              class="mt-6"
              text
              color="accent"
              @click="showCreate = !showCreate"
              :disabled="sending"
            >
              {{ $t("createThreadForm.closeButton") }}
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-form>
    </v-bottom-sheet>
  </div>
</template>

<script>
import router from "../router";

export default {
  components: {},
  props: {},
  data: () => ({
    max: 25,
    sending: false,
    showCreate: false,
    username: "",
    content: "",
    is_public: false,
    title: ""
  }),
  computed: {
    rules() {
      const rules = [];
      if (this.max) {
        let rule = v =>
          (v || "").length <= this.max ||
          this.$t("createThreadForm.validateMaxError", { max: this.max });
        rules.push(rule);
      }
      rules.push(
        v =>
          (v || "").length !== 0 ||
          this.$t("createThreadForm.validateNullError")
      ); // @TODO i18n
      return rules;
    }
  },
  methods: {
    async create() {
      let createData = {
        username: this.username,
        content: this.content,
        title: this.title,
        is_public: this.is_public
      };
      this.sending = true;
      let response = await this.createThread(createData);
      if (response.data.code === 200) {
        this.sending = false;
        this.reset();
        this.showCreate = !this.showCreate;
        let newThreadID = response.data.data.thread;
        router.push(`/thread/${newThreadID}`);
      } else {
        this.sending = false;
        this.makeToast(response.data.toast);
      }
    },
    createThread({ username, content, title }) {
      return this.$http.post("thread", {
        action: "create",
        data: { title: title, username: username, content: content }
      });
    },
    reset() {
      this.$refs.createForm.reset();
    },
    makeToast(toastData) {
      toastData.map(toast => {
        if (toast.code >= 400 && toast.code < 500) {
          this.$dialog.message.error(this.$t(toast.identifier), {
            position: "bottom-left",
            icon: true
          });
        } else {
          this.$dialog.message.info(this.$t(toast.identifier), {
            position: "bottom-left",
            icon: true
          });
        }
      });
    }
  }
};
</script>
