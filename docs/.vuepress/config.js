module.exports = {
  title: 'Leaps',
  description: 'Vue.js physics based animation library',
  base: '/leaps/',
  serviceWorker: true,
  head: [
    ['meta', { charset: 'utf-8' }],
    ['meta', { name: "theme-color", content: "#41b883" }],
    ['meta', { name: 'viewport', content: 'width=device-width, initial-scale=1' }],
    ['meta', { property: 'og:image', content: '/leaps/leaps.svg' }],
  ],
  themeConfig: {
    repo: 'baianat/leaps',
    docsRepo: 'baianat/leaps',
    docsDir: 'docs',
    docsBranch: 'master',
    editLinks: true,
    locales: {
      '/': {
        label: 'English',
        selectText: 'Languages',
        editLinkText: 'Help us improve this page!',
        nav: [
          { text: 'Leaps', link: '/leaps' },
          { text: 'Parallax', link: '/parallax' },
          { text: 'Reveal', link: '/reveal' }
        ],
        sidebar: [
          'getting-started',
          'leaps',
          'parallax',
          'reveal'
        ]
      }
    }
  }
}