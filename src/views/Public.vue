<template>
  <div class="public">
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="8">
        <v-card class="elevation-1">
          <v-toolbar
            :color="$vuetify.theme.dark ? 'dark' : 'primary'"
            dark
            flat
          >
            <v-toolbar-title>{{ $t("public.title") }}</v-toolbar-title>
            <v-spacer></v-spacer>
          </v-toolbar>
          <v-list two-line v-if="loading">
            <v-skeleton-loader type="list-item-two-line"></v-skeleton-loader>
            <v-divider></v-divider>
            <v-skeleton-loader type="list-item-two-line"></v-skeleton-loader>
            <v-divider></v-divider>
            <v-skeleton-loader type="list-item-two-line"></v-skeleton-loader>
          </v-list>
          <v-list two-line v-else-if="success && !loading">
            <template v-for="(item, index) in publics">
              <v-list-item :key="item.thread" @click="goToThread(item.thread)">
                <v-list-item-content>
                  <v-list-item-title v-html="item.title"></v-list-item-title>
                  <v-list-item-subtitle
                    v-html="item.thread"
                  ></v-list-item-subtitle>
                </v-list-item-content>
                <v-list-item-action>
                  <v-btn icon>
                    <v-icon>mdi-chevron-right</v-icon>
                  </v-btn>
                </v-list-item-action>
              </v-list-item>
              <v-divider
                v-if="index + 1 < publics.length"
                :key="index"
              ></v-divider>
            </template>
          </v-list>
            <v-alert prominent tile type="error" v-else>
                <v-row align="center">
                    <v-col class="grow">
                        {{ $t("public.error") }}
                    </v-col>
                </v-row>
            </v-alert>
        </v-card>
      </v-col>
    </v-row>
    <create-thread-form />
  </div>
</template>

<script>
import router from "../router";
import createThreadForm from "@/components/createThreadForm.vue";

export default {
  data: () => ({
    publics: [{ thread: "Loading...", title: "Loading..." }],
    loading: true,
    success: false
  }),
  components: {
    createThreadForm
  },
  mounted() {
    this.init();
  },
  methods: {
    getPublicsData() {
      return this.$http.get(`public`, {
        action: "get"
      });
    },
    async init() {
      let response = await this.getPublicsData();
      this.loading = false;
      if (response.data.code === 200) {
        this.publics = response.data.data.publics;
        this.success = true;
      } else {
        this.makeToast(response.data.toast);
      }
    },
    goToThread: threadID => {
      router.push(`/thread/${threadID}`);
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
