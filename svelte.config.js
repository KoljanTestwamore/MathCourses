import adapter from "@sveltejs/adapter-static";
import sveltePreprocess from 'svelte-preprocess';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  // hydrate the <div id="svelte"> element in src/app.html
  target: "#svelte",
  preprocess: sveltePreprocess(),
  files: {
    assets: "static"
  },
  kit: {
    adapter: adapter({
      // default options are shown
      pages: "build",
      assets: "build",
      fallback: null,
    }),
    paths: {
      // YOUR github repository name
      base: "/MathCourses/",
    },
  },
};

export default config;