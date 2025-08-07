import { defineConfig } from "tsup";

export default defineConfig([
  {
    entry: ["src/index.ts"],
    outDir: "dist/node",
    format: ["cjs"],
    target: "node18",
    dts: true,
    splitting: false,
    sourcemap: true,
    clean: true,
    watch: true,
    onSuccess: "node dist/node/index.cjs",
  },
  // Vercel Serverless 入口
  {
    entry: ["serverless/vercel.ts"],
    outDir: "dist/serverless",
    format: "esm", // Vercel 推荐 ESM
    target: "node18",
    platform: "node",
    sourcemap: true,
    splitting: false,
    clean: false,
  },
]);
