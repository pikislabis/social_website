/// search config
WebsitesSearch =
  new SearchSource(
    'websites', ['title', 'description'],
    {keepHistory: 100 * 60 * 5, localSearch: true}
  );
