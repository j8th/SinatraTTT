'use strict';

function Game(a_board, a_server) {
  // Private Data Members
  var board = a_board;
  var server = a_server;

  // Initialization


  // Public Methods
  this.listen_board_click_event = function(spot) {
    server.send_move(spot, function(data){
      board.place('X', spot);
    });
  };
}