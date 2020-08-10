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
      <v-col
            cols="12"
            sm="8"
            md="8"
            v-for="floorData in threadData.posts"
            :key="floorData.floor"
      >
            <thread-card :floor-data="floorData"/>
      </v-col>
    </v-row>
    <v-row v-else align="center"
           justify="center">
      <v-alert prominent type="error">
        <!-- // @TODO i18n -->
        <v-row align="center">
            <v-col class="grow">
                {{$t('thread.notFoundError')}}
            </v-col>
            <v-col class="shrink">
                <v-btn @click="backToGetThread">{{$t('thread.goBackButton')}}</v-btn>
            </v-col>
        </v-row>
      </v-alert>
    </v-row>
  </div>
</template>

<script>
import threadCard from "@/components/threadCard.vue";
import router from "../router";

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
    let response = await this.getThreadData(this.$route.params.threadID)

    this.loading = false
    if (response.data.code === 200) {
      this.threadData = response.data.data
      this.success = true
    }
    console.log(this.threadData)
  },
  methods: {
    getThreadData(threadID) {
      return this.$http.post(`thread/${threadID}`, {
        action: "get",
        data: {thread: threadID}
      })
    },
    makeToast: (toastData) => {
      return toastData;
    },
    backToGetThread: () => {
        router.push("thread/")
    }
  }
}
</script>
