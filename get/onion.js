var parseString = require('xml2js').parseString;
var request = require('request');
module.exports.get = function(callback){
  request('http://feeds.theonion.com/theonion/daily', function (error, response, body) {
    if (!error && response.statusCode == 200) {
      parse(body, callback);
    }
  })
  function parse(xml, callback){
    parseString(xml, function (err, result) {
      var results = [];
      result.rss.channel[0].item.map(function(story){
        results.push(story.title[0]);
      });
      callback(results);
    });
  }
};
