'use strict';

function Board(element_string) {

  // Private Data Members
  var obj = $(element_string);
  var spots = [];
  var cells = [];

  // Constructor
  $('td', obj).click(function(){
    console.log('me!');
  });
  // End Constructor


  // Public Methods
  this.place = function(token, i){
    spots[i] = token;
  };

  this.get = function(i) {
    if( spots[i] === undefined )
      return null;
    return spots[i];
  };


}
