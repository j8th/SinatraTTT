'use strict';

function Game(a_board, a_server) {
  // Private Data Members
  var board = a_board;
  var server = a_server;

  // Initialization
  board.add_listener(this);
  server.new_game();


  // Public Methods
  this.listen_board_click_event = function(spot) {
    server.send_move(spot, function(json){
      board.place('X', spot);
      if( json.aimove !== undefined )
        board.place('O', json.aimove);
      board.draw();
    });
  };
}