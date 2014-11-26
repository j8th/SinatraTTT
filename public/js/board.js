'use strict';

function Board(element_string) {

  // Private Data Members
  var obj = $(element_string);
  var spots = [];
  var cells = [];
  var listeners = [];
  var me = this;

  // Initialization
  for(var i = 0; i < Board.BOARD_SIZE; i++)
    spots[i] = null;

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

  this.to_s = function(){
    var string = '';
    for(var i = 0; i < Board.BOARD_SIZE; i++)
      if (spots[i] === null)
        string += 'E';
      else
        string += spots[i];
    return string;
  };

}

// Class Constants
Board.BOARD_SIZE = 9;


// Class Methods
Board.from_s = function(board_string) {
  var board = new Board();
  for(var i = 0; i < Board.BOARD_SIZE; i++)
    if(board_string[i] != 'E')
      board.place(board_string[i], i);
  return board;
};
