<template>
  <div class="thread">
    <v-row align="center" justify="center" v-if="loading">
      <v-col cols="12" md="8" sm="8">
        <h1 class="text-h2">
          <v-skeleton-loader type="heading" class="my-4"></v-skeleton-loader>
        </h1>
      </v-col>
      <v-col cols="12" md="8" sm="8">
        <h2 class="text-h6">
          <v-skeleton-loader type="heading" class="mx-auto"></v-skeleton-loader>
        </h2>
      </v-col>
      <v-col cols="12" md="8" sm="8">
        <thread-card-skeleton />
      </v-col>
      <v-col cols="12" md="8" sm="8">
        <thread-card-skeleton />
      </v-col>
      <v-col cols="12" md="8" sm="8">
        <thread-card-skeleton />
      </v-col>
    </v-row>
    <v-row align="center" justify="center" v-else-if="success && !loading">
      <v-col cols="12" md="8" sm="8">
        <h1 class="text-h2">{{ threadData.thread.title }}</h1>
      </v-col>
      <v-col cols="12" md="8" sm="8">
        <h2 class="text-h6">{{ threadData.thread.thread }}</h2>
      </v-col>
      <v-col
        cols="12"
        sm="8"
        md="8"
        v-for="floorData in threadData.posts"
        :key="floorData.floor"
      >
        <thread-card :floor-data="floorData" />
      </v-col>
      <v-col cols="12" sm="12" md="12">
        <v-spacer></v-spacer>
      </v-col>
      <v-col cols="12" sm="12" md="12">
        <v-spacer></v-spacer>
      </v-col>
      <v-col cols="12" sm="12" md="12">
        <v-spacer></v-spacer>
      </v-col>
      <reply-thread-form
        ref="replyForm"
        @reply="reply"
        :sending="sending"
        @toggle-reply="toggleReply"
        :showReply="showReply"
      />
    </v-row>
    <v-row v-else align="center" justify="center">
      <v-alert prominent type="error">
        <v-row align="center">
          <v-col class="grow">
            {{ $t("thread.notFoundError") }}
          </v-col>
          <v-col class="shrink">
            <v-btn @click="backToGetThread">{{
              $t("thread.goBackButton")
            }}</v-btn>
          </v-col>
        </v-row>
      </v-alert>
    </v-row>
    <create-thread-form />
  </div>
</template>

<script>
import threadCard from "@/components/threadCard.vue";
import threadCardSkeleton from "@/components/threadCardSkeleton.vue";
import createThreadForm from "@/components/createThreadForm.vue";
import router from "../router";
import replyThreadForm from "@/components/replyThreadForm.vue";

export default {
  name: "Thread",
  components: {
    threadCard,
    threadCardSkeleton,
    createThreadForm,
    replyThreadForm
  },
  data: () => ({
    threadData: { title: "Loading...", thread: "Loading...", posts: [] },
    loading: true,
    sending: false,
    showReply: false,
    success: false
  }),
  mounted() {
    this.init();
  },
  beforeRouteUpdate(to, from, next) {
    if (to.fullPath != from.fullPath) {
      next();
      this.init();
    }
  },
  methods: {
    async init() {
      let response = await this.getThreadData(this.$route.params.threadID);
      this.loading = false;
      if (response.data.code === 200) {
        this.threadData = response.data.data;
        this.success = true;
      } else {
        this.makeToast(response.data.toast);
      }
      this.$on("reply", this.reply);
    },
    async reply(replyData) {
      this.sending = true;
      let response = await this.replyThread({
        threadID: this.$route.params.threadID,
        ...replyData
      });
      if (response.data.code === 200) {
        this.init();
        this.toggleReply();
        this.sending = false;
        this.$refs.replyForm.reset();
      } else {
        this.sending = false;
        this.makeToast(response.data.toast);
      }
    },
    getThreadData(threadID) {
      return this.$http.post(`thread/${threadID}`, {
        action: "get",
        data: { thread: threadID }
      });
    },
    replyThread({ username, content, threadID }) {
      return this.$http.post(`thread/${threadID}`, {
        action: "reply",
        data: { thread: threadID, username: username, content: content }
      });
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
    },
    toggleReply() {
      this.showReply = !this.showReply;
    },
    backToGetThread: () => {
      router.push("/thread/");
    }
  }
};
</script>
