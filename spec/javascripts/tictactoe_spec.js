describe('TicTacToe', function() {
  var ttt;

  beforeEach(function(){
    ttt = new TicTacToe();
  });

  describe('#testFunc', function() {
    it('returns true', function(){
      expect(ttt.testFunc()).toEqual(true);
    });
  });

});