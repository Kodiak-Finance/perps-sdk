import { defineConfig } from "tsup";

export default defineConfig((options) => ({
  entry: ["src/index.ts"],
  splitting: false,
  minify: !options.watch,
  format: ["cjs", "esm"],
  target: "es6",
  sourcemap: true,
  clean: true,
  dts: true,
}));
