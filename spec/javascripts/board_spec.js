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

});