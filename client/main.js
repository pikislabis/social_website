/*jshint esversion: 6 */

import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';
import './routes.js';

/// accounts config
Accounts.ui.config({
  passwordSignupFields: "USERNAME_AND_EMAIL"
});

/// search config
WebsitesSearch =
  new SearchSource(
    'websites', ['title', 'description'],
    {keepHistory: 100 * 60 * 5, localSearch: true}
  );

/// Templates
Template.registerHelper('formatDate', function(date, format = 'absolute') {
  if(format === 'relative'){
    return moment(date).fromNow();
  } else {
    return moment(date).format('DD MMM YYYY');
  }
});

Template.registerHelper('getUsername', function(user_id) {
  user = Meteor.users.findOne({_id: user_id});
  if (user){
    return user.username;
  }
  else {
    return "anon";
  }
});

Template.website_form.events({
  "click .js-toggle-website-form":function(event){
    $("#website_form").toggle('slow');
  },

  'submit .js-save-website-form':function(event){
    var url, title, description;

    url = event.target.url.value;
    title = event.target.title.value;
    description = event.target.description.value;

    if(Meteor.user()){
      Websites.insert({
        url:url,
        title:title,
        description:description,
        votes: 0,
        positive_votes: [],
        negative_votes: [],
        createdOn:new Date(),
        createdBy:Meteor.user()._id
      });
    }

    $("#website_form").toggle('slow');
    return false;
  }
});

Template.searchBox.events({
  "keyup #searchbox": _.throttle(function(e) {
    var text = $(e.target).val().trim();
    Session.set('search', text);
  }, 200)
});

Template.website_list.helpers({
  websites: function() {
    if(Session.get('search')){
      WebsitesSearch.search(Session.get('search'));
      return WebsitesSearch.getData({
        sort: { votes: -1, createdOn: -1 }
      });
    } else {
      return Websites.find({}, {sort: { votes: -1, createdOn: -1 }});
    }
  }
});

Template.website_list.events({
});

Template.website_item.events({
  "click .js-upvote":function(event){
    // example of how you can access the id for the website in the database
    // (this is the data context for the template)
    if(Meteor.user()){
      var website_id = this._id;
      positive_vote(website_id, Meteor.user()._id);
    }

    return false;// prevent the button from reloading the page
  },
  "click .js-downvote":function(event){
    // example of how you can access the id for the website in the database
    // (this is the data context for the template)
    if(Meteor.user()){
      var website_id = this._id;
      negative_vote(website_id, Meteor.user()._id);
    }

    return false;// prevent the button from reloading the page
  }
});

Template.comment_form.events({
  "submit .js-save-comment-form": function(event){
    var text, website_id;

    text = event.target.text.value;
    website_id = event.target.website_id.value;

    if(Meteor.user()){
      Comments.insert({
        text:text,
        _website_id:website_id,
        createdOn:new Date(),
        createdBy:Meteor.user()._id
      });
    }

    return false;
  }
});


Template.comment_list.helpers({
  comments: function(event, template){
    return Comments.find({_website_id: this._website_id}, {sort:{createdOn: -1}});
  }
});
