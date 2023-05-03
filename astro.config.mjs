import { defineConfig } from 'astro/config';

import webmanifest from "astro-webmanifest";

// https://astro.build/config
export default defineConfig({
  integrations: [webmanifest({
    /**
     * required
     **/
    name: 'Studio HENK',
    icon: 'src/images/your-icon.svg',
  })]
});