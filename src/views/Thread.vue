<template>
    <v-row
        align="center"
        justify="center"
    >
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
    props: {
        threadData: Object
    },
    methods: {
        getThreadData = () => {}
    }
}
</script>