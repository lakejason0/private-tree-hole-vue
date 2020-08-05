module.exports = {
  transpileDependencies: ["vuetify"],

  devServer: {
    proxy: {
      "/api": {
        target: "http://127.0.0.1:5000",
        changeOrigin: true
      }
    }
  },

  pluginOptions: {
    i18n: {
      locale: "en",
      fallbackLocale: "en",
      localeDir: "locales",
      enableInSFC: false
    }
  }
};
