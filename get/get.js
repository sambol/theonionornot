var onion = require("./onion");
var nottheonion = require("./nottheonion");
var async = require("async");
module.exports = function(callback){
  var links = {};
  var asyncfuncs = [
    function(done){
      onion.get(function(data){
        links['onion'] = data;
        done();
      });
    }, function(done){
      nottheonion.get(function(data){
        links['notonion'] = data;
        done();
      });
    }
  ];
  async.series(asyncfuncs, function(err, data){
    callback(links);
  });
}