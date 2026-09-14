// @lovable.dev/vite-tanstack-config already includes the following do NOT add them manually
// or the app will break with duplicate plugins:
//   - tanstackStart, viteReact, tailwindcss, tsConfigPaths, cloudflare (build-only),
//     componentTagger (dev-only), VITE_* env injection, @ path alias, React/TanStack dedupe,
//     error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... } }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

const isNetlifyBuild = Boolean(process.env.NETLIFY);
const nitroPreset = process.env.NITRO_PRESET ?? (isNetlifyBuild ? "netlify" : "vercel");

// Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
// Use Nitro presets that match the deployment target. Vercel is the default, while Netlify
// can override via env (NETLIFY or NITRO_PRESET=netlify).
export default defineConfig({
  nitro: {
    preset: nitroPreset,
  },
  tanstackStart: {
    server: { entry: "server" },
  },
});
