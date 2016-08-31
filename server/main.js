/*jshint esversion: 6 */
import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
  // code to run on server at startup
  if (!Websites.findOne()){
    console.log("No websites yet. Creating starter data.");
    Websites.insert({
      title:"Goldsmiths Computing Department",
      url:"http://www.gold.ac.uk/computing/",
      description:"This is where this course was developed.",
      votes: 0,
      positive_votes: [],
      negative_votes: [],
      createdOn:new Date()
    });
    Websites.insert({
      title:"University of London",
      url:"http://www.londoninternational.ac.uk/courses/undergraduate/goldsmiths/bsc-creative-computing-bsc-diploma-work-entry-route",
      description:"University of London International Programme.",
      votes: 0,
      positive_votes: [],
      negative_votes: [],
      createdOn:new Date()
    });
    Websites.insert({
      title:"Coursera",
      url:"http://www.coursera.org",
      description:"Universal access to the world’s best education.",
      votes: 0,
      positive_votes: [],
      negative_votes: [],
      createdOn:new Date()
    });
    Websites.insert({
      title:"Google",
      url:"http://www.google.com",
      description:"Popular search engine.",
      votes: 0,
      positive_votes: [],
      negative_votes: [],
      createdOn:new Date()
    });
  }
});

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
