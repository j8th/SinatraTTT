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
    board.place('X', spot);
    server.next_state(board, function(board_string){
      var aboard = Board.from_s(board_string);
      for(var i = 0; i < Board.BOARD_SIZE; i++)
        board.place(aboard.get(i), i);
      board.draw();
    });
  };
}