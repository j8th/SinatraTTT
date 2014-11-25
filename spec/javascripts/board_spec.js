describe('Board', function() {
  var board;

  beforeEach(function(){
    board = new Board();
  });

  describe('#place', function() {
    it('places a token on the board', function(){
      board.place('X', 4);
      expect(board.get(4)).toEqual('X');
    });
  });

  describe('#get', function() {
    it('gets the value of a token from a given spot on the board', function(){
      board.place('X', 6)
      expect(board.get(6)).toEqual('X');
    });

    it('returns null for an empty spot', function(){
      expect(board.get(2)).toEqual(null);
    });
  });

  describe('Event Listening', function(){

    var some_obj;

    beforeEach(function(){
      some_obj = jasmine.createSpyObj('some_obj', ['listen_board_click_event']);
    });

    describe('#add_listener', function(){
      it('Adds an event listener to the Board.', function(){
        board.add_listener(some_obj);
        board.click_event(4);

        expect(some_obj.listen_board_click_event).toHaveBeenCalledWith(4);
      });
    });
  });

  describe('#to_s', function(){
    it('returns a string representation of the board', function(){
      board.place('X', 0);
      board.place('X', 1);
      board.place('O', 3);

      expect(board.to_s()).toEqual('XXEOEEEEE');

      board = new Board();
      board.place('X', 0);
      board.place('O', 8);

      expect(board.to_s()).toEqual('XEEEEEEEO')
    });
  });

  describe('#from_s', function(){
    it('returns a board object based on the string repressentation', function(){
      var board_string = 'XXEOEEEEE';
      var board = Board.from_s(board_string);
      for(var i =0; i < Board.BOARD_SIZE; i++)
        if(board_string[i] === 'E')
          expect(board.get(i)).toEqual(null);
        else
          expect(board.get(i)).toEqual(board_string[i]);
    });
  });

  describe('#draw', function(){
    xit('Would need to confirm DOM elements, so we skip this test for now.', function(){

    });
  });

});