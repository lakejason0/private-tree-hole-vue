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
            <h1>{{ threadData.title }}</h1>
            <h2>{{ threadData.thread }}</h2>
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
        threadData: null
    }),
    async mounted() {
        this.threadData = await this.getThreadData(this.$route.params.threadUID)
    }
}
</script>