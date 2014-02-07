var express = require("express");
var app = express();
var getter = require("./get/get");
app.use(express.static(__dirname + '/public'));
var links = {};
getter(function(linkobj){
  links = linkobj;
});
function getLinks(callback){
  var linkList = [];
  function addItem(item, type){
    var alreadyInList = false;
    linkList.map(function(itemInList){
      if (itemInList.item == item){
        alreadyInList = true;
      }
    });
    if (!alreadyInList){
      linkList.push({item: item, type :type});
    }
    return !alreadyInList;
  }
  for (var j = 0; j < 9; j++){
    var rand = Math.random();
    if (rand> 0.5){
      // use onion
      var i =0; //Maximum number of retries
      var max = 10;
      while(!addItem(links.onion[Math.floor(Math.random() * links.onion.length)], "onion") && i < max){
        i++;
      }

    } else {
      // use notonion
      
      var i =0; //Maximum number of retries
      var max = 10;
      while(!addItem(links.notonion[Math.floor(Math.random() * links.notonion.length)], "notonion") && i < max){
        i++;
      }
    }
  }
  callback(linkList);
}

app.get("/list", function(req, res){
  getLinks(function(linklist){
    res.json(linklist);
  });
});

app.listen(3000);