const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: "43jx7h",
  e2e: {
    supportFile: false,
    baseUrl: "http://qamid.tmweb.ru",
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});