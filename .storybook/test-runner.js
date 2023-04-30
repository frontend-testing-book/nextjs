const { getStoryContext } = require("@storybook/test-runner");
const { injectAxe, checkA11y, configureAxe } = require("axe-playwright");

module.exports = {
  async preRender(page, context) {
    if (context.name.startsWith("SP")) {
      page.setViewportSize({ width: 375, height: 667 });
    } else {
      page.setViewportSize({ width: 1280, height: 800 });
    }
    await injectAxe(page);
  },
  async postRender(page, context) {
    const storyContext = await getStoryContext(page, context);
    if (storyContext.parameters?.a11y?.disable) {
      return;
    }
    await configureAxe(page, {
      rules: storyContext.parameters?.a11y?.config?.rules,
    });
    await checkA11y(page, "#root", {
      includedImpacts: ["critical", "serious"],
      detailedReport: false,
      detailedReportOptions: { html: true },
      axeOptions: storyContext.parameters?.a11y?.options,
    });
  },
};
