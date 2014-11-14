describe('Game', function(){
  var board;
  var server;
  var game;


  beforeEach(function(){
    board = new Board();
    server = new Server();
    game = new Game(board, server);

    // Mock out the Server so we don't make real ajax requests.
    spyOn(server, 'send_move').and.callFake(function(myspot, success_callback){
      var data = '0';  // The server returns its move.
      success_callback(data);
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
  });

});