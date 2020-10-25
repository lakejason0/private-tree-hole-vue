<template>
  <div>
    <v-row align="center" justify="center">
        <v-col cols="12" md="8" sm="8">
            <thread-card />
        </v-col>
    </v-row>
  </div>
</template>
<script>
import threadCard from "@/components/threadCard.vue"
export default {
    components: {
        threadCard
    }
}
</script>