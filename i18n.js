module.exports = {
  locales: ['en', 'fr', 'de'],
  pages: {
    '/': ['home'],
  },
  loadLocaleFrom: (locale, namespace) =>
    import(`./src/locales/${locale}/${namespace}.json`).then((m) => m.default),
};
