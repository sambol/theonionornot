var Reddit = require('handson-reddit'); // working title
module.exports.get = function(callback){
  reddit = new Reddit();

  reddit.r('nottheonion', function (err, res) {
    var results = JSON.parse(res.body)
    if(results && results.data && results.data.children){
      var rlist = [];
      results.data.children.map(function(post){
        if(post.data && post.data.title){
          rlist.push(post.data.title);
        }
      });
      callback(rlist);
    }

  });

}
