<template>
  <v-menu
    bottom
    left
    max-height="calc(100% - 16px)"
    offset-y
    transition="slide-y-transition"
  >
    <template v-slot:activator="{ attrs, on }">
      <v-btn class="text-capitalize" text v-bind="attrs" v-on="on">
        <v-icon :left="$vuetify.breakpoint.mdAndUp">
          mdi-translate
        </v-icon>

        <span
          class="subtitle-1 text-capitalize font-weight-light hidden-sm-and-down"
          v-text="currentLanguage.name"
        />

        <v-icon class="hidden-sm-and-down" right>
          mdi-menu-down
        </v-icon>
      </v-btn>
    </template>

    <v-list dense nav>
      <template v-for="language in languages">
        <v-list-item :key="language.locale" @click="translateI18n(language)">
          <v-list-item-title v-text="language.name" />
        </v-list-item>
      </template>
    </v-list>
  </v-menu>
</template>

<script>
import languages from "../locales/language.json";

export default {
  name: "BaseLocalesMenu",
  data: () => ({
    languages
  }),
  computed: {
    currentLanguage() {
      const locale = this.$i18n.locale;
      return this.languages.find(l => l.locale === locale);
    }
  },
  methods: {
    translateI18n(lang) {
      lang = lang.locale;

      window.localStorage.setItem("currentLanguage", lang);
      this.$i18n.locale = lang;
    }
  }
};
</script>
