import { defineConfig } from "tsup";

const configs: any[] = [];
if (process.env.NODE_ENV == "development") {
  configs.push({
    entry: ["src/index.ts"],
    outDir: "dist/node",
    format: ["cjs"],
    target: "node18",
    dts: true,
    splitting: false,
    sourcemap: true,
    clean: true,
    watch: process.env.WATCH === "1",
    onSuccess: "node dist/node/index.cjs",
  });
} else {
  configs.push(
    {
      entry: ["src/index.ts"],
      outDir: "dist/node",
      format: ["cjs"],
      target: "node18",
      dts: true,
      splitting: false,
      sourcemap: true,
      clean: true,
    },
    // Vercel Serverless 入口
    {
      entry: ["serverless/vercel.ts"],
      outDir: "dist/vercel",
      format: "esm", // Vercel 推荐 ESM
      target: "node18",
      platform: "node",
      sourcemap: true,
      splitting: false,
      clean: true,
    }
  );
}
/* 
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
    //watch: process.env.WATCH === '1',
    //onSuccess: "node dist/node/index.cjs",
  },
  // Vercel Serverless 入口
  {
    entry: ["serverless/vercel.ts"],
    outDir: "dist/vercel",
    format: "esm", // Vercel 推荐 ESM
    target: "node18",
    platform: "node",
    sourcemap: true,
    splitting: false,
    clean: true,
  },
]); */
export default defineConfig(configs);
