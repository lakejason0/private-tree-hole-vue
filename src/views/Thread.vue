<template>
  <div>
    <v-row align="center"
           justify="center" v-if="loading">
      <v-col
          cols="12"
          md="8"
          sm="8"
      >
        <h1 class="text-h2"><v-skeleton-loader
            type="heading"
            class="my-4"
        ></v-skeleton-loader></h1>
      </v-col>
      <v-col
          cols="12"
          md="8"
          sm="8"
      >
        <h2 class="text-h6"><v-skeleton-loader
            type="heading"
            class="mx-auto"
        ></v-skeleton-loader></h2>
      </v-col>
    </v-row>
    <v-row
        align="center"
        justify="center"
        v-else-if="success && !loading"
    >
      <v-col
          cols="12"
          md="8"
          sm="8"
      >
        <h1 class="text-h2">{{ threadData.thread.title }}</h1>
      </v-col>
      <v-col
          cols="12"
          md="8"
          sm="8"
      >
        <h2 class="text-h6">{{ threadData.thread.thread }}</h2>
      </v-col>
    </v-row>
    <v-row v-else align="center"
           justify="center">
      <v-alert type="error">
        <!-- // @TODO i18n -->
        不存在!
      </v-alert>
    </v-row>
  </div>
</template>

<script>
import threadCard from "@/components/threadCard.vue";

export default {
  name: "Thread",
  components: {
    threadCard
  },
  data: () => ({
    threadData: {title: "Loading...", thread: "Loading...", posts: []},
    loading: true,
    success: false
  }),
  async mounted() {
    let response = await this.getThreadData(this.$route.params.threadUID)

    this.loading = false
    if (response.data.code === 200) {
      this.threadData = response.data.data
      this.success = true
    }
    console.log(this.threadData)
  },
  methods: {
    getThreadData(threadUID) {
      return this.$http.post(`thread/${threadUID}`, {
        action: "get",
        data: {thread: threadUID}
      })
    },
    makeToast: (toastData) => {
      return toastData;
    }
  }
}
</script>
