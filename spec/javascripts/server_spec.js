describe('Server', function(){
  var server;


  beforeEach(function(){
    jasmine.Ajax.install();
    server = new Server();
  });


  describe('#new_game', function(){
    it('requests a new game session', function(){
      spyOn($, 'get');
      server.new_game();
      expect($.get).toHaveBeenCalled();
    });
  });


  describe('#send_move', function(){
    it('sends a move to the server.', function(){
      spyOn($, 'post');
      server.send_move(4, function(data){ });
      expect($.post).toHaveBeenCalled();
    });

    it('invokes the callback function on success', function(){
      var mycallback = jasmine.createSpy('mycallback');
      server.send_move(4, mycallback);
      expect(mycallback).not.toHaveBeenCalled();
      jasmine.Ajax.requests.mostRecent().response({
        status: 200,
        contentType: 'application/json',
        responseText: '{ "aimove": 0 }'
      });
      expect(mycallback).toHaveBeenCalled();
    });
  });

});