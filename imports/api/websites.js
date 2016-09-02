positive_vote = function(website_id, user_id) {
  //check if the user has already votes
  positive_count = Websites.find({_id:website_id, 'positive_votes._user_id': {$in: [user_id]}}).count();
  negative_count = Websites.find({_id:website_id, 'negative_votes._user_id': {$in: [user_id]}}).count();

  if(positive_count > 0){
    return true;
  } else if (negative_count > 0) {
    Websites.update(
      {_id:website_id},
      {
        $push: {positive_votes: {_user_id: user_id, createdOn:new Date()}},
        $inc: {votes: 2},
        $pull: {negative_votes: {_user_id: user_id}}
      }
    );
  } else {
    Websites.update(
      {_id:website_id},
      {
        $push: {positive_votes: {_user_id: user_id, createdOn:new Date()}},
        $inc: {votes: 1}
      }
    );
  }
};

negative_vote = function(website_id, user_id) {
  //check if the user has already votes
  negative_count = Websites.find({_id:website_id, 'negative_votes._user_id': {$in: [user_id]}}).count();
  positive_count = Websites.find({_id:website_id, 'positive_votes._user_id': {$in: [user_id]}}).count();

  if(negative_count > 0){
    return true;
  } else if (positive_count > 0){
    Websites.update(
      {_id:website_id},
      {
        $push: {negative_votes: {_user_id: user_id, createdOn:new Date()}},
        $inc: {votes: -2},
        $pull: {positive_votes: {_user_id: user_id}}
      }
    );
  } else {
    Websites.update(
      {_id:website_id},
      {
        $push: {negative_votes: {_user_id: user_id, createdOn:new Date()}},
        $inc: {votes: -1}
      }
    );
  }
};
