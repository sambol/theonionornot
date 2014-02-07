var onion = require("./onion");
var nottheonion = require("./nottheonion");
var sep = new Array(5).join("=");
var async = require("async");

var asyncfuncs = [
function(done){
  console.log(sep + " Onion " + sep);
  onion.get(function(data){
    console.log(data);
    done();
  });
}, function(done){
  console.log(sep + " Not the Onion " + sep);
  nottheonion.get(function(data){
    console.log(data);
    done();
  });
}];

async.series(asyncfuncs);
