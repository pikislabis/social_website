import '../api/websites.js';

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

Template.recommendations.helpers({
  recommendations: function(){}
});
