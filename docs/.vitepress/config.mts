import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'GeoDaLib',
  description: 'a modern Javascript library for spatial data analysis',
  base: '/geoda-lib/',
  markdown: {
    math: true
  },
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Examples', link: '/markdown-examples' },
    ],

    sidebar: [
      {
        text: 'Developer Guide',
        items: [
          { text: 'Get Started', link: '/get-started' },
          { text: 'Architecture', link: '/architecture' },
        ],
      },
      {
        text: 'API Reference',
        items: [
          { text: 'Mapping', link: '/reference/mapping' },
          { text: 'Data Exploration', link: '/reference/data-exploration' },
          { text: 'Spatial Weights', link: '/reference/spatial-weights' },
          { text: 'Spatial Autocorrelation Analysis', link: '/reference/spatial-autocorrelation-analysis' },
          { text: 'Spatial Clustering', link: '/reference/spatial-clustering' },
          { text: 'Spatial Regression', link: '/reference/spatial-regression' },
          { text: 'Spatial Operations', link: '/reference/spatial-operations' },
        ],
      },
      {
        text: 'Examples',
        items: [
          { text: 'React Examples', link: '/react-examples' },
          { text: 'Node Examples', link: '/node-examples' },
        ],
      },
      {
        text: 'TypeScript API',
        link: '/api/globals',
      },
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/geodacenter/geoda-lib' },
    ],
  },
});
