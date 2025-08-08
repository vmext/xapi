import { defineConfig } from "tsup";

const configs: any[] = [];
if (process.env.dev == "1") {
  configs.push({
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
  });
} else {
  configs.push({
    entry: ["src/index.ts"],
    outDir: "dist/node",
    format: ["cjs"],
    target: "node18",
    dts: true,
    splitting: false,
    sourcemap: true,
    clean: true,
  });
}
configs.push({
  // Vercel Serverless 入口
  entry: ["serverless/vercel.ts"],
  outDir: "dist/api",
  format: "esm", // Vercel 推荐 ESM
  target: "node18",
  platform: "node",
  sourcemap: true,
  splitting: false,
  clean: true,
});
export default defineConfig(configs);
