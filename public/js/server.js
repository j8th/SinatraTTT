'use strict';

function Server() {
  // Private Data Members

  // Initialization


  // Public Methods
  this.send_move = function(myspot, success_callback) {
    $.post(Server.MOVE_URL, {
        spot: myspot
      },
      function(data) {
        success_callback(data);
      },
      'json');
  };
}

// Class Constants
Server.ROOT_URL = window.location.protocol + '//' + window.location.host
Server.MOVE_URL = Server.ROOT_URL + '/move'