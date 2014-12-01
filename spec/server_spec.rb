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
    it 'loads a new game if no get parameters were passed' do
      get "/"
      expect(last_response).to be_ok
      expect(last_request.session[:game]).to be_a Game
    end
  end

  context '/game route' do
    it 'creates a new game.' do
      get '/game/new'
      expect(last_request.session[:game]).to be_a Game
      expect(last_response).to be_ok
    end
  end

  context '/move route' do
    let(:board) { Board.new }
    let(:human) { Human.new(:X) }
    let(:ai) { AI.new(:O) }
    let(:game) { Game.new(board, human, ai) }

    before(:example) {
      post "/move", {:spot => 4}, {"rack.session" => {'game' => game}}
    }

    it 'makes a move on the game board for the human player' do
      expect(last_response).to be_ok
      game = last_request.session[:game]
      expect(game.board[4]).to eq(human.token)
    end

    it 'makes a move on the board for the ai player' do
      expect(last_response).to be_ok
      game = last_request.session[:game]
      ai_piece_found = false
      (0..Board::BOARD_SIZE-1).each do |i|
        ai_piece_found = true if game.board[i] == ai.token
      end
      expect(ai_piece_found).to eq(true)
    end

    it 'returns the ai move in the json response.' do
      ai_spot = nil
      (0..Board::BOARD_SIZE-1).each do |i|
        ai_spot = i if game.board[i] == ai.token
      end
      
      expect(last_response.body).to eq({ :aimove => ai_spot }.to_json)
    end
  end

  context '/next-state route' do
    it 'returns a string representation of the next board state from a given get parameter' do
      get '/next-state', {:board => 'XXEOEEEEE'}
      expect(last_response).to be_ok
      expect(last_response.body).to eq('XXOOEEEEE')

      get '/next-state', {:board => 'OXEEXEEEE'}
      expect(last_response).to be_ok
      expect(last_response.body).to eq('OXEEXEEOE')
    end
  end
end

