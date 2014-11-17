describe('Game', function(){
  var board;
  var server;
  var game;


  beforeEach(function(){
    board = new Board();
    server = new Server();
    game = new Game(board, server);

    // Mock the Board's draw() method so that we don't try to
    //     do things to a DOM that doesn't exist in testing.
    spyOn(board, 'draw');

    // Mock out the Server so we don't make real ajax requests.
    spyOn(server, 'send_move').and.callFake(function(myspot, success_callback){
      // The server returns its move.
      var json_obj = { aimove: 0 };
      success_callback(json_obj);
    });
  });



  describe('#listen_board_click_event', function(){
    it('sends a move to the server with the spot clicked.', function(){
      game.listen_board_click_event(4);
      expect(server.send_move).toHaveBeenCalled();
    });

    it('updates the board with the move on success from the server.', function(){
      game.listen_board_click_event(4);
      expect(board.get(4)).toEqual('X');
    });

    it('updates the board with the ai move if one was provided', function(){
      game.listen_board_click_event(4);
      expect(board.get(0)).toEqual('O');
    });

    it('redraws the board', function(){
      game.listen_board_click_event(7);
      expect(board.draw).toHaveBeenCalled();
    });
  });

  describe('initialization', function(){
    it('sets up the Game to listen to the Board', function(){
      board = new Board();
      spyOn(board, 'add_listener');
      server = new Server();
      game = new Game(board, server);
      expect(board.add_listener).toHaveBeenCalledWith(game);
    });  
  });

});