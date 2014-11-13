'use strict';

function Board(element_string) {

  // Private Data Members
  var obj = $(element_string);
  var spots = [];
  var cells = [];
  var listeners = [];
  var me = this;

  $('td', obj).each(function(){
    var obj = $(this);
    obj.index = cells.length;
    cells.push(obj);
    obj.click(function(){
      me.click_event(obj.index);
    });
  });


  // Public Methods
  this.place = function(token, i){
    spots[i] = token;
  };

  this.get = function(i) {
    if( spots[i] === undefined )
      return null;
    return spots[i];
  };

  this.click_event = function(index){
    for(var i = 0; i < listeners.length; i++)
      listeners[i].listen_board_click_event(index);
  };

  this.add_listener = function(listener) {
    listeners.push(listener);
  };

  this.draw = function(){
    for(var i = 0; i < Board.BOARD_SIZE; i++) {
      cells[i].text(spots[i]);
    }
  };


}

// Class Constants
Board.BOARD_SIZE = 9;

