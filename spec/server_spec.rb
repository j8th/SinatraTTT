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

  it "says hello" do
    get '/'
    expect(last_response).to be_ok
    expect(last_response.body).to eq('Hello World')
  end

  context '/game route' do
    it 'creates a new game.' do
      get '/game/new'
      expect(last_request.session[:game]).to be_a Game
      expect(last_response).to be_ok
    end
  end

  context '/move route' do
    xit 'does something' do
      board = Board.new
      #puts board
      #board_yaml = YAML::dump(board)
      #puts board_yaml
      #reboard = YAML::load(board_yaml)
      #puts reboard
      #game = Game.new(board, AI.new(:X), AI.new(:O))
      post "/move", {:spot => 4}, {"rack.session" => {'board' => board}}
      expect(last_response).to be_ok
      #expect(last_response.body).to eq('4')
      #expect(board.empty?).to eq(false)
      #board = YAML::load(session[:board])
      #expect(board[4]).to eq(:X)
      #board = YAML::dump(rack_mock_session.cookie_jar)
      #puts session[:board]
      # PROVES IT IS THERE SOMEWHERE!!!
      #puts YAML::dump(rack_mock_session)
      #binding.pry
      #puts board

      #expect(board[4]).to eq(:X)
      expect(last_request.session[:board][4]).to eq(:X)
    end
  end
end

