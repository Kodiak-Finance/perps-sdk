import type { StorybookConfig } from "@storybook/react-vite";
import { mergeConfig } from "vite";
import type { UserConfig } from "vite";
import { getWatchIgnores } from "../watchPackages.config.ts";

/**
 * This function is used to resolve the absolute path of a package.
 * It is needed in projects that use Yarn PnP or are set up within a monorepo.
 * When configuring addons in Storybook v9, getAbsolutePath is usually not required.
 */
// function getAbsolutePath(value: string): any {
//   return dirname(require.resolve(join(value, "package.json")));
// }

const disabledAddons = process.env.STORYBOOK_DISABLED_ADDONS === "true";

function getStories() {
  // need to use process.env instead of import.meta.env
  const pages = process.env.STORYBOOK_PAGES;

  if (pages) {
    const list = pages.split(",").map((item) => item.trim());

    // package page dir
    const map = {
      trading: "trading",
      portfolio: "portfolio",
      markets: "markets",
      affiliate: "affiliate",
      rewards: "trading-rewards",
      leaderboard: "trading-leaderboard",
    };

    const prefix = "../src/stories/package";
    const suffix = "**/*.stories.@(js|jsx|mjs|ts|tsx)";

    return list
      .map((item) => map[item as keyof typeof map])
      .filter(Boolean)
      .map((item) => `${prefix}/${item}/${suffix}`);
  }

  const mdxStories = disabledAddons
    ? []
    : [
        "../src/**/*.mdx",
        // "../src/stories/**/*.mdx",
        // "../src/documentation/**/*.mdx",
      ];

  const defaultStories = [
    ...mdxStories,
    "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)",
  ];

  return defaultStories;
}

const getAddons = () => {
  const alwaysAddons = ["@storybook/addon-themes"];

  const addons = disabledAddons
    ? []
    : [
        "@chromatic-com/storybook",
        "@storybook/addon-docs",
        "@storybook/addon-a11y",
        "@storybook/addon-vitest",
        "@storybook/addon-links",
        "../src/addons/theme_tool/register.ts",
        // "../src/addons/walletConnect/register.ts",
      ];

  return [...alwaysAddons, ...addons];
};

const config: StorybookConfig = {
  stories: getStories(),
  addons: getAddons(),
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  typescript: {
    reactDocgen: "react-docgen-typescript",
  },
  core: {
    // https://storybook.js.org/telemetry
    disableTelemetry: true,
  },
  // custom build options: https://storybook.js.org/docs/api/main-config/main-config-build
  // build: {
  //   test: {
  //     disableBlocks: true,
  //     disabledAddons: [
  //       "@storybook/addon-docs",
  //       "@storybook/addon-essentials/docs",
  //       "@storybook/addon-coverage",
  //       "@storybook/addon-a11y",
  //       "@storybook/addon-vitest",
  //     ],
  //     disableMDXEntries: true,
  //     disableAutoDocs: true,
  //     disableDocgen: true,
  //     disableSourcemaps: true,
  //     disableTreeShaking: true,
  //   },
  // },
  viteFinal: async (config) => {
    // console.log("config", config);

    // merge custom config to storybook vite config
    return mergeConfig<UserConfig, UserConfig>(config, {
      server: {
        // using warmup can slow down the initial page load.
        // warmup: {
        //   clientFiles: [],
        // },
        watch: {
          ignored: getWatchIgnores(),
        },
      },
      // build: {
      //   rollupOptions: {
      //     maxParallelFileOps: 10,
      //   },
      //   commonjsOptions: {
      //     sourceMap: false,
      //   },
      //   chunkSizeWarningLimit: 1000,
      //   sourcemap: false,
      // },
    });

    // return config;
  },
};

export default config;
