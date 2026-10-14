import { defineConfig } from 'vite'
import path from 'path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'

// Resolve figma:asset/* imports to local files in the assets/ directory
function figmaAssetPlugin() {
  return {
    name: 'figma-asset-resolver',
    resolveId(id: string) {
      if (id.startsWith('figma:asset/')) {
        const filename = id.replace('figma:asset/', '');
        const localPath = path.resolve(__dirname, 'assets', filename);
        if (fs.existsSync(localPath)) {
          return localPath;
        }
        // Return a virtual module for missing assets
        return '\0figma-missing-asset:' + filename;
      }
      if (id === 'figma:foundry-client-api') {
        return '\0figma-foundry-client-api';
      }
    },
    load(id: string) {
      if (id.startsWith('\0figma-missing-asset:')) {
        // Return empty string for missing assets
        return 'export default ""';
      }
      if (id === '\0figma-foundry-client-api') {
        return 'export default {}';
      }
    },
  };
}

export default defineConfig({
  plugins: [
    figmaAssetPlugin(),
    // The React and Tailwind plugins are both required for Make, even if
    // Tailwind is not being actively used – do not remove them
    react({
      babel: {
        // Always use compact output — suppresses the "deoptimised styling"
        // warning that fires when a source file exceeds 500 KB.
        compact: true,
      },
    }),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      // Alias @ to the src directory
      '@': path.resolve(__dirname, './src'),
    },
  },

  // File types to support raw imports. Never add .css, .tsx, or .ts files to this.
  assetsInclude: ['**/*.svg', '**/*.csv'],
})
