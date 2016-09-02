///SearchSource options
SearchSource.defineSource('websites', function(searchText, _options) {
  var options = {sort: { votes: -1, createdOn: -1 }};

  if(searchText) {
    var regExp = buildRegExp(searchText);
    var selector = {$or: [
      {title: regExp},
      {description: regExp}
    ]};

    return Websites.find(selector, options).fetch();
  } else {
    return Websites.find({}, options).fetch();
  }
});

function buildRegExp(searchText) {
  var parts = searchText.trim().split(/[ \-\:]+/);
  return new RegExp("(" + parts.join('|') + ")", "ig");
}
