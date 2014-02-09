(function($){
  var toonItems;
  var score = 0;
  var finished = false;
  var time = 15000;
  $(document).on('ready', function(){
    $.get('/list')
      .success(function(data){
        toonItems = data;
        start();
      })
      .error(function(){
        alert('Unable to get items, please try refreshing');
      });
  });
  function start(){
    setTimeout(done, time);
    nextItem();
  }
  function nextItem(){
    $('#onion').off('click');
    $('#notonion').off('click');
    if (toonItems.length > 0){
      var thisItem = toonItems.pop();
      if (thisItem.type === 'onion'){
        $('#onion').on('click', correct);
        $('#notonion').on('click', incorrect);
      } else {
        $('#onion').on('click', incorrect);
        $('#notonion').on('click', correct);
      }
      $("#item").html(thisItem.item);
    } else {
      done();
    }
  }
  function done(){
    if (!finished) {
      // TODO: Replace boolean finished with something better
      // TODO: Nicer
      // TODO: Social media share
      alert("You scored " + score);
    } else {
      finished = true;
    }
  }
  function incorrect (){
    // TODO: Show some acknowledgement 
    nextItem();
  }
  function correct (){
    // TODO: Show some acknowledgement 
    nextItem();
    score++;
  }
}($));