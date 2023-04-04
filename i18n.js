module.exports = {
  locales: ['en', 'fr', 'de', 'pt'],
  defaultLocale: 'en',
  pages: {
    '/': ['home'],
    '/pricing': ['home'],
    '/tool': ['home'],
    '/redesign/[id]': ['home'],
    '/dashboard': ['home'],
    '/termsconditions': ['home'],
    '/privacypolicy': ['home'],
  },
  loadLocaleFrom: (locale, namespace) =>
    import(`./src/locales/${locale}/${namespace}.json`).then((m) => m.default),
};
