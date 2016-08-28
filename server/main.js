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

// Hooks
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
