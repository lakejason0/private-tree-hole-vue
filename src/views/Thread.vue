<template>
    <v-row
        align="center"
        justify="center"
    >
        <v-col
            cols="12"
            sm="8"
            md="8"
        >
            <h1 class="text-h2">{{ threadData.thread.title }}</h1>
        </v-col>
        <v-col
            cols="12"
            sm="8"
            md="8"
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
</template>

<script>
import threadCard from "@/components/threadCard.vue";

export default {
    name: "Thread",
    components: {
        threadCard
    },
    data: () => ({
        threadData: {title: "Loading...", thread: "Loading...", posts: []}
    }),
    async mounted() {
        let response = await this.getThreadData(this.$route.params.threadUID)
        this.threadData = response.data.data
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