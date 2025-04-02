import esbuild from 'esbuild';
import fs from 'fs';

const isDev = process.argv.includes('--dev');

// Create base configuration factory
export const createBaseConfig = (options = {}) => {
  return {
    bundle: true,
    minify: !isDev,
    sourcemap: true,
    metafile: true,
    target: ['esnext'],
    format: 'esm',
    platform: 'neutral',
    ...options,
  };
};

// Build function for different formats
export const buildFormat = async (config, format, outfile) => {
  const result = await esbuild.build({
    ...config,
    format,
    ...(format === 'cjs' ? { platform: 'node', target: ['es2017'] } : {}),
    define: {
      ...config.define,
      // Ensure consistent module loading behavior
      'import.meta.url': 'undefined',
    },
    ...(outfile ? { outfile } : {}),
  });

  const metaFile = outfile ? outfile.replace(/\.(js|cjs)$/, '.meta.json') : 'dist/meta.json';
  if (isDev) {
    fs.writeFileSync(metaFile, JSON.stringify(result.metafile));
  }

  console.log(`${format.toUpperCase()} build complete! ✨`);

  return result;
};
