'use strict';

$(document).ready(function(){
  var board = new Board('table#board');
  var server = new Server();
  var game = new Game(board, server);
});