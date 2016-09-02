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
