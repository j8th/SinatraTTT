ENV['RACK_ENV'] = 'test'

require 'sinatra'
require 'server'
require 'json'

require 'rspec'
require 'rack/test'

require 'tictactoe_j8th'

include TictactoeJ8th

describe 'The TicTacToe Server' do
  include Rack::Test::Methods

  def app
    myapp = Sinatra::Application
    # Set the application's views path to the correct place in the test environment.
    # This feels like something we shouldn't have to do.
    # The application root is also different in the test environment; so we may need to revisit this later.
    myapp.set :views, myapp.settings.root + '/../views'
    myapp
  end

  context '/' do
    it 'starts a new game with no board parameter passed' do
      get '/'
      expect(last_response).to be_ok
      expect(last_response.body).to include('<a href="/?board=XEEEEEEEE"></a>')
    end

    it 'outputs a clickable board with the next move made by the AI' do
      get '/', {:board => 'XXEOEEEEE'}
      expect(last_response).to be_ok
      expect(last_response.body).to include('<a href="/?board=XXOOXEEEE"></a>')

      get '/', {:board => 'OXEEXEEEE'}
      expect(last_response).to be_ok
      expect(last_response.body).to include('<a href="/?board=OXEEXEEOX"></a>')
    end
  end
end

