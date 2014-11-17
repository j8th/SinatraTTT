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

  describe('#draw', function(){
    xit('Would need to confirm DOM elements, so we skip this test for now.', function(){

    });
  });

});