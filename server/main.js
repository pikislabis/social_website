/*jshint esversion: 6 */
import { Meteor } from 'meteor/meteor';

import '../imports/startup/server/fixtures.js';
import '../imports/startup/server/websites-search.js';
import '../imports/api/websites.js';
import '../imports/api/comments.js';

///Hooks
Websites.before.insert(function (userId, doc) {

  if(doc.title && doc.description){
    return true;
  } else {

    // Prepend, if necessary http
    if(!doc.url.startsWith('http')){
      doc.url = 'http://' + doc.url;
    }

    result = ScrapeParser.get(doc.url);

    if(doc.title === ''){
      doc.title = result.title;
    }

    if(doc.description === ''){
      doc.description = result.description;
    }
  }
});
