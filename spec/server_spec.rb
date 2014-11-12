ENV['RACK_ENV'] = 'test'

require 'sinatra'
require 'server'

require 'rspec'
require 'rack/test'

describe 'The TicTacToe Server' do
  include Rack::Test::Methods

  def app
    Sinatra::Application
  end

  context '/' do
    it 'loads' do
      # Code here
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
    it 'makes a move on the game board' do
      game = Game.new(Board.new, Human.new(:X), AI.new(:O))
      post "/move", {:spot => 4}, {"rack.session" => {'game' => game}}
      expect(last_response).to be_ok
      game = last_request.session[:game]
      expect(game.board[4]).to eq(:X)
    end
  end
end

