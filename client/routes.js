/// routing
Router.configure({
  layoutTemplate: 'ApplicationLayout'
});

Router.route('/', function () {
  this.render('navbar', {
    to:"navbar"
  });
  this.render('websites', {
    to: 'main',
    onBeforeAction:function () {
      Session.set('search', '');
    }
  });
});

Router.route('/websites', function () {
  this.render('navbar', {
    to:"navbar"
  });
  this.render('websites', {
    to: 'main',
    onBeforeAction:function () {
      Session.set('search', '');
    }
  });
});

Router.route('/websites/:_id', function () {
  this.render('navbar', {
    to:"navbar"
  });
  this.render('website_detail', {
    to:"main",
    data:function(){
      return Websites.findOne({_id:this.params._id});
    },
    onBeforeAction:function () {
      Session.set('website_id', this.params._id);
    }
  });
});
