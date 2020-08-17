<template>
  <div class="home">
    <v-row align="center" justify="center">
      <v-col cols="12" md="8" sm="8">
        <h1 class="text-h2">{{ $t("home.title") }}</h1>
      </v-col>
      <v-col cols="12" md="8" sm="8">
        <h2 class="text-h4">{{ $t("home.summaryParagraphTitle") }}</h2>
      </v-col>
      <v-col cols="12" md="8" sm="8">
        <p>{{ $t("home.summaryParagraph") }}</p>
      </v-col>
      <v-col cols="12" md="8" sm="8">
        <h2 class="text-h4">{{ $t("home.usageParagraphTitle") }}</h2>
      </v-col>
      <v-col cols="12" md="8" sm="8">
        <p>{{ $t("home.usageParagraph") }}</p>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {};
</script>
