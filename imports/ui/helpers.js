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
