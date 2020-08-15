<template>
  <v-card class="mx-auto">
    <!--<v-card-title>
            <span class="title font-weight-light">{{ threadData.title }}</span>
        </v-card-title>-->
    <div class="markdown" v-html="compiledContent"></div>
    <v-card-actions>
      <v-list-item class="grow">
        <v-icon class="mr-1">mdi-account-circle</v-icon>
        <v-list-item-content>
          <v-list-item-title>{{ floorData.username }}</v-list-item-title>
        </v-list-item-content>
        <v-row align="center" justify="end">
          <v-icon class="mr-1">mdi-clock</v-icon>
          <span class="subheading mr-2">{{ floorData.time }}</span>
          <!--<span class="mr-1">·</span>-->
        </v-row>
      </v-list-item>
    </v-card-actions>
  </v-card>
</template>

<style>
.markdown code {
  white-space: pre-wrap;
  overflow-wrap: break-word;
}
.markdown {
  padding: 16px;
}
</style>

<script>
import marked from "marked";
import DOMPurify from "dompurify";
export default {
  props: {
    floorData: {
      type: Object,
      default: () => {
        return {
          username: "Lakejason0",
          content: "No description provided.",
          time: "2077-2-29 13:00:00"
        };
      }
    },
    threadData: {
      type: Object,
      default: () => {
        return {
          title: "Title"
        };
      }
    }
  },
  computed: {
    compiledContent() {
      let markdownContent = marked(this.floorData.content);
      let sanitizedContent = DOMPurify.sanitize(markdownContent, {
        KEEP_CONTENT: true
      });
      return sanitizedContent;
    }
  }
};
</script>
